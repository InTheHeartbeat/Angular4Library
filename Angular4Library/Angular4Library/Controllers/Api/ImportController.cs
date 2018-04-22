using System;
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