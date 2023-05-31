namespace Webapi.Hub
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.SignalR;
    using Microsoft.CodeAnalysis.Differencing;
    using Newtonsoft.Json;
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;
    using Webapi.Services;
    using static System.Net.Mime.MediaTypeNames;

    public class ChatHub : Hub
    {
        private readonly IChatService chatService;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ChatHub(IChatService chatService, IHttpContextAccessor httpContextAccessor = null)
        {
            this.chatService = chatService;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }


        public async Task SendToGroup(string groupName, string message)
        {
            var chat = JsonConvert.DeserializeObject<Chat>(message);
            var savedChat = await this.chatService.AddChat(chat);

            var chatResponse = new ChatResponse()
            {
                chatId = savedChat.ChatId,
                authUserId = savedChat.AuthUserId,
                recievingAuthUserId = savedChat.RecievingAuthUserId,
                text = savedChat.Text,
                date = savedChat.Date
            };

            var chatResponseJson = JsonConvert.SerializeObject(chatResponse);

            await Clients.Group(groupName).SendAsync("Send", chatResponseJson);
        }

        public async override System.Threading.Tasks.Task OnConnectedAsync()
        {
          //  var userEmail = Context.User.Identity.Name;
            await Groups.AddToGroupAsync(Context.ConnectionId, "414fed45-e2a5-4643-a0ad-367aa0ced2a7");
            await base.OnConnectedAsync();
        }
    }
}
