using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Trening
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public DateTime Termin { get; set; }
        [Range(0, 120)] //pretpostavimo da je trening maximum dva sata
        public int TrajanjeUMinutima { get; set; }
        [Range(1, 10)]
        public int Grupa { get; set; }
        public Vestina Vestina { get; set; }
        public Sala Sala { get; set; }

    }
}