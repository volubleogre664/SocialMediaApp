namespace Webapi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Diagnostics.CodeAnalysis;

    public class Like
    {
        [Column("fkPostId")]
        public int PostId { get; set; }

        [Column("fkUserId")]
        public string UserId { get; set; }
    }
}
