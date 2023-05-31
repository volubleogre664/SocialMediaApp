namespace Webapi.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using FluentValidation;
    using FluentValidation.AspNetCore;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using Webapi.Interfaces;
    using Webapi.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostService postService;
        private readonly IUserService userService;
        private readonly ILikeService likeService;
        private readonly ICommentService commentService;
        private readonly IValidator<Post> validator;

        public PostsController(
            IPostService postService,
            IValidator<Post> validator,
            IUserService userService,
            ILikeService likeService,
            ICommentService commentService)
        {
            this.postService = postService;
            this.validator = validator;
            this.userService = userService;
            this.likeService = likeService;
            this.commentService = commentService;
        }

        // GET: api/Posts
        [HttpGet]
        public IActionResult GetPost()
        {
            var posts = this.postService.GetAll();

            var postsData = new List<object>();

            foreach (var post in posts)
            {
                var postOwner = this.userService.GetById(post.UserId);
                var likes = this.likeService.FindAllByField("PostId", post.PostId);
                var comments = this.commentService.FindAllByField("PostId", post.PostId);

                postsData.Add(new
                {
                    Post = post,
                    Likes = likes,
                    Comments = comments.Select(_ =>
                    {
                        var commentAuthor = this.userService.GetById(_.UserId);

                        return new
                        {
                            _.UserId,
                            _.CommentId,
                            _.PostId,
                            _.DateTimePosted,
                            _.Text,
                            AuthorFirstName = commentAuthor.FirstName,
                            AuthorLastName = commentAuthor.LastName,
                        };
                    }),
                    PostOwner = postOwner,
                });
            }

            foreach (var post in postsData)
            {
            }

            return this.Ok(postsData);
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public ActionResult<Post> GetPost(int id)
        {
            var post = this.postService.GetById(id);

            if (post == null)
            {
                return this.NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        [HttpPut("{id}")]
        public IActionResult PutPost(int id, Post post)
        {
            if (id != post.PostId)
            {
                return this.BadRequest();
            }

            try
            {
                this.postService.Update(post);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.PostExists(id))
                {
                    return this.NotFound();
                }
                else
                {
                    throw;
                }
            }

            return this.NoContent();
        }

        // POST: api/Posts
        [HttpPost]
        public ActionResult<Post> PostPost(Post post)
        {
            var validationResult = this.validator.Validate(post);
            if (!validationResult.IsValid)
            {
                validationResult.AddToModelState(this.ModelState);

                return this.BadRequest(this.ModelState);
            }

            this.postService.Add(post);

            return this.CreatedAtAction("GetPost", new { id = post.PostId }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            var post = this.postService.GetById(id);
            if (post == null)
            {
                return this.NotFound();
            }

            this.postService.Delete(id);

            return this.NoContent();
        }

        private bool PostExists(int id)
        {
            return this.postService.GetById(id) != null;
        }
    }
}
