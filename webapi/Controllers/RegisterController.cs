namespace Webapi.Controllers
{
    using FluentValidation;
    using FluentValidation.AspNetCore;

    using Microsoft.AspNetCore.Mvc;

    using Webapi.Models.Inputs;

    [ApiController]
    [Route("/api/[controller]/")]
    public class RegisterController : ControllerBase
    {
        private readonly IValidator<RegisterInput> validator;

        public RegisterController(IValidator<RegisterInput> validator)
        {
            this.validator = validator;
        }

        [HttpPost]
        public IActionResult Post(RegisterInput model)
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
