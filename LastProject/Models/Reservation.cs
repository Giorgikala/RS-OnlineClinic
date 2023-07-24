namespace LastProject.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string? Appointment { get; set; }
        public string CreateAppointment { get; set; } = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:sszzz");
        public int UserId { get; set; }
        public User User { get; set; }
        public Doctor Doctor { get; set; }
        public int DoctorId { get; set; }
    }
}
