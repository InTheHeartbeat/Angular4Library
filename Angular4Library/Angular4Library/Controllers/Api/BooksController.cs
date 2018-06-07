using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Angular4Library.BusinessLogic.Services.Products;
using Angular4Library.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Angular4Library.ViewModels.Data;
using Angular4Library.ViewModels.Books;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly BooksService _bookService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public BooksController(IHostingEnvironment hostingEnvironment, BooksService booksService)
        {
            _bookService = booksService;
            _hostingEnvironment = hostingEnvironment;
        }
        
        [HttpGet("GetBooks")]        
        public IEnumerable<BookViewModel> GetBooks()
        {
            List<BookViewModel> result = _bookService.GetAll().ToList();
            return result;
        }

        [HttpGet("GetBook/{id}")]
        public BookViewModel GetBook(int id)
        {
            BookViewModel result = _bookService.GetBookById(id);
            return result;
        }
        
        [HttpPost("AddBook")]        
        public IActionResult AddBook([FromBody]BookViewModel book)
        {            
            try
            {
                _bookService.AddNewBook(book);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpPut("EditBook")]
        public IActionResult EditBook([FromBody] BookViewModel bookViewModel)
        {
            try
            {
                _bookService.EditBook(bookViewModel);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            try
            {
                _bookService.DeleteBookById(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("UploadPhoto")]
        public async Task<IActionResult> UploadPhoto()
        {
            try
            {
                ImageViewModel result = await PhotoUploader.UploadPhoto(Request, _hostingEnvironment);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
