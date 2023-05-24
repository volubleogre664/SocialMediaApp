namespace Webapi.Controllers
{
    using FluentValidation;
    using FluentValidation.AspNetCore;
    using Microsoft.AspNetCore.Mvc;
    using Webapi.Models.Inputs;

    [ApiController]
    [Route("/api/[controller]/")]
    public class LoginController : ControllerBase
    {
        private readonly IValidator<LoginInput> validator;

        public LoginController(IValidator<LoginInput> validator)
        {
            this.validator = validator;
        }

        [HttpPost]
        public IActionResult Post(LoginInput model)
        {
            var result = this.validator.Validate(model);

            if (!result.IsValid)
            {
                result.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            // Return the actuall user data after successful login, for now return the model that was sent
            return this.Ok(model);
        }
    }
}
