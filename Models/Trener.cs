using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Trener
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(6)]
        public string SifraTrenera { get; set; } // npr.  ME1774    "opstina"-"cetvorocifren broj"
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }
        public Vestina Vestina { get; set; }
    }
}