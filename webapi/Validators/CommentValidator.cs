namespace Webapi.Validators
{
    using FluentValidation;
    using Webapi.Models;
    using Webapi.Models.Inputs;

    public class CommentValidator : AbstractValidator<Post>
    {
        public CommentValidator()
        {
            this.RuleFor(_ => _.UserId)
                .NotNull();

            this.RuleFor(_ => _.Text)
                .NotEmpty();
        }
    }
}
