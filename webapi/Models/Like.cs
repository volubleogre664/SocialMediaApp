namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Like
    {
        [Key]
        public int LikeId { get; set; }

        [Column("fkPostId")]
        public int PostId { get; set; }

        [Column("fkUserId")]
        public int UserId { get; set; }
    }
}
