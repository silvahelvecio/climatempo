using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebApiClimaTempo.Models
{
    public partial class appDbContext : DbContext
    {
        public appDbContext()
        {
        }

        public appDbContext(DbContextOptions<appDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cidade> Cidades { get; set; }
        public virtual DbSet<CidadesMaxMin> CidadesMaxMins { get; set; }
        public virtual DbSet<Estado> Estados { get; set; }
        public virtual DbSet<PrevisaoClima> PrevisaoClimas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Initial Catalog=ClimaTempoSimples;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AI");

            modelBuilder.Entity<Cidade>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.Cidades)
                    .HasForeignKey(d => d.EstadoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_cidade_estado");
            });

            modelBuilder.Entity<CidadesMaxMin>(entity =>
            {
                entity.ToView("CidadesMaxMin");
            });

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<PrevisaoClima>(entity =>
            {
                entity.HasOne(d => d.Cidade)
                    .WithMany(p => p.PrevisaoClimas)
                    .HasForeignKey(d => d.CidadeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_previsao_cidade");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
