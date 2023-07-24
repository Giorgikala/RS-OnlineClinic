﻿namespace LastProject.Models
{
    public class AdministratorClass : IUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public string PasswordHash { get; set; } = "";
        public string Role { get; set; } = "Admin";

    }
}
