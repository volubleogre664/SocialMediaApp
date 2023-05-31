namespace Webapi.Controllers
{
    using FluentValidation;
    using FluentValidation.AspNetCore;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using Webapi.Interfaces;
    using Webapi.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly IValidator<Like> validator;
        private readonly ILikeService likeService;

        public LikeController(IValidator<Like> validator, ILikeService likeService)
        {
            this.validator = validator;
            this.likeService = likeService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post(Like model)
        {
            var result = this.validator.Validate(model);

            if (!result.IsValid)
            {
                result.AddToModelState(this.ModelState);

                return this.BadRequest(this.ModelState);
            }

            this.likeService.Add(model);

            return this.Ok(model);
        }
    }
}
