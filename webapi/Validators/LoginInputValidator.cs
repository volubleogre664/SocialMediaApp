namespace Webapi.Validators
{
    using FluentValidation;

    using Webapi.Models.Inputs;
    using Webapi.Validators.Helpers;

    public class LoginInputValidator : AbstractValidator<LoginInput>
    {
        public LoginInputValidator()
        {
            this.RuleFor(_ => _.Password)
                .NotEmpty()
                .MinimumLength(6)
                .MaximumLength(50)
                .Must(_ => LoginRegisterHelper.ContainsSpecialCharacter(_))
                .WithMessage("Invalid Password")
                .Must(_ => LoginRegisterHelper.ContainsUppercase(_))
                .WithMessage("Invalid Password")
                .Must(_ => LoginRegisterHelper.ContainsNumber(_))
                .WithMessage("Invalid Password");

            this.RuleFor(_ => _.Email)
                .NotEmpty()
                .EmailAddress()
                .MaximumLength(50);
        }
    }
}
