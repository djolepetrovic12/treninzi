using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Sala
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(100)]
        [Required]
        public string Adresa { get; set; }
        [MaxLength(50)]
        public string ImeLokacije { get; set; }
        [JsonIgnore]
        public List<Trening> Treninzi { get; set; }
    }
}