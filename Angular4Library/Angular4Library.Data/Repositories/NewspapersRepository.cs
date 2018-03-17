using System;
using System.Collections.Generic;
using System.Text;
using Angular4Library.Data.Interfaces;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Products;

namespace Angular4Library.Data.Repositories
{
    public class NewspapersRepository : IProductRepository<Newspaper>
    {
        private readonly LibraryContext _context;

        public NewspapersRepository(LibraryContext context)
        {
            _context = context;
        }
        public IEnumerable<Newspaper> GetAll()
        {
            IEnumerable<Newspaper> result = _context.Newspapers.FindAll();
            return result;
        }

        public Newspaper GetProductById(int id)
        {
            Newspaper result = _context.Newspapers.FindOne(newspaper => newspaper.Id == id);
            return result;
        }

        public void InsertProduct(Newspaper product)
        {
            _context.Newspapers.Insert(product);
        }

        public void UpdateProduct(Newspaper product)
        {
            _context.Newspapers.Update(product);
        }

        public void DeleteProduct(int id)
        {
            _context.Newspapers.Delete(id);
        }
    }
}
