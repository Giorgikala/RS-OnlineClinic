using LastProject.Data;
using LastProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LastProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _datacontext;


        public AdministratorController(IConfiguration configuration, DataContext datacontext)
        {
            _configuration = configuration;
            _datacontext = datacontext;
        }
        [HttpPost]
        public async Task<ActionResult<IUser>> AdminRegister(AdministratorClass adminClass)
        {
            var admin = new AdministratorClass();
            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(adminClass.Password);

            admin.PasswordHash = passwordHash;
            admin.Name = adminClass.Name;
            admin.Id = adminClass.Id;
            admin.Email = adminClass.Email;

            await _datacontext.Admins.AddAsync(admin!);

            await _datacontext.SaveChangesAsync();



            return Ok(admin);

        }
        [HttpDelete ("{id}")]
        public async Task<ActionResult>DeleteDoctor(int id)
        {
            var DeleteDoctor = await _datacontext.Doctors.FindAsync(id);
            if (DeleteDoctor is null)
                return BadRequest();

            _datacontext.Remove(DeleteDoctor);
            await _datacontext.SaveChangesAsync();


            return Ok();
        }

    }
}
