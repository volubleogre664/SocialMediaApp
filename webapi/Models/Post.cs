namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Post
    {
        [Key]
        [Column("pkPostID")]
        public int PostID { get; set; }

        [Column("fkUserId")]
        public int UserID { get; set; }

        public string Text { get; set; }

        public DateTime DateTimePosted { get; set; }

        public string? MediaUrl { get; set; }
    }
}
