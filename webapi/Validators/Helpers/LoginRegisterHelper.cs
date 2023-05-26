namespace Webapi.Validators.Helpers
{
    using System.Text.RegularExpressions;

    public static partial class LoginRegisterHelper
    {
        public static bool ContainsUppercase(string password)
        {
            return UppercaseRegex().IsMatch(password);
        }

        public static bool ContainsSpecialCharacter(string password)
        {
            return SpecialCharaterRegex().IsMatch(password);
        }

        public static bool ContainsNumber(string password)
        {
            return NumberRegex().IsMatch(password);
        }

        [GeneratedRegex("\\d")]
        private static partial Regex NumberRegex();

        [GeneratedRegex("[!@#$%^&*(),.?\":{}|<>]")]
        private static partial Regex SpecialCharaterRegex();

        [GeneratedRegex("[A-Z]")]
        private static partial Regex UppercaseRegex();
    }
}
