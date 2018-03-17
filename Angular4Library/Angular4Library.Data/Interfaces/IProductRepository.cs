using System.Collections.Generic;

namespace Angular4Library.Data.Interfaces
{
    public interface IProductRepository<T>
    {
        IEnumerable<T> GetAll();

        T GetProductById(int id);
        void InsertProduct(T product);
        void UpdateProduct(T book);
        void DeleteProduct(int id);
    }
}
