using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class JournalsController : Controller
    {
        private LibraryContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public JournalsController(LibraryContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GetJournals")]
        public IEnumerable<Journal> GetJournals()
        {            
            return _context.Journals.FindAll();
        }

        [HttpGet("GetJournal/{id}")]
        public Journal GetJournal(int id)
        {
            return _context.Journals.FindOne(journal => journal.Id == id);
        }

        [HttpPost("AddJournal")]
        public IActionResult AddJournal([FromBody]Journal journal)
        {
            try
            {
                _context.Journals.Insert(new Journal()
                {
                    Title = journal.Title,
                    Date = journal.Date,
                    Theme = journal.Theme,
                    Amount = journal.Amount,
                    Pages = journal.Pages,
                    Price = journal.Price,
                    Periodicity = journal.Periodicity,
                    PhotoPath = journal.PhotoPath
                });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpPut("EditJournal")]
        public IActionResult EditJournal([FromBody]Journal journalModel)
        {
            Journal journal = _context.Journals.FindById(journalModel.Id);

            if (journal == null) { return NotFound(); }

            try
            {
                journal.Title = journalModel.Title;
                journal.Date = journalModel.Date;
                journal.Theme = journalModel.Theme;
                journal.Pages = journalModel.Pages;
                journal.Periodicity = journalModel.Periodicity;
                journal.Price = journalModel.Price;
                journal.Amount = journalModel.Amount;
                journal.PhotoPath = journalModel.PhotoPath;
                _context.Journals.Update(journal);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpDelete("DeleteJournal/{id}")]
        public IActionResult DeleteJournal(int id)
        {
            Journal forDelete = _context.Journals.FindById(id);

            if (forDelete == null) { return NotFound(); }

            try
            {
                _context.Journals.Delete(forDelete.Id);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpPost("UploadPhoto")]
        public async Task<IActionResult> UploadPhoto()
        {
            var file = Request.Form.Files[0];
            string relPath = "/Upload/Images/";
            string root = _hostingEnvironment.WebRootPath + relPath;
            string customFileName = Guid.NewGuid().ToString() + new FileInfo(file.FileName).Extension;
            int id = -1;

            try
            {
                using (Stream stream = file.OpenReadStream())
                {
                    using (var binaryReader = new BinaryReader(stream))
                    {
                        byte[] fileContent = binaryReader.ReadBytes((int)file.Length);

                        using (FileStream fs = new FileStream(root + customFileName, FileMode.Create))
                        {
                            await fs.WriteAsync(fileContent, 0, fileContent.Length);
                        }                        
                    }
                }
                return Ok(new Image{Path = relPath + customFileName});
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}