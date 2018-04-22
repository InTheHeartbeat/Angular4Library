using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Angular4Library.Helpers;
using Angular4Library.Models.Data;
using Angular4Library.Services.Products;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class JournalsController : Controller
    {        
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly JournalsService _journalsService;

        public JournalsController(IHostingEnvironment hostingEnvironment)
        {
            _journalsService = new JournalsService();          
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GetJournals")]
        public IEnumerable<JournalViewModel> GetJournals()
        {
            IEnumerable<JournalViewModel> result = _journalsService.GetAll();
            return result;
        }

        [HttpGet("GetJournal/{id}")]
        public JournalViewModel GetJournal(int id)
        {
            JournalViewModel result = _journalsService.GetJournalById(id);
            return result;
        }

        [HttpPost("AddJournal")]
        public IActionResult AddJournal([FromBody]JournalViewModel journal)
        {
            try
            {
                _journalsService.AddNewJournal(journal);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("EditJournal")]
        public IActionResult EditJournal([FromBody]JournalViewModel journal)
        {
            try
            {
                _journalsService.EditJournal(journal);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("DeleteJournal/{id}")]
        public IActionResult DeleteJournal(int id)
        {
            _journalsService.DeleteJournalById(id);
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