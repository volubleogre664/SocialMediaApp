namespace Webapi.Data
{
    using Microsoft.EntityFrameworkCore;

    using Webapi.Models;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Chat> Chats { get; set; }
    }
}
