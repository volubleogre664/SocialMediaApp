namespace Webapi.Controllers
{
    using FluentValidation;
    using FluentValidation.AspNetCore;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;
    using Webapi.Models.Inputs;

    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly IValidator<UserDataInput> validator;
        private readonly IUserService userService;

        public UserController(SignInManager<AppUser> signInManager, IValidator<UserDataInput> validator, IUserService userService)
        {
            this.signInManager = signInManager;
            this.validator = validator;
            this.userService = userService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post(UserDataInput model)
        {
            var result = this.validator.Validate(model);

            if (!result.IsValid)
            {
                result.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            var authUserId = this.signInManager.UserManager.GetUserId(this.User);

            if (authUserId == null)
            {
                return this.BadRequest(new { message = "Please sign again" });
            }

            var user = new User()
            {
                AuthUserId = authUserId,
                FirstName = model.FirsName,
                LastName = model.FirsName,
                Username = model.Username,
                AvatarUrl = model.AvatarUrl,
            };

            this.userService.Add(user);

            return this.Ok(model);
        }
    }
}
