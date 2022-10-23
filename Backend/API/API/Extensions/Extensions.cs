using BusinessLogic.Mappers;
using BusinessLogic.Services;
using BusinessLogic.Services.Impl;
using DataAccess.Repositories;
using DataAccess.Repositories.Impl;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class Extensions
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(RectangleMapper));
            services.AddScoped<IJsonService, JsonService>();
            services.AddScoped<IRectangleRepository, RectangleRepository>();
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.EnableAnnotations();
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }
    }
}
