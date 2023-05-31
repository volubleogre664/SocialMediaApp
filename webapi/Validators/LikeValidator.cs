namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models;

    public class LikeValidator : AbstractValidator<Like>
    {
        public LikeValidator()
        {
            this.RuleFor(_ => _.PostId)
                .NotEmpty();

            this.RuleFor(_ => _.UserId)
                .NotEmpty();
        }
    }
}
