namespace Webapi.Services
{
    using Webapi.Models;

    public class ChatService
    {
        public ChatService()
        {
        }

        public void SaveChat(Chat entity)
        {
            Console.WriteLine(entity);
        }
    }
}
