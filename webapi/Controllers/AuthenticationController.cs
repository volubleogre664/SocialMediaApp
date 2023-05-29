namespace W.Controllers
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    using FluentValidation;

    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.UI.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;

    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models.Inputs;

    [ApiController]
    [Route("/api/auth/[action]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;
        private readonly IUserStore<AppUser> userStore;
        private readonly IUserEmailStore<AppUser> emailStore;
        private readonly ILogger<AuthenticationController> logger;
        private readonly IEmailSender emailSender;
        private readonly IValidator<RegisterInput> registerValidator;
        private readonly AuthDbContext authContext;
        private readonly IUserService userService;
        private readonly IConfiguration configuration;

        public AuthenticationController(
            UserManager<AppUser> userManager,
            IUserStore<AppUser> userStore,
            SignInManager<AppUser> signInManager,
            ILogger<AuthenticationController> logger,
            IEmailSender emailSender,
            IValidator<RegisterInput> registerValidator,
            AuthDbContext authDbContext,
            IUserService userService,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.userStore = userStore;
            this.emailStore = this.GetEmailStore();
            this.signInManager = signInManager;
            this.logger = logger;
            this.emailSender = emailSender;
            this.registerValidator = registerValidator;
            this.authContext = authDbContext;
            this.userService = userService;
            this.configuration = configuration;
        }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        [HttpPost]
        public async Task<IActionResult> Login(LoginInput model)
        {
            if (this.ModelState.IsValid)
            {
                var user = await this.signInManager.UserManager.FindByNameAsync(model.Email);
                if (user == null)
                {
                    this.ModelState.AddModelError(string.Empty, "Invalid email address.");
                    return this.BadRequest(this.ModelState);
                }

                var isPasswordCorrect = await this.signInManager.UserManager.CheckPasswordAsync(user, model.Password);

                if (isPasswordCorrect)
                {
                    await this.signInManager.SignInAsync(user, true);
                }
                else
                {
                    this.ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return this.BadRequest(this.ModelState);
                }

                // var userData = this.userService.FindByField("AuthUserId", user.Id);

                this.logger.LogInformation("User logged in.");

                var token = new JwtSecurityTokenHandler().WriteToken(this.GetToken());
                var userData = this.userService.FindByField("AuthUserId", user.Id);

                return this.Ok(new { user = userData, token });
            }

            return this.BadRequest(new { message = "Invalid Login Attempt" });
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterInput model, string? returnUrl = null)
        {
            this.ExternalLogins = (await this.signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            var validationResult = this.registerValidator.Validate(model);

            if (!validationResult.IsValid)
            {
                this.ModelState.AddModelError(string.Empty, "Invalid registration attempt.");

                return this.BadRequest(this.ModelState);
            }

            var user = this.CreateUser();

            await this.userStore.SetUserNameAsync(user, model.Email, CancellationToken.None);
            await this.emailStore.SetEmailAsync(user, model.Email, CancellationToken.None);

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    this.ModelState.AddModelError(string.Empty, error.Description);
                }

                return this.BadRequest(this.ModelState);
            }

            this.logger.LogInformation("User created a new account with password.");

            await this.signInManager.SignInAsync(user, isPersistent: false);

            var token = new JwtSecurityTokenHandler().WriteToken(this.GetToken());

            return this.Ok(new { authUserId = user.Id, token });
        }

        [HttpPost]
        public async Task<IActionResult> Logout(string? returnUrl = null)
        {
            await this.signInManager.SignOutAsync();
            this.logger.LogInformation("User logged out.");
            if (returnUrl != null)
            {
                return this.LocalRedirect(returnUrl);
            }
            else
            {
                return this.RedirectToPage("Index");
            }
        }

        private AppUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<AppUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(AppUser)}'. " +
                    $"Ensure that '{nameof(AppUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<AppUser> GetEmailStore()
        {
            if (!this.userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }

            return (IUserEmailStore<AppUser>)this.userStore;
        }

        private JwtSecurityToken GetToken()
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JWT:Secret"] !));

            var token = new JwtSecurityToken(
                issuer: this.configuration["JWT:ValidIssuer"],
                audience: this.configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: new List<Claim>(),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return token;
        }
    }
}
