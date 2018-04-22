using System;
using Angular4Library.Models;
using Angular4Library.Services.Data;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class ExportController : Controller
    {
        private readonly ExportService _exportService;

        public ExportController()
        {
            _exportService = new ExportService();
        }

        [HttpPost("TryExport")]
        public FileResult TryExport([FromBody] ExportViewModel viewModel)
        {
            HttpContext.Response.ContentType = "application/octet-stream";
            return _exportService.Export(viewModel);            
        }       
    }
}