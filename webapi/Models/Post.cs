namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Post
    {
        [Key]
        public int PostId { get; set; }

        [Column("fkUserId")]
        public string UserId { get; set; }

        public string Text { get; set; }

        public DateTime DateTimePosted { get; set; }

        public string? MediaUrl { get; set; }
    }
}
