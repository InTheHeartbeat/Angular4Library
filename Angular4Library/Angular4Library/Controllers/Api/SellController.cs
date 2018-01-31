using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Angular4Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{    
    [Route("api/[controller]")]
    public class SellController : Controller
    {
        private readonly LibraryContext _context;
        private readonly AccountProvider _accountProvider;


        public SellController(LibraryContext context)
        {
            _context = context;
            _accountProvider = new AccountProvider(context);
        }

        [HttpGet("GetBasket")]
        public ActionResult GetBasket()
        {            
            AuthDataModel currentUser = _accountProvider.GetCurrent(Request);

            SellOrder order = GetSellOrder(currentUser.UserId, !currentUser.IsVisitor);

            BasketModel basket = new BasketModel
            {
                OrderId = order.Id            
            };
            foreach (SellOrderRecord record in _context.SellOrderRecords.Find(rec=>rec.OrderId == order.Id))
            {
                if (record.ProductType == (int) ProductType.Book)
                {
                    basket.BookProducts.Add(new OrderRecordBook(_context.Books.FindOne(book=>book.Id == record.ProductId), record.Id));
                }
                if (record.ProductType == (int)ProductType.Journal)
                {
                    basket.JournalProducts.Add(new OrderRecordJournal(_context.Journals.FindOne(journal => journal.Id == record.ProductId), record.Id));
                }
                if (record.ProductType == (int)ProductType.Newspaper)
                {
                    basket.NewspaperProducts.Add(new OrderRecordNewspaper(_context.Newspapers.FindOne(np => np.Id == record.ProductId), record.Id));
                }
            }
            return Ok(basket);
        }

        [HttpPost("AddToBasket")]
        public ActionResult AddToBasket([FromBody] AddToBasketModel model)
        {
            AuthDataModel currentUser = _accountProvider.GetCurrent(Request);

            if (currentUser == null)
            {
                return BadRequest();
            }

            _context.SellOrderRecords.Insert(new SellOrderRecord()
            {
                OrderId = GetSellOrder(currentUser.UserId, !currentUser.IsVisitor).Id,
                ProductId = model.ProductId,
                ProductType = model.ProductType,                
            });
            return Ok();
        }

        [HttpGet("RemoveFromBasket/{recordId}")]
        public ActionResult RemoveFromBasket(int recordId)
        {            
            _context.SellOrderRecords.Delete(recordId);
            return Ok();
        }

        [HttpGet("AcceptOrder/{orderId}")]
        public ActionResult AcceptOrder(int orderId)
        {
            SellOrder order = _context.SellOrders.FindOne(ord => ord.Id == orderId);
            order.Completed = true;
            _context.SellOrders.Update(order);
            return Ok();
        }

        private SellOrder GetSellOrder(int userId, bool authorized)
        {
            SellOrder order =
                _context.SellOrders.FindOne(ord =>
                    !ord.Completed && ord.UserId == userId && ord.Authorized == authorized);

            if (order != null)
            {
                return order;
            }

            order = new SellOrder()
            {
                Completed = false,
                UserId = userId,
                Authorized = authorized
            };
            _context.SellOrders.Insert(order);
            return _context.SellOrders.FindOne(ord =>
                !ord.Completed && ord.UserId == userId && ord.Authorized == authorized);            
        }
    }
}