namespace webapi.Services
{
    using webapi.Models;

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
