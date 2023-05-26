namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models.Inputs;
    using Webapi.Validators.Helpers;

    public class RegisterInputValidator : AbstractValidator<RegisterInput>
    {
        public RegisterInputValidator()
        {
            this.RuleFor(_ => _.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(50);

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
    }
}
