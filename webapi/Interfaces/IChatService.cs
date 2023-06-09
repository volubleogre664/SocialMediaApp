﻿namespace Webapi.Interfaces
{
    using Webapi.Models;

    public interface IChatService : IGenericService<Chat>
    {
        public Task<Chat> AddChat(Chat entity);
    }
}
