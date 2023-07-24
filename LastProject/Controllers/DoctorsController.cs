using LastProject.Data;
using LastProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Text;

namespace LastProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public DoctorsController(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }


        [HttpGet("doctorss")]
        public async Task<ActionResult<List<Doctor>>> GetAllDoctor(string category = "" , string name = "")
        {
           
             var doctors = await _dataContext.Doctors.ToListAsync();
            
            if (!string.IsNullOrEmpty(category)) {
                doctors = doctors.Where(d => d.Category == category).ToList();
            }
            if (!string.IsNullOrEmpty(name))
            {
                doctors = doctors.Where(d => (d.Firstname + ' ' + d.Lastname).Contains(name)).ToList(); ;
            }
            return Ok(doctors);
        }


        [HttpGet("{id}"), ]
        public async Task<ActionResult<List<Doctor>>> GetDoctorById(int id)
        {
            var doctor = await _dataContext.Doctors.FirstOrDefaultAsync(d => d.Id == id);
            if (doctor == null)
            {
                return NotFound();
            }
            return Ok(doctor);
        


        }
        


        [HttpPost(Name ="doctors registration")]
        public async Task <ActionResult> RegisterDoctor([FromForm]DoctorDto request)
        {
            Console.WriteLine(_configuration.GetSection("Imagesfile:default").Value);
            var hash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var fileName = Guid.NewGuid().ToString()+".jpg";
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"..\OnlineClinic\clinic\src\assets\image", fileName);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                request.Photo.CopyTo(stream);
            }
            
          
            var doctor = new Doctor
            { 
                Email = request.Email,
                Firstname = request.Firstname,
                Lastname = request.Lastname,
                Personalid = request.Personalid,
                Cv = "Cv",
                Photo = $@".\assets\image\{fileName}",
                PasswordHash = hash,
                Category = request.Category,
                



            };

            await _dataContext.Doctors.AddAsync(doctor);
            await _dataContext.SaveChangesAsync();

            return Ok();


        }

    }
}
