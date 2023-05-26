namespace Webapi.Hub
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.SignalR;
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;
    using Webapi.Services;
    using static System.Net.Mime.MediaTypeNames;

    public class ChatHub : Hub
    {
        private readonly IChatService chatService;
        private readonly ApplicationDbContext context;

        public ChatHub(IChatService chatService, ApplicationDbContext context)
        {
            this.chatService = chatService;
            this.context = context;
        }

        public async Task NewMessage(string user, string message)
        {
            await Clients.All.SendAsync("messageReceived", user, message);

            var chat = new Chat()
            {
                AuthUserId = "EX100",
                RecievingAuthUserId = "EX200",
                Text = message,
                Date = DateTime.Now,
            };

            this.chatService.Add(chat);
        }

        public Task BroadcastMessage(string name, string message) =>
            Clients.All.SendAsync("broadcastMessage", name, message);

        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                   .SendAsync("echo", name, $"{message} (echo from server)");
    }
}
