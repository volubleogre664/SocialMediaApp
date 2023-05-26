namespace Webapi.Services
{
    using Webapi.Data;
    using Webapi.Interfaces;
    using Webapi.Models;

    public class UserService : GenericService<User>, IUserService
    {
        public UserService(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
