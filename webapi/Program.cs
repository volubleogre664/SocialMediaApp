namespace SocialMediaApp
{
    using System.Text;

    using FluentValidation;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Azure;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;

    using Webapi.Data;
    using Webapi.Hub;
    using Webapi.Interfaces;
    using Webapi.Models;
    using Webapi.Models.Inputs;
    using Webapi.Services;
    using Webapi.Validators;

    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var configBuilder = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var configuration = configBuilder.Build();

            builder.Services
                .AddDefaultIdentity<AppUser>()
                .AddEntityFrameworkStores<AuthDbContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("AuthDbContextConnection")));
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Add services to the container.
            builder.Services.AddControllers();

            // Add services to the container.
            builder.Services.AddScoped<IValidator<RegisterInput>, RegisterInputValidator>();
            builder.Services.AddScoped<IValidator<LoginInput>, LoginInputValidator>();
            builder.Services.AddScoped<IValidator<UserDataInput>, UserDataInputValidator>();
            builder.Services.AddScoped<IValidator<Post>, PostValidator>();

            builder.Services.AddScoped<IChatService, ChatService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IPostService, PostService>();
            builder.Services.AddScoped<ICommentService, CommentService>();

            builder.Services.AddSignalR();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Social Media App API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer",
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                        },
                        Array.Empty<string>()
                    },
                });
            });

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWT:ValidAudience"],
                    ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SECRET"] !)),
                };
            });

            builder.Services.AddAzureClients(clientBuilder =>
            {
                clientBuilder.AddBlobServiceClient(configuration.GetConnectionString("StorageConnectionString:blob"), preferMsi: true);
                clientBuilder.AddQueueServiceClient(configuration.GetConnectionString("StorageConnectionString:queue"), preferMsi: true);
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
            app.UseAuthorization();
            app.UseFileServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chat");

            });

            app.UseHttpsRedirection();

            app.MapControllers();

            app.Run();
        }
    }
}