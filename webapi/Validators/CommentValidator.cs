namespace Webapi.Validators
{
    using FluentValidation;
    using Webapi.Models;

    public class CommentValidator : AbstractValidator<Comment>
    {
        public CommentValidator()
        {
            this.RuleFor(_ => _.UserId)
                .NotEmpty();

            this.RuleFor(_ => _.Text)
                .NotEmpty();

            this.RuleFor(_ => _.DateTimePosted)
                .NotEmpty();

            this.RuleFor(_ => _.PostId)
                .NotEmpty();
        }
    }
}
