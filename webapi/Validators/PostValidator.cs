namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models;

    public class PostValidator : AbstractValidator<Post>
    {
        public PostValidator()
        {
            this.RuleFor(_ => _.UserId)
                .NotNull();

            this.RuleFor(_ => _.Text)
                .NotEmpty();

            this.RuleFor(_ => _.DateTimePosted)
                .NotNull()
                .LessThan(DateTime.Now.AddDays(1).Date)
                .WithMessage($"Date Cannot be After {DateTime.Now.AddDays(1).ToShortDateString()}");

            this.RuleFor( _ => _.MediaUrl)
                .Custom((url, context) =>
                {
                    if (url != null && url.Trim() != string.Empty && !ValidateUrl(url))
                    {
                        context.AddFailure("Invalid URL");
                    }
                });
        }

        private static bool ValidateUrl(string url)
        {
            bool isValidUrl = Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            return isValidUrl;
        }
    }
}
