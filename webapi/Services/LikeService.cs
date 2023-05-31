namespace Webapi.Services
{
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;

    public class LikeService : GenericService<Like>, ILikeService
    {
        public LikeService(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
