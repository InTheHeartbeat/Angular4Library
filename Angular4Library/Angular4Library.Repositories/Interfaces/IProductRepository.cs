using System.Collections.Generic;

namespace Angular4Library.Repositories.Interfaces
{
    public interface IProductRepository<T>
    {
        IEnumerable<T> GetAll();

        T GetProductById(int id);
        int InsertProduct(T product);
        void UpdateProduct(T book);
        void DeleteProduct(int id);
    }
}
