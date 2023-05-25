namespace Webapi.Models.Inputs
{
    using System.ComponentModel.DataAnnotations;

    public class LoginInput
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
