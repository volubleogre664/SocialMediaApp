namespace Webapi.Controllers
{
    using System.Collections.Generic;

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
        private readonly IValidator<Post> validator;

        public PostsController(IPostService postService, IValidator<Post> validator)
        {
            this.postService = postService;
            this.validator = validator;
        }

        // GET: api/Posts
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetPost()
        {
            return this.postService.GetAll();
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
            if (id != post.PostID)
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

            return this.CreatedAtAction("GetPost", new { id = post.PostID }, post);
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
