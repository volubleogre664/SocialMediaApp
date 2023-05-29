namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Diagnostics.CodeAnalysis;

    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        [Column("fkPostId")]
        public int PostId { get; set; }

        [Column("fkUserId")]
        public string UserId { get; set; }

        public string Text { get; set; }

        public DateTime DateTimePosted { get; set; }
    }
}
