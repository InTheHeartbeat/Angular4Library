using System;
using Angular4Library.Models;
using Angular4Library.Services.Accounting;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;

        public AccountController()
        {
            _accountService = new AccountService();
        }

        [Route("api/Account/GetCurrentUser")]        
        [HttpGet]
        public IActionResult GetCurrentUser()
        {
            AuthDataViewModel current = _accountService.GetCurrentAuthData(Request);
            if(current == null)
            { return BadRequest(); }

            return Ok(current);
        }
                        
        [Route("api/Account/TrySignIn")]        
        [HttpPost]
        public IActionResult TrySignIn([FromBody] SignInDataViewModel dataViewModel)
        {
            try
            {                
                string remoteAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

                AuthDataViewModel result =
                    _accountService.SignAccount(dataViewModel.Login, dataViewModel.Password, remoteAddress);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Route("api/Account/SignOut")]        
        [HttpPost]
        public IActionResult SignOut([FromBody] AuthDataViewModel viewModel)
        {
            _accountService.SignOutAccount(viewModel.Token);

            return GetCurrentUser();
        }

        [Route("api/Account/TrySignUp")]        
        [HttpPost]
        public IActionResult TrySignUp([FromBody]SignInDataViewModel dataViewModel)
        {
            try
            {                
                _accountService.CreateAccount(dataViewModel);                         
                return TrySignIn(dataViewModel);
            }
            catch (Exception e)
            {
                var viewModel = new AuthDataViewModel();
                viewModel.Message = e.Message;
                return BadRequest(viewModel);
            }
        }
    }
}

