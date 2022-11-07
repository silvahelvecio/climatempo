using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace WebApiClimaTempo.Models
{
    [Table("PrevisaoClima")]
    public partial class PrevisaoClima
    {
        [Key]
        public int Id { get; set; }
        public int CidadeId { get; set; }
        [Column(TypeName = "date")]
        public DateTime DataPrevisao { get; set; }
        [Required]
        [StringLength(15)]
        public string Clima { get; set; }
        [Column(TypeName = "numeric(3, 1)")]
        public decimal? TemperaturaMinima { get; set; }
        [Column(TypeName = "numeric(3, 1)")]
        public decimal? TemperaturaMaxima { get; set; }

        [ForeignKey(nameof(CidadeId))]
        [InverseProperty("PrevisaoClimas")]
        public virtual Cidade Cidade { get; set; }
    }
}
