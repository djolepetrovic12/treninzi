using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Vestina
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(20)]
        [Required]
        public string Naziv { get; set; }
        [JsonIgnore]
        public List<Trener> Treneri { get; set; }
        [JsonIgnore]
        public List<Trening> Treninzi { get; set; }
        [JsonIgnore]
        public List<VesPolSpoj> VestinaSpojevi { get; set; }

    }
}