using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Angular4Library.Helpers;
using Angular4Library.Models.Data;
using Angular4Library.Services;
using Angular4Library.Services.Products;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly BooksService _service;
        private readonly IHostingEnvironment _hostingEnvironment;

        public BooksController(IHostingEnvironment hostingEnvironment)
        {
            _service = new BooksService();
            _hostingEnvironment = hostingEnvironment;
        }
        
        [HttpGet("GetBooks")]        
        public IEnumerable<BookViewModel> GetBooks()
        {
            IEnumerable<BookViewModel> result = _service.GetAll();
            return result;
        }

        [HttpGet("GetBook/{id}")]
        public BookViewModel GetBook(int id)
        {
            BookViewModel result = _service.GetBookById(id);
            return result;
        }
        
        [HttpPost("AddBook")]        
        public IActionResult AddBook([FromBody]BookViewModel book)
        {            
            try
            {
                _service.AddNewBook(book);
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
                _service.EditBook(bookViewModel);
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
            _service.DeleteBookById(id);
            return Ok();
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