using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Angular4Library.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class ImportController : Controller
    {
        private LibraryContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ImportController(LibraryContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("TryImport")]
        public IActionResult TryImport()
        {
            IFormFile file = Request.Form.Files[0];
            try
            {
                FileInfo info = new FileInfo(file.FileName.Trim('\"'));
                ImportModel importModel = ImportHelper.Import(file.OpenReadStream(), info.Extension == ".xml");
                if (importModel.BookProducts != null && importModel.BookProducts.Any())
                {
                    _context.Books.Insert(importModel.BookProducts);
                }
                if (importModel.JournalProducts != null && importModel.JournalProducts.Any())
                {
                    _context.Journals.Insert(importModel.JournalProducts);
                }
                if (importModel.NewspaperProducts != null && importModel.NewspaperProducts.Any())
                {
                    _context.Newspapers.Insert(importModel.NewspaperProducts);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e); // нельзя уже сщест
            }
        }
    }
}