﻿namespace Webapi.Controllers
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

        [HttpGet]
        public IActionResult Get()
        {
            List<User> profiles = this.userService.GetAll();

            return this.Ok(profiles);
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

            var user = new User()
            {
                AuthUserId = model.AuthUserId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Username = model.Username,
                AvatarUrl = model.AvatarUrl,
            };

            this.userService.Add(user);
            var newUser = this.userService.FindByField("AuthUserId", model.AuthUserId);

            return this.Ok(newUser);
        }
    }
}
