namespace Webapi.Services
{
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;

    public class CommentService : GenericService<Comment>, ICommentService
    {
        public CommentService(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
