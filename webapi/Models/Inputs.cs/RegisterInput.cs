namespace Webapi.Models.Inputs
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterInput
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}
