namespace LastProject.Models
{
    public class CreateReservationDto
    {
        public string? Appointment { get; set; }
        public int UserId { get; set; }
        public int DoctorId { get; set; }
    }
}
