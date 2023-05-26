namespace webapi.Models
{
    public class Chat
    {
        public int Id { get; set; }

        public int fkUserId { get; set; }

        public int fkRecievingUserId { get; set; }

        public string Text { get; set; }

        public DateTime Date { get; set; }
    }
}
