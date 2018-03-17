using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data.Models;
using Angular4Library.Data.Providers;
using Angular4Library.Helpers;
using Angular4Library.Models;
using Angular4Library.Services;
using Angular4Library.Services.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class ImportController : Controller
    {
        private readonly ImportService _importService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ImportController(IHostingEnvironment hostingEnvironment)
        {
            _importService = new ImportService();
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("TryImport")]
        public IActionResult TryImport()
        {
            IFormFile file = Request.Form.Files[0];
            try
            {                
                _importService.Import(file);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}