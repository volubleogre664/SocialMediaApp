using Microsoft.AspNetCore.Mvc;

namespace Webapi.Controllers
{
    public class ChatController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
