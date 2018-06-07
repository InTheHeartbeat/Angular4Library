using Angular4Library.BusinessLogic.Services.Transfer;
using Angular4Library.ViewModels;
using Angular4Library.ViewModels.Export;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class ExportController : Controller
    {
        private readonly ExportService _exportService;

        public ExportController(ExportService exportService)
        {
            _exportService = exportService;
        }

        [HttpPost("TryExport")]
        public FileResult TryExport([FromBody] ExportViewModel viewModel)
        {
            HttpContext.Response.ContentType = "application/octet-stream";
            return _exportService.Export(viewModel);            
        }       
    }
}
