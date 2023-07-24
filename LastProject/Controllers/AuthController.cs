using LastProject.Data;
using LastProject.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;
using SmtpClient = System.Net.Mail.SmtpClient;
using System.Numerics;

namespace LastProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
      
        private readonly IConfiguration _configuration;
        private readonly DataContext _datacontext;

        public AuthController (IConfiguration configuration, DataContext datacontext) 
        {
            _configuration = configuration;
            _datacontext = datacontext;
        }


        [HttpPost("register")]
        public async Task <ActionResult <User>> Register(UserDto request)
        {
            var message =  await _datacontext.MessageClasses.FirstOrDefaultAsync(u => u.Randomcode == request.Randomcode && u.Email == request.Email);
            if (message is null)
            {
                var mess = await _datacontext.MessageClasses.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (mess is not null)
                {
                     _datacontext.Remove(mess);
                    await _datacontext.SaveChangesAsync();
                    return NotFound("1");
                }
                return NotFound("2");
            }
            var user = new User();
            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(request.Password);
            
            user.PasswordHash = passwordHash;
            user.Firstname = request.Firstname;
            user.Lastname = request.Lastname;
            user.PersonalId = request.PersonalId;
            user.Email = request.Email;

            await _datacontext.Users.AddAsync(user);
            _datacontext.MessageClasses.Remove(message);
            await _datacontext.SaveChangesAsync();
           
              

            return Ok(user);

        }

        [HttpPost("SentCode")]
        public async  Task<ActionResult>   GetEmailmessage([FromQuery]string addressMail)
        {       
                
                var random = new Random();
                var randomMessage = random.Next(1000, 10000).ToString();

            var messy = new MailMessage();
            messy.From = new MailAddress("giorgi25kalandadze@gmail.com");
            messy.To.Add(addressMail);
            messy.Subject = "def";
            messy.Body = randomMessage;


            var smt = new SmtpClient();
            smt.Host = "smtp.gmail.com";
            smt.Port = 587;
            smt.UseDefaultCredentials = false;
            smt.EnableSsl = true;
            smt.DeliveryMethod = SmtpDeliveryMethod.Network;
            smt.Credentials = new NetworkCredential("giorgi25kalandadze@gmail.com", "ojtmqwrkqxyymryg");
            try
            {
                smt.Send(messy);
                //var smtpClient = new SmtpClient("smtp.gmail.com", 587)
                //{
                //    UseDefaultCredentials = false,
                //    Credentials = new NetworkCredential("giorgi18kalandadze@gmail.com", ""),
                //    EnableSsl = true,
                //};

                //var message = new MailMessage
                //{
                //    From = new MailAddress("giorgi18kalandadze@gmail.com"),
                //    Subject = "default",
                //    Body = randomMessage,
                //    IsBodyHtml = true,
                    
                //};
                //message.To.Add(new MailAddress(addressMail));
                //await smtpClient.SendMailAsync(message);
                var mess = new MessageClass { Randomcode = randomMessage, Email = addressMail };
                await _datacontext.MessageClasses.AddAsync(mess);
                await _datacontext.SaveChangesAsync();
                return Ok();
               
                
            }
            catch (Exception er)
            {

                return NotFound("problem with sanding mail"+er.Message);
            }
        }


        [HttpGet("GetParameters"), Authorize]
        public async Task<ActionResult<IUser>> GetParameters()
        {
            var role = User.FindFirstValue(ClaimTypes.Role);
            if(role == "doctor")
            {
                var doctor = await _datacontext.Doctors.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
                return Ok(doctor);
            }
            else if(role == "user")
            {
                var user = await _datacontext.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
                return Ok(user);
            }
            else
            {
                return BadRequest("User or doc not found");
            }
        }


        [HttpGet]
        public async Task<ActionResult<User[]>> GetllAll()
        {
            var user = await _datacontext.Users.ToArrayAsync();
            return Ok(user);
        }


        [HttpPost("login")]
        public async Task <ActionResult<Token>> login(LoginDto request)
        {
            var token = new Token();
            var user = await _datacontext.Users.FirstOrDefaultAsync(user => user.Email == request.Email);
            if (user is null)
            {
                var doctor = await _datacontext.Doctors.FirstOrDefaultAsync(doctor => doctor.Email == request.Email);
                if (doctor is null)
                {
                    var admin = await _datacontext.Admins.FirstOrDefaultAsync(admin => admin.Email == request.Email);
                    if (admin is null)
                        return BadRequest();
                    if (!BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
                    {
                        return BadRequest("wrong password");
                    }
                    string admToken = CreateToken(request, "Admin", admin.Id);
                    token.MyToken = admToken;
                    return Ok(new { token, admin });

                }



                if (!BCrypt.Net.BCrypt.Verify(request.Password, doctor.PasswordHash))
                {
                    return BadRequest("wrong password");
                }
                string toke = CreateToken(request, "doctor", doctor.Id);
                token.MyToken = toke;
                return Ok(new { token, doctor});
            }
                    

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("wrong password");
            }
            string Token = CreateToken(request, "user", user.Id);

            token.MyToken = Token;
            return Ok(new {token, user});
            

        }
        ///CreateToken method
        private string CreateToken(LoginDto loginDto, string role, int id)
        {

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email , loginDto.Email),
                new Claim(ClaimTypes.Role , role),
                new Claim(ClaimTypes.Name, id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds

            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
      
    }
}
