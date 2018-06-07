using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.BusinessLogic.Services.Additional;
using Angular4Library.ViewModels.Author;
using Angular4Library.ViewModels.Data;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Route("api/[controller]")]
    public class AuthorsController : Controller
    {
        private readonly AuthorService _authorService;

        public AuthorsController(AuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet("GetAuthors/{id}")]
        public IEnumerable<AuthorViewModel> GetAuthors(int id)
        {
            IEnumerable<AuthorViewModel> result = null;
            if (id <= 0)
            {
                result = _authorService.GetAuthors();
                return result;
            }

            result = _authorService.GetAuthorsWithoutExists(id);

            return result;
        }
    }
}
