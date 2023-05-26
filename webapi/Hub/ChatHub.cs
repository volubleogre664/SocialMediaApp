namespace Webapi.Hub
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.SignalR;

    using Webapi.Models;
    using Webapi.Services;

    public class ChatHub : Hub
    {
        private readonly ChatService chatService;

        public ChatHub() { }

        public async Task NewMessage(string user, string message)
        {
            await Clients.All.SendAsync("messageReceived", user, message);

            var chat = new Chat()
            {
                Id = 1,
                fkRecievingUserId = 1,
                fkUserId = 1,
                Date = DateTime.Now,
                Text = message,
            };

            this.chatService.SaveChat(chat);
        }

        public Task BroadcastMessage(string name, string message) =>
            Clients.All.SendAsync("broadcastMessage", name, message);

        public Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                   .SendAsync("echo", name, $"{message} (echo from server)");
    }
}
