namespace LastProject.Models
{
    public class DoctorDto
    {
        
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public IFormFile Cv { get; set; }

        public IFormFile Photo { get; set; }
        public string Personalid { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Category { get; set; }
    }
}
