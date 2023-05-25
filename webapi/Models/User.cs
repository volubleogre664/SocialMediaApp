namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Diagnostics.CodeAnalysis;

    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Column("fkAuthUserId")]
        public string AuthUserId { get; set; }

        [NotNull]
        public string Username { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? AvatarUrl { get; set; }
    }
}
