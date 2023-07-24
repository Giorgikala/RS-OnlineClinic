using LastProject.Data;
using LastProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LastProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _datacontext;

        public ReservationController (IConfiguration configuration, DataContext datacontext)
        {
            _configuration = configuration;
            _datacontext = datacontext;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<List<string?>>> GetReservation(int id)
        {
            
            var reservs =  await _datacontext.Reservations.Where(r => r.UserId == id).Select(r => r.Appointment).ToListAsync();
          

        //var arr = new string[reservs.Count - 1];

        //for (int i = 0; i < arr.Length; i++)
        //{
        //    arr[i] = reservs[i].Appointment!;
        //}
            

            return reservs;
        }

        [HttpPost, Authorize (Roles = "user")]
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


        [HttpGet]
        [Route ("api/doctor/{id}")]
        public async Task<ActionResult<List<string?>>> DoctorRegistration(int id)
        {

            var reservs = await _datacontext.Reservations.Where(r => r.DoctorId == id).Select(c => c.Appointment).ToListAsync();
           

            //var arr = new string[reservs.Count - 1];

            //for (int i = 0; i < arr.Length; i++)
            //{
            //    arr[i] = reservs[i].Appointment!;
            //}

            return reservs;
        }

        [HttpDelete ("DeleteReserve")]


        public async Task<ActionResult> delete(DeleteReservation deleteReservation)
        {

            var result = await _datacontext.Reservations
                .FirstOrDefaultAsync(r => r.DoctorId == deleteReservation.DoctorId && r.Appointment == deleteReservation.Appointment);

            if (result == null)
                return BadRequest();

            _datacontext.Reservations.Remove(result);
            await _datacontext.SaveChangesAsync();


            return Ok();
        }




        [HttpDelete("DeleteUserReserve")]


        public async Task<ActionResult> DeleteUserReserve(DeleteUserReserveDto deleteUserReserveDto)
        {

            var result = await _datacontext.Reservations
                .FirstOrDefaultAsync(r => r.UserId == deleteUserReserveDto.UserId && r.Appointment == deleteUserReserveDto.Appointment);

            if (result == null)
                return BadRequest();

            _datacontext.Reservations.Remove(result);
            await _datacontext.SaveChangesAsync();


            return Ok();
        }











    }



}
