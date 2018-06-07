using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.BusinessLogic.Services.Accounting;
using Angular4Library.BusinessLogic.Services.Additional;
using Angular4Library.BusinessLogic.Services.Products;
using Angular4Library.BusinessLogic.Services.Selling;
using Angular4Library.BusinessLogic.Services.Transfer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Angular4Library
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<AccountService>();
            services.AddTransient<AuthorService>();
            services.AddTransient<BooksService>();
            services.AddTransient<JournalsService>();
            services.AddTransient<NewspapersService>();
            services.AddTransient<SellService>();
            services.AddTransient<ExportService>();
            services.AddTransient<ImportService>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }           

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "Upload")),
                RequestPath = "/Upload"
            });
            app.UseMvc();
        }
    }
}
