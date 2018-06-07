using System;
using Angular4Library.BusinessLogic.Services.Products;
using Angular4Library.BusinessLogic.Services.Transfer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class ImportController : Controller
    {
        private readonly ImportService _importService;
        private readonly BooksService _booksService;

        private readonly IHostingEnvironment _hostingEnvironment;

        public ImportController(IHostingEnvironment hostingEnvironment, ImportService importService, BooksService booksService)
        {
            _importService = importService;
            _booksService = booksService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("TryImport")]
        public IActionResult TryImport()
        {
            IFormFile file = Request.Form.Files[0];
            try
            {                
                _importService.Import(file, _booksService);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
