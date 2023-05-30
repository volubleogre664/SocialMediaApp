
namespace Webapi.Models.Inputs
{
    using Microsoft.Build.Framework;

    public class UserDataInput
    {
        public string AuthUserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? AvatarUrl { get; set; }
    }
}
