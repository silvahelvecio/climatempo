using Microsoft.Extensions.DependencyInjection;
using WebApiClimaTempo.Repositories;
using WebApiClimaTempo.Repositories.Interfaces;

namespace WebApiClimaTempo
{
    public static class Container
    {
        public static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IPrevisaoClimaRepository, PrevisaoClimaRepository>();
            services.AddScoped<IRepository, Repository>();
        }
    }
}
