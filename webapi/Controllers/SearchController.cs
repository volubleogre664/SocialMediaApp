namespace Webapi.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using Webapi.Interfaces;

    [ApiController]
    [Route("/api/[controller]")]
    public class SearchController : Controller
    {
        private readonly IPostService postService;

        public SearchController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpGet]
        public IActionResult SearchKeywords(string keyword)
        {
            var results = this.postService.GetAll()
                .Where(_ => _.Text.ToLower().Contains(keyword.ToLower()))
                .ToList();
            return this.Ok(results);
        }
    }
}
