namespace Webapi.Services
{
    using System.Collections.Generic;
    using System.Linq;

    using Microsoft.EntityFrameworkCore;

    using Webapi.Data;
    using Webapi.Interfaces;

    public class GenericService<T> : IGenericService<T>
        where T : class
    {
        private readonly ApplicationDbContext context;

        public GenericService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public List<T> GetAll()
        {
            return this.context.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return this.context.Set<T>().Find(id);
        }

        public void Add(T entity)
        {
            this.context.Set<T>().Add(entity);
            this.context.SaveChanges();
        }

        public void Update(T entity)
        {
            this.context.Set<T>().Attach(entity);
            this.context.Entry(entity).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            T? entity = this.context.Set<T>().Find(id);
            this.context.Set<T>().Remove(entity!);
            this.context.SaveChanges();
        }

        public T? FindByField(string fieldName, object value)
        {
            return this.GetAll().FirstOrDefault(_ =>
            {
                var propertyInfo = typeof(T).GetProperty(fieldName);
                if (propertyInfo == null)
                {
                    return false;
                }

                var property = propertyInfo.GetValue(_);

                return Equals(property, value);
            });
        }

        public List<T> FindAllByField(string fieldName, object value)
        {
            return this.GetAll().FindAll(_ =>
            {
                var propertyInfo = typeof(T).GetProperty(fieldName);
                if (propertyInfo == null)
                {
                    return false;
                }

                var property = propertyInfo.GetValue(_);

                return Equals(property, value);
            });
        }
    }
}
