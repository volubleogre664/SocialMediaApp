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
          // var client = Clients.User(user);

           //Console.WriteLine(Clients.User(user));
           await Clients.User(user).SendAsync("send",user ,"To an individual client");
          // await Clients.All.SendAsync("send", "To all clients");

            //  Console.WriteLine(Clients.Client(Context.ConnectionId));
            /*
                        Console.WriteLine(Clients.Client(Context.UserIdentifier));
                        Clients.All.SendAsync("broadcastMessage", user, message);

                        await Clients.All.SendAsync("messageReceived", user, message);
            */

            // await Clients.Client(Context.ConnectionId)

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

        public async Task BroadcastMessage(string name, string message)
        {
            Console.WriteLine(Clients.Client(Context.ConnectionId));
            Console.WriteLine(Clients.Client(Context.UserIdentifier));
            Clients.All.SendAsync("broadcastMessage", name, message);
        }

        public async Task Echo(string name, string message) =>
            Clients.Client(Context.ConnectionId)
                   .SendAsync("echo", name, $"{message} (echo from server)");

        public Task SendPrivateMessage(string user, string message)
        {
            return Clients.User(user).SendAsync("ReceiveMessage", message);
        }

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await this.SendToGroup(groupName, "testing 1 2 3");
        }

        public async Task SendToGroup(string groupName, string message)
        {
            await Clients.Group(groupName).SendAsync("Send", message);
        }

        public async Task<string> MapConnectionID(string connectionId, string authID)
        {
            Console.WriteLine($"Connection ID: {connectionId}");
            return $"Connection ID: {connectionId}";
        }
    }
}
