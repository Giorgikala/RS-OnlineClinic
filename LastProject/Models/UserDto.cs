namespace LastProject.Models
{
    public class UserDto
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
     
        public string PersonalId { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Randomcode { get; set; }
    }
}
