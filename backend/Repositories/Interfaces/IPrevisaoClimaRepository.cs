using System.Collections.Generic;
using System.Threading.Tasks;
using WebApiClimaTempo.Models;

namespace WebApiClimaTempo.Repositories.Interfaces
{
    public interface IPrevisaoClimaRepository
    {
        Task<List<PrevisaoClima>> ObterPrevisaoClima(string Cidade);
        Task<TemperaturaCidades> ObterPrevisaoClimaHoje();
    }
}
