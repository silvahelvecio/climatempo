using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiClimaTempo.Models;
using WebApiClimaTempo.Repositories.Interfaces;

namespace WebApiClimaTempo.Repositories
{
    public class PrevisaoClimaRepository : IPrevisaoClimaRepository
    {
        private readonly appDbContext _context;
        public PrevisaoClimaRepository(appDbContext context)
        {
            _context = context;
        }

        public async Task<List<PrevisaoClima>> ObterPrevisaoClima(string Cidade)
        {
            DateTime iDate = DateTime.Now.Date;
            DateTime fDate = DateTime.Now.AddDays(6).Date;
            var lista = await _context.PrevisaoClimas.Include(c => c.Cidade.Estado).Where(p => p.Cidade.Nome == Cidade && p.DataPrevisao >= iDate && p.DataPrevisao <= fDate).OrderBy(o => o.DataPrevisao).ToListAsync();
            return lista;
        }

        public async Task<TemperaturaCidades> ObterPrevisaoClimaHoje()
        {
            TemperaturaCidades temperaturaCidades = new TemperaturaCidades();
            temperaturaCidades.MaisQuentes = await PrevisaoClimaHoje("max");
            temperaturaCidades.MaisFrias = await PrevisaoClimaHoje("min");
     
            return temperaturaCidades;
        }

        public async Task<List<CidadesMaxMin>> PrevisaoClimaHoje(string ordemTemperatura)
        {
            DateTime iDate = DateTime.Now.Date;
            string string_ordem = (ordemTemperatura == "max" ? "TemperaturaMaxima desc,c.Nome asc,e.uf asc" : "TemperaturaMaxima asc,c.Nome asc,e.uf asc");

            var lista = await _context.CidadesMaxMins.FromSqlRaw("SELECT top(3) c.Nome Cidade" +
                ",e.UF,[Clima],[TemperaturaMinima]" +
                ",[TemperaturaMaxima],DataPrevisao" +
                " FROM [ClimaTempoSimples].[dbo].[PrevisaoClima] p" +
                " inner join Cidade c on p.CidadeId=c.Id" +
                " inner join Estado e on c.EstadoId=e.Id" +
                " where DataPrevisao='" + iDate.ToString("yyyy-MM-dd") + "' order by " + string_ordem +
                "").Take(100).ToListAsync();
            return lista;
        }
    }

}
