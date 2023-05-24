namespace Webapi.Models.Inputs
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterInput
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirsName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string AvatarUrl { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}
