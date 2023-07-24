using System.ComponentModel.DataAnnotations;

namespace LastProject.Models
{
    public class User: IUser
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        [EmailAddress]
        public string Email { get; set; }

        public string PersonalId { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "user";
        public  List<Reservation> Reservation { get; set; }


    }
}
