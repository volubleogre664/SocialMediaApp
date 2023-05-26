namespace Webapi.Services
{
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;

    public class ChatService : GenericService<Chat>, IChatService
    {
        public ChatService(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
