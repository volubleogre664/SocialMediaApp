namespace Webapi
{
    using Microsoft.Extensions.Azure;
    using Microsoft.Extensions.DependencyInjection;

    using webapi.Hub;
    using Webapi.Interfaces;
    using Webapi.Services;
    
    public static class Program
    {
        private static void Main(string[] args)
        {
        var builder = WebApplication.CreateBuilder(args);

            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();

        builder.Services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddMvc();
        builder.Services.AddSignalR().AddAzureSignalR();
        builder.Services.AddScoped<ChatService>();

            builder.Services.AddAzureClients(clientBuilder =>
            {
                clientBuilder.AddBlobServiceClient(config.GetConnectionString("StorageConnectionString:blob"), preferMsi: true);
                clientBuilder.AddQueueServiceClient(config.GetConnectionString("StorageConnectionString:queue"), preferMsi: true);
            });

            builder.Services.AddScoped<IBlobStorageService, BlobStorageService>();

            var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials
        }

        app.UseRouting();
        app.UseFileServer();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<ChatHub>("/chat");

        });

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}