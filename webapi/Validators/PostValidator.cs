namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models;

    public class PostValidator : AbstractValidator<Post>
    {
        public PostValidator()
        {
            this.RuleFor(_ => _.Text)
                .NotEmpty();

            this.RuleFor(_ => _.UserID)
                .GreaterThan(0);

            this.RuleFor(_ => _.DateTimePosted)
                .NotNull()
                .LessThan(DateTime.Now.AddDays(1).Date)
                .WithMessage($"Date Cannot be On or After {DateTime.Now.AddDays(1).ToShortDateString()}");

            this.RuleFor(_ => _.MediaUrl)
                .NotEmpty();
        }
    }
}
