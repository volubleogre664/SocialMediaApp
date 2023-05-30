namespace Webapi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Webapi.Interfaces;
    using Webapi.Services;

    [ApiController]
    [Route("/api/search")]
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
            .Where(_ => _.Text.Contains(keyword))
            .ToList();
            return this.Ok(results);
        }
    }
}
