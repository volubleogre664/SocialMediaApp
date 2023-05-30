namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models.Inputs;

    public class UserDataInputValidator : AbstractValidator<UserDataInput>
    {
        public UserDataInputValidator()
        {
            this.RuleFor(_ => _.Username)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(50);

            this.RuleFor(_ => _.FirstName)
                .NotEmpty()
                .MaximumLength(50);

            this.RuleFor(_ => _.LastName)
                .NotEmpty()
                .MaximumLength(50);

            this.RuleFor(_ => _.AvatarUrl)
                .Custom((url, context) =>
                {
                    if (url != null && url.Trim() != string.Empty && !ValidateUrl(url))
                    {
                        context.AddFailure("Invalid URL");
                    }
                });

            this.RuleFor(_ => _.AuthUserId)
                .NotEmpty();
        }

        private static bool ValidateUrl(string url)
        {
            bool isValidUrl = Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            return isValidUrl;
        }
    }
}
