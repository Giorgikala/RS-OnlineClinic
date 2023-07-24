using LastProject.Data;
using LastProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LastProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorReservationController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly DataContext _datacontext;

        public DoctorReservationController(IConfiguration configuration, DataContext datacontext)
        {
            _configuration = configuration;
            _datacontext = datacontext;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<string[]>> GetReservation(int id)
        {

            var reservs = await _datacontext.Reservations.Where(r => r.DoctorId == id).ToListAsync();
            if (reservs == null)
                return BadRequest();

            var arr = new string[reservs.Count - 1];

            for (int i = 0; i < arr.Length; i++)
            {
                arr[i] = reservs[i].Appointment!;
            }

            return arr;
        }

        [HttpPost]
        public async Task<ActionResult> AddReservation(CreateReservationDto createReservationDto)
        {
            var reservation = new Reservation
            {
                Appointment = createReservationDto.Appointment,
                UserId = createReservationDto.UserId,
                DoctorId = createReservationDto.DoctorId
            };

            await _datacontext.Reservations.AddAsync(reservation);
            await _datacontext.SaveChangesAsync();


            return Ok();

        }





    }
}
