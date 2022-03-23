using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Polaznik
    {
        [Key]
        public int ID { get; set; }
        [StringLength(13, MinimumLength = 13, ErrorMessage = "JMBG mora sadrzati 13 cifara")]
        [Required]
        public string JMBG { get; set; }
        [MaxLength(50)]
        [Required]
        public string Ime { get; set; }
        [MaxLength(50)]
        [Required]
        public string Prezime { get; set; }
        [Range(1, 10)]
        public int Grupa { get; set; }
        [JsonIgnore]
        public List<VesPolSpoj> PolaznikSpojevi { get; set; }

    }
}