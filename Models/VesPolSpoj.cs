using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class VesPolSpoj
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(20)]
        [Required]
        public string Pojas { get; set; }
        public Vestina Vestina { get; set; }
        public Polaznik Polaznik { get; set; }

    }
}