namespace Webapi.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using Webapi.Data;
    using Webapi.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public PostsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost()
        {
            if (this.context.Post == null)
            {
                return this.NotFound();
            }

            return await this.context.Post.ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            if (this.context.Post == null)
            {
                return this.NotFound();
            }

            var post = await this.context.Post.FindAsync(id);

            if (post == null)
            {
                return this.NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.PostID)
            {
                return this.BadRequest();
            }

            this.context.Entry(post).State = EntityState.Modified;

            try
            {
                await this.context.SaveChangesAsync();
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
          if (this.context.Post == null)
          {
              return this.Problem("Entity set 'ApplicationDbContext.Post'  is null.");
          }

          this.context.Post.Add(post);
          await this.context.SaveChangesAsync();

          return this.CreatedAtAction("GetPost", new { id = post.PostID }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            if (this.context.Post == null)
            {
                return this.NotFound();
            }

            var post = await this.context.Post.FindAsync(id);
            if (post == null)
            {
                return this.NotFound();
            }

            this.context.Post.Remove(post);
            await this.context.SaveChangesAsync();

            return this.NoContent();
        }

        private bool PostExists(int id)
        {
            return (this.context.Post?.Any(e => e.PostID == id)).GetValueOrDefault();
        }
    }
}
