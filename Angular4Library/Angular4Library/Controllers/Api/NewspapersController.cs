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
    public class NewspapersController : Controller
    {
        private LibraryContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public NewspapersController(LibraryContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GetNewspapers")]
        public IEnumerable<Newspaper> GetNewspapers()
        {
            return _context.Newspapers.FindAll();
        }

        [HttpGet("GetNewspaper/{id}")]
        public Newspaper GetNewspaper(int id)
        {
            return _context.Newspapers.FindOne(newspaper => newspaper.Id == id);
        }

        [HttpPost("AddNewspaper")]
        public IActionResult AddNewspaper([FromBody]Newspaper newspaper)
        {
            try
            {
                _context.Newspapers.Insert(new Newspaper()
                {
                    Title = newspaper.Title,
                    Date = newspaper.Date,                    
                    Amount = newspaper.Amount,                    
                    Price = newspaper.Price,
                    Periodicity = newspaper.Periodicity,
                    PhotoPath = newspaper.PhotoPath
                });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpPut("EditNewspaper")]
        public IActionResult EditNewspaper([FromBody]Newspaper newspaperModel)
        {
            Newspaper newspaper = _context.Newspapers.FindById(newspaperModel.Id);

            if (newspaper == null) { return NotFound(); }

            try
            {
                newspaper.Title = newspaperModel.Title;
                newspaper.Date = newspaperModel.Date;                
                newspaper.Periodicity = newspaperModel.Periodicity;
                newspaper.Price = newspaperModel.Price;
                newspaper.Amount = newspaperModel.Amount;
                newspaper.PhotoPath = newspaperModel.PhotoPath;
                _context.Newspapers.Update(newspaper);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpDelete("DeleteNewspaper/{id}")]
        public IActionResult DeleteNewspaper(int id)
        {
            Newspaper forDelete = _context.Newspapers.FindById(id);

            if (forDelete == null) { return NotFound(); }

            try
            {
                _context.Newspapers.Delete(forDelete.Id);
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
                return Ok(new Image { Path = relPath + customFileName });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}