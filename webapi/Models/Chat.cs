namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Chat
    {
        [Key]
        public int ChatId { get; set; }

        [Column("fkAuthUserId")]
        public string AuthUserId { get; set; }

        [Column("fkRecievingUserId")]
        public string RecievingAuthUserId { get; set; }

        public string Text { get; set; }

        public DateTime Date { get; set; }
    }
}
