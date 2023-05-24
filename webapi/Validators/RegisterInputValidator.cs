namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models.Inputs;
    using Webapi.Validators.Helpers;

    public class RegisterInputValidator : AbstractValidator<RegisterInput>
    {
        public RegisterInputValidator()
        {
            this.RuleFor(_ => _.Username)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(50);

            this.RuleFor(_ => _.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(50);

            this.RuleFor(_ => _.FirsName)
                .NotEmpty()
                .MaximumLength(50);

            this.RuleFor(_ => _.LastName)
                .NotEmpty()
                .MaximumLength(50);

            this.RuleFor(_ => _.AvatarUrl)
                .Custom((url, context) =>
                {
                    if (url.Trim() != string.Empty && !ValidateUrl(url))
                    {
                        context.AddFailure("Invalid URL");
                    }
                });

            this.RuleFor(_ => _.Password)
                .NotEmpty()
                .MinimumLength(6)
                .MaximumLength(50)
                .Must(_ => LoginRegisterHelper.ContainsSpecialCharacter(_))
                .WithMessage("Password must contain at least 1 special character.")
                .Must(_ => LoginRegisterHelper.ContainsUppercase(_))
                .WithMessage("Password must contain at least 1 uppercase.")
                .Must(_ => LoginRegisterHelper.ContainsNumber(_))
                .WithMessage("Password must contain at least one number.");

            this.RuleFor(_ => _.ConfirmPassword)
                .NotEmpty()
                .Equal(_ => _.Password)
                .WithMessage("Confirm Password must be equal to password.");
        }

        private static bool ValidateUrl(string url)
        {
            bool isValidUrl = Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            return isValidUrl;
        }
    }
}
