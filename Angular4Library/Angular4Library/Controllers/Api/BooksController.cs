using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Books")]
    public class BooksController : Controller
    {
        private LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        [Route("api/Books/GetBooks")]
        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return _context.Books.FindAll();
        }

        [Route("api/Books/AddBook")]
        [HttpPost]
        public IActionResult AddBook([FromBody]Book book)
        {            
            try
            {
                _context.Books.Insert(new Book()
                {
                    Title = book.Title,
                    Author = book.Author,
                    Genre = book.Genre,
                    Amount = book.Amount,
                    Pages = book.Pages,
                    Price = book.Price,
                    Year = book.Year,
                    PhotoId = book?.PhotoId
                });                
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [Route("api/Books/EditBook")]
        [HttpPut]
        public IActionResult EditBook([FromBody]Book bookModel)
        {            
            Book book = _context.Books.FindById(bookModel.Id);

            if (book == null) { return NotFound(); }

            try
            {
                book.Title = bookModel.Title;
                book.Author = bookModel.Author;
                book.Genre = bookModel.Genre;
                book.Pages = bookModel.Pages;
                book.Year = bookModel.Year;
                book.Price = bookModel.Price;
                book.Amount = bookModel.Amount;
                book.PhotoId = bookModel?.PhotoId;

                _context.Books.Update(book);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [Route("api/Books/DeleteBook")]
        [HttpDelete]
        public IActionResult DeleteBook([FromBody]int id)
        {            
            Book forDelete = _context.Books.FindById(id);

            if (forDelete == null) { return NotFound(); }

            try
            {
                _context.Books.Delete(forDelete.Id);                
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }
    }
}