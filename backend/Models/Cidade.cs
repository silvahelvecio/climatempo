using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace WebApiClimaTempo.Models
{
    [Table("Cidade")]
    public partial class Cidade
    {
        public Cidade()
        {
            PrevisaoClimas = new HashSet<PrevisaoClima>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Nome { get; set; }
        public int EstadoId { get; set; }

        [ForeignKey(nameof(EstadoId))]
        [InverseProperty("Cidades")]
        public virtual Estado Estado { get; set; }
        [InverseProperty(nameof(PrevisaoClima.Cidade))]
        public virtual ICollection<PrevisaoClima> PrevisaoClimas { get; set; }
    }
}
