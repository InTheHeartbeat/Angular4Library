using System;
using System.Net;
using System.Net.Http;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Angular4Library.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class ExportController : Controller
    {

        private LibraryContext _context;

        public ExportController(LibraryContext context)
        {
            _context = context;
        }

        [HttpPost("TryExport")]
        public FileResult TryExport([FromBody] ExportModel model)
        {
            HttpContext.Response.ContentType = "application/octet-stream";            

            switch (model.Type)
            {
                case (int) ProductType.Book:
                    return new FileContentResult(ExportHelper.ExportBooks(model, _context), "application/octet-stream")
                    {
                        FileDownloadName = "exp-" + DateTime.Now + "-books" + (model.IsXml ? ".xml" : ".txt")                       
                    };
                case (int)ProductType.Journal:
                    return new FileContentResult(ExportHelper.ExportJournals(model, _context), "application/octet-stream")
                    {
                        FileDownloadName = "exp-" + DateTime.Now + "-journals" + (model.IsXml ? ".xml" : ".txt")
                    };
                case (int)ProductType.Newspaper:
                    return new FileContentResult(ExportHelper.ExportNewspapers(model, _context), "application/octet-stream")
                    {
                        FileDownloadName = "exp-" + DateTime.Now + "-newspapers" + (model.IsXml ? ".xml" : ".txt")
                    };
            }

            return null;
        }       
    }
}