namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;

    public class ChatResponse
    {
        public int chatId { get; set; }

        public string authUserId { get; set; }

        public string recievingAuthUserId { get; set; }

        public string text { get; set; }

        public DateTime date { get; set; }
    }
}
