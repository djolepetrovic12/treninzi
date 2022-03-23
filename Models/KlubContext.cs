using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class KlubContext : DbContext
    {
        public DbSet<Trener> Treneri { get; set; }
        public DbSet<Vestina> Vestine { get; set; }
        public DbSet<Polaznik> Polaznici { get; set; }
        public DbSet<VesPolSpoj> VesPolSpojevi { get; set; }
        public DbSet<Trening> Treninzi { get; set; }
        public DbSet<Sala> Sale { get; set; }

        public KlubContext(DbContextOptions options) : base(options) { }

    }
}