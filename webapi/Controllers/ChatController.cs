namespace Webapi.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using Webapi.Interfaces;

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
        public object GetChatHistory(string userId)
        {
            var chatHistory = this.chatService.FindAllByField("AuthUserId", userId);
            var chatReceiverHistory = this.chatService.FindAllByField("RecievingAuthUserId", userId);

            chatHistory.AddRange(chatReceiverHistory);

            return chatHistory;
        }
    }
}
