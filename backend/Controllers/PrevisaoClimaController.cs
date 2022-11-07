using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiClimaTempo.Repositories.Interfaces;

namespace WebApiClimaTempo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrevisaoClimaController : ControllerBase
    {

        private readonly IPrevisaoClimaRepository _previvisaoClimaRepositoty;
        public PrevisaoClimaController(IPrevisaoClimaRepository previvisaoClimaRepositoty)
        {
            _previvisaoClimaRepositoty = previvisaoClimaRepositoty;
        }

        // GET: api/PrevisaoClima 7 dias
        [HttpGet]
        [Route("ClimaTempo")]
        public async Task<IActionResult> GetPrevisaoClimas(string Cidade)
        {
            try
            {
                var lista = await Task.FromResult(_previvisaoClimaRepositoty.ObterPrevisaoClima(Cidade));
                return Ok(lista.Result);
            } catch(Exception e)
            {
                return BadRequest(e.Message.ToString());
            }
        }

        // GET: api/PrevisaoClimaHoje
        [HttpGet]
        [Route("PrevisaoClimaHoje")]
        public async Task<IActionResult> GetPrevisaoClimaHoje()
        {
            try
            {
                var lista = await Task.FromResult(_previvisaoClimaRepositoty.ObterPrevisaoClimaHoje());
                return Ok(lista.Result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message.ToString());
            }
        }
    }
}
