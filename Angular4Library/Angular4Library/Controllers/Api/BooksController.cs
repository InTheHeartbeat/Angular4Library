using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private LibraryContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public BooksController(LibraryContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        
        [HttpGet("GetBooks")]        
        public IEnumerable<Book> GetBooks()
        {
            return _context.Books.FindAll();
        }

        [HttpGet("GetBook/{id}")]
        public Book GetBook(int id)
        {
            return _context.Books.FindOne(book=>book.Id == id);
        }
        
        [HttpPost("AddBook")]        
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
                    PhotoPath = book.PhotoPath
                });                
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }
        
        [HttpPut("EditBook")]        
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
                book.PhotoPath = bookModel.PhotoPath;
                _context.Books.Update(book);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }
        
        [HttpDelete("DeleteBook/{id}")]        
        public IActionResult DeleteBook(int id)
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

        [HttpPost("UploadPhoto")]        
        public async Task<IActionResult> UploadPhoto()
        {
            var file = Request.Form.Files[0];
            string relPath = "/Upload/Images/";
            string root = _hostingEnvironment.WebRootPath + relPath;
            string customFileName = Guid.NewGuid().ToString() + new FileInfo(file.FileName).Extension;
            int id = -1;

            try
            {
                using (Stream stream = file.OpenReadStream())
                {
                    using (var binaryReader = new BinaryReader(stream))
                    {
                        byte[] fileContent = binaryReader.ReadBytes((int) file.Length);                        

                        using (FileStream fs = new FileStream(root + customFileName, FileMode.Create))
                        {
                            await fs.WriteAsync(fileContent, 0, fileContent.Length);
                        }                        
                    }
                }
                return Ok(new Image{Path = relPath + customFileName});
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }            
        }
    }
}