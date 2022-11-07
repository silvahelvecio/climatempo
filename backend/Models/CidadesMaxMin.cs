using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace WebApiClimaTempo.Models
{
    [Keyless]
    public partial class CidadesMaxMin
    {
        [Required]
        [StringLength(200)]
        public string Cidade { get; set; }
        [Required]
        [Column("UF")]
        [StringLength(2)]
        public string Uf { get; set; }
        [Required]
        [StringLength(15)]
        public string Clima { get; set; }
        [Column(TypeName = "numeric(3, 1)")]
        public decimal? TemperaturaMinima { get; set; }
        [Column(TypeName = "numeric(3, 1)")]
        public decimal? TemperaturaMaxima { get; set; }
        [Column(TypeName = "date")]
        public DateTime DataPrevisao { get; set; }
    }
}
