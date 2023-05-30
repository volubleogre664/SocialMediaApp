namespace Webapi.Services
{
    using Newtonsoft.Json;
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;

    public class ChatService : GenericService<Chat>, IChatService
    {
        private readonly ApplicationDbContext context;

        public ChatService(ApplicationDbContext context)
            : base(context)
        {
            this.context = context;
        }

        public async Task<object> AddChat(Chat entity)
        {
            this.context.Chats.Add(entity);
            this.context.SaveChanges();

            return JsonConvert.SerializeObject(entity);
        }
    }
}
