using System;
using System.Collections.Generic;
using System.Text;
using Angular4Library.Data.Interfaces;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Products;

namespace Angular4Library.Data.Repositories
{
    public class JournalsRepository : IProductRepository<Journal>
    {
        private readonly LibraryContext _context;

        public JournalsRepository(LibraryContext context)
        {
            _context = context;
        }
        public IEnumerable<Journal> GetAll()
        {
            IEnumerable<Journal> result = _context.Journals.FindAll();
            return result;
        }

        public Journal GetProductById(int id)
        {
            Journal result = _context.Journals.FindOne(journal => journal.Id == id);
            return result;
        }

        public void InsertProduct(Journal product)
        {
            _context.Journals.Insert(product);
        }

        public void UpdateProduct(Journal product)
        {
            _context.Journals.Update(product);
        }

        public void DeleteProduct(int id)
        {
            _context.Journals.Delete(id);
        }
    }
}
