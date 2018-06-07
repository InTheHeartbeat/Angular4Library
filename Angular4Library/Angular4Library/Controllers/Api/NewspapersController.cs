using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Angular4Library.BusinessLogic.Services.Products;
using Angular4Library.Helpers;
using Angular4Library.ViewModels.Data;
using Angular4Library.ViewModels.Newspapers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class NewspapersController : Controller
    {        
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NewspapersService _newspapersService;

        public NewspapersController(IHostingEnvironment hostingEnvironment, NewspapersService newspapersService)
        {
            _newspapersService = newspapersService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GetNewspapers")]
        public IEnumerable<NewspaperViewModel> GetNewspapers()
        {
            IEnumerable < NewspaperViewModel > result = _newspapersService.GetAll();            
            return result;
        }

        [HttpGet("GetNewspaper/{id}")]
        public NewspaperViewModel GetNewspaper(int id)
        {
            NewspaperViewModel result = _newspapersService.GetNewspaperById(id);
            return result;
        }

        [HttpPost("AddNewspaper")]
        public IActionResult AddNewspaper([FromBody]NewspaperViewModel newspaper)
        {
            try
            {
                _newspapersService.AddNewNewspaper(newspaper);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();
        }

        [HttpPut("EditNewspaper")]
        public IActionResult EditNewspaper([FromBody]NewspaperViewModel newspaper)
        {           
            try
            {
                _newspapersService.EditNewspaper(newspaper);
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
            try
            {
                _newspapersService.DeleteNewspaperById(id);
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
