using Angular4Library.Data.Entities.Products;
using Angular4Library.Data.Models.Products;
using System.Collections.Generic;

namespace Angular4Library.Repositories.Interfaces
{
    public interface IBookRepository
    {
        IEnumerable<ExtendedBook> GetAll();

        ExtendedBook GetProductById(int id);
        int InsertProduct(Book book);
        void UpdateProduct(Book book);
        void DeleteProduct(int id);
    }
}
