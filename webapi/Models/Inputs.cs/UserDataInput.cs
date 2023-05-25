
namespace Webapi.Models.Inputs
{
    using Microsoft.Build.Framework;

    public class UserDataInput
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string FirsName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? AvatarUrl { get; set; }
    }
}
