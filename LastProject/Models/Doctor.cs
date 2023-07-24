using System.ComponentModel.DataAnnotations.Schema;

namespace LastProject.Models
{
    public class Doctor : IUser

    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Cv { get; set; }

        public string Role  { get; set;} = "Doctor";

        public string Photo { get; set; }
        public string Personalid { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string Category { get; set; }
        public List<Reservation> Reservations { get; set; }
    }
}
