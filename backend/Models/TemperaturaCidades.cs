using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace WebApiClimaTempo.Models
{
    public class TemperaturaCidades
    {
        public List<CidadesMaxMin> MaisQuentes { get; set; }
        public List<CidadesMaxMin> MaisFrias { get; set; }
    }
}
