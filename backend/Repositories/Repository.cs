using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Collections.Generic;
using WebApiClimaTempo.Repositories.Interfaces;

namespace WebApiClimaTempo.Repositories
{
    public class Repository : IRepository
    {

        private readonly IHostEnvironment _env;

        public Repository(IHostEnvironment env)
        {
            _env = env;
        }

    }
}
