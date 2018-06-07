using Angular4Library.BusinessLogic.Services.Accounting;
using Angular4Library.BusinessLogic.Services.Selling;
using Angular4Library.ViewModels;
using Angular4Library.ViewModels.Account;
using Angular4Library.ViewModels.Sell;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class SellController : Controller
    {
        private readonly SellService _sellService;            
        private readonly AccountService _accountService;

        public SellController(SellService sellService, AccountService accountService)
        {
            _sellService = sellService;
            _accountService = accountService;           
        }

        [HttpGet("GetBasket")]
        public ActionResult GetBasket()
        {
            string accountToken = Request.Cookies["AT"];
            string visitorToken = Request.Cookies["VT"];
            string remoteAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            
            AuthDataViewModel currentUser = _accountService.GetCurrentAuthData(accountToken, visitorToken, remoteAddress);
            BasketViewModel basket = _sellService.GetBasket(currentUser);
                                
            return Ok(basket);
        }

        [HttpPost("AddToBasket")]
        public ActionResult AddToBasket([FromBody] AddBasketViewModel viewModel)
        {
            string accountToken = Request.Cookies["AT"];
            string visitorToken = Request.Cookies["VT"];
            string remoteAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            AuthDataViewModel currentUser = _accountService.GetCurrentAuthData(accountToken, visitorToken, remoteAddress);

            if (currentUser == null)
            {
                return BadRequest();
            }

            _sellService.AddToBasket(currentUser, viewModel);
           
            return Ok();
        }

        [HttpGet("RemoveFromBasket/{recordId}")]
        public ActionResult RemoveFromBasket(int recordId)
        {
            _sellService.RemoveRecord(recordId);
            return Ok();
        }

        [HttpGet("AcceptOrder/{orderId}")]
        public ActionResult AcceptOrder(int orderId)
        {
            _sellService.AcceptOrder(orderId);
            return Ok();
        }        
    }
}
