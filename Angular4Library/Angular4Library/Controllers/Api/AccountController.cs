using System;
using Angular4Library.BusinessLogic.Services.Accounting;
using Angular4Library.ViewModels.Account;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [Route("api/Account/GetCurrentUser")]
        [HttpGet]
        public IActionResult GetCurrentUser()
        {
            string accountToken = Request.Cookies["AT"];
            string visitorToken = Request.Cookies["VT"];
            string remoteAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            AuthDataViewModel current = _accountService.GetCurrentAuthData(accountToken,visitorToken, remoteAddress);
            if (current == null)
            {
                return BadRequest();
            }
            return Ok(current);
        }

        [Route("api/Account/TrySignIn")]
        [HttpPost]
        public IActionResult TrySignIn([FromBody] SignInViewModel dataViewModel)
        {
            var result = new AuthDataViewModel();
            try
            {
                string remoteAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

                result =
                    _accountService.SignAccount(dataViewModel.Login, dataViewModel.Password, remoteAddress);

                return Ok(result);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                return Ok(result);
            }
        }

        [Route("api/Account/SignOut")]
        [HttpPost]
        public IActionResult SignOut([FromBody] AuthDataViewModel viewModel)
        {            
            _accountService.SignOutAccount(viewModel.Token);
            
            return Ok(_accountService.GetCurrentAuthData(String.Empty, String.Empty, Request.HttpContext.Connection.RemoteIpAddress.ToString()));
        }

        [Route("api/Account/TrySignUp")]
        [HttpPost]
        public IActionResult TrySignUp([FromBody]SignInViewModel dataViewModel)
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
                return Ok(viewModel);
            }
        }
    }
}

