using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace WebApiClimaTempo.Models
{
    [Table("Estado")]
    public partial class Estado
    {
        public Estado()
        {
            Cidades = new HashSet<Cidade>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Nome { get; set; }
        [Required]
        [Column("UF")]
        [StringLength(2)]
        public string Uf { get; set; }

        [InverseProperty(nameof(Cidade.Estado))]
        public virtual ICollection<Cidade> Cidades { get; set; }
    }
}
