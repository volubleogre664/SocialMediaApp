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
    public class CommentController : ControllerBase
    {
        private readonly ICommentService commentService;
        private readonly IValidator<Comment> validator;
        private readonly IUserService userService;

        public CommentController(ICommentService commentService, IValidator<Comment> validator, IUserService userService)
        {
            this.commentService = commentService;
            this.validator = validator;
            this.userService = userService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post(Comment model)
        {
            var result = this.validator.Validate(model);

            if (!result.IsValid)
            {
                result.AddToModelState(this.ModelState);
                return this.BadRequest(this.ModelState);
            }

            var commentAuthor = this.userService.GetById(model.UserId);

            if (commentAuthor == null)
            {
                return this.BadRequest("Invalid Comment Author");
            }

            this.commentService.Add(model);

            return this.Ok(new
            {
                model.CommentId,
                model.UserId,
                model.Text,
                model.DateTimePosted,
                model.PostId,
                AuthorFirstName = commentAuthor.FirstName,
                AuthorLastName = commentAuthor.LastName,
            });
        }
    }
}
