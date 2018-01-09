using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Base")]
    public class BaseController : Controller
    {
        private LibraryContext _context;

        public BaseController(LibraryContext context)
        {
            _context = context;
        }
    }
}