namespace Webapi.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using Webapi.Interfaces;
    using Webapi.Models;

    [ApiController]
    [Route("/api/Chat")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService chatService;

        public ChatController(IChatService chatService)
        {
            this.chatService = chatService;
        }

        [HttpGet]
        public object GetChatHistory(string receiverId, string senderId)
        {
            var receiverHistory = this.chatService.FindAllByField("AuthUserId", receiverId).Where(_ => _.RecievingAuthUserId == senderId);
            var receiverChatHistory = receiverHistory.ToList<Chat>();

            var senderHistory = this.chatService.FindAllByField("RecievingAuthUserId", receiverId).Where(_ => _.AuthUserId == senderId);
            var senderChatHistroy = senderHistory.ToList<Chat>();

            var chatHistory = receiverChatHistory;

            chatHistory.AddRange(senderChatHistroy);
            chatHistory.Sort((x, y) => DateTime.Compare(x.Date, y.Date));

            return chatHistory;
        }
    }
}
