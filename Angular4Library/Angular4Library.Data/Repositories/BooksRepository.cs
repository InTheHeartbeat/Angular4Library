using System;
using System.Collections.Generic;
using System.Text;
using Angular4Library.Data.Interfaces;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Products;

namespace Angular4Library.Data.Repositories
{
    public class BooksRepository : IProductRepository<Book>
    {
        private readonly LibraryContext _context;

        public BooksRepository(LibraryContext context)
        {
            _context = context;
        }

        public IEnumerable<Book> GetAll()
        {
            IEnumerable<Book> result = _context.Books.FindAll();
            return result;
        }

        public Book GetProductById(int id)
        {
            Book result = _context.Books.FindOne(book => book.Id == id);
            return result;
        }

        public void InsertProduct(Book product)
        {            
            _context.Books.Insert(product);
        }

        public void UpdateProduct(Book book)
        {
            _context.Books.Update(book);
        }

        public void DeleteProduct(int id)
        {
            _context.Books.Delete(id);
        }
    }
}
