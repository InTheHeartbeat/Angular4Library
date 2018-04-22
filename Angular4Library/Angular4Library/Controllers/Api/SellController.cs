using Angular4Library.Models;
using Angular4Library.Services.Accounting;
using Angular4Library.Services.Selling;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class SellController : Controller
    {
        private readonly SellService _sellService;            
        private readonly AccountService _accountService;

        public SellController()
        {
            _sellService = new SellService();
            _accountService = new AccountService();
        }

        [HttpGet("GetBasket")]
        public ActionResult GetBasket()
        {            
            AuthDataViewModel currentUser = _accountService.GetCurrentAuthData(Request);            
            BasketViewModel basket = _sellService.GetBasket(currentUser);
                                
            return Ok(basket);
        }

        [HttpPost("AddToBasket")]
        public ActionResult AddToBasket([FromBody] AddToBasketViewModel viewModel)
        {
            AuthDataViewModel currentUser = _accountService.GetCurrentAuthData(Request);

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