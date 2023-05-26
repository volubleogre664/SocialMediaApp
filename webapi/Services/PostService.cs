namespace Webapi.Services
{
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;

    public class PostService : GenericService<Post>, IPostService
    {
        public PostService(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
