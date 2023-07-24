using LastProject.Models;
using Microsoft.EntityFrameworkCore;

namespace LastProject.Data
{ 
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<AdministratorClass> Admins { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<MessageClass> MessageClasses { get; set; }
    }

}
