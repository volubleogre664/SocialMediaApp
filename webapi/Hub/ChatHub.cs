namespace Webapi.Hub
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.SignalR;
    using Microsoft.CodeAnalysis.Differencing;
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;
    using Webapi.Services;
    using static System.Net.Mime.MediaTypeNames;

    public class ChatHub : Hub
    {
        private readonly IChatService chatService;
/*        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly AuthDbContext authContext;*/

        public ChatHub(
            IChatService chatService
   /*         IHttpContextAccessor httpContextAccessor,
            AuthDbContext authContext*/)
        {
            this.chatService = chatService;
            /*this.httpContextAccessor = httpContextAccessor;
            this.authContext = authContext;*/
        }

        public async Task NewMessage(string user, string message)
        {
            await Clients.All.SendAsync("messageReceived", user, message);
/*            var userEmail = this.httpContextAccessor.HttpContext!.User.Identity!.Name;
            var authUser = this.authContext.Users.FirstOrDefault(_ => _.Email == userEmail);*/

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
