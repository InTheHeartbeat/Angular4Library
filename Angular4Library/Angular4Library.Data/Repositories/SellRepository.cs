using System;
using System.Collections.Generic;
using System.Text;
using Angular4Library.Data.Interfaces;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Selling;

namespace Angular4Library.Data.Repositories
{
    public class SellRepository : ISellRepository
    {
        private readonly LibraryContext _context;

        public SellRepository(LibraryContext context)
        {
            _context = context;
        }

        public SellOrder GetSellOrder(int userId, bool authorized)
        {
            SellOrder result = _context.SellOrders.FindOne(ord =>
                !ord.Completed && ord.UserId == userId && ord.Authorized == authorized);
            return result;
        }

        public SellOrder InsertNewOrder(bool completed, int userId, bool authorized)
        {
            var order = new SellOrder();
            order.Completed = completed;
            order.Authorized = authorized;
            order.UserId = userId;

            _context.SellOrders.Insert(order);

            order = GetSellOrder(userId, authorized);
            return order;
        }

        public IEnumerable<SellOrderRecord> GetOrderRecordsByOrderId(int orderId)
        {
            IEnumerable<SellOrderRecord> result = _context.SellOrderRecords.Find(record => record.OrderId == orderId);
            return result;
        }

        public void InsertNewOrderRecord(SellOrderRecord record)
        {
            _context.SellOrderRecords.Insert(record);
        }

        public void RemoveRecord(int recordId)
        {
            _context.SellOrderRecords.Delete(recordId);
        }

        public SellOrder GetSellOrderById(int orderId)
        {
            SellOrder result = _context.SellOrders.FindById(orderId);
            return result;
        }

        public void UpdateOrder(SellOrder order)
        {
            _context.SellOrders.Update(order);            
        }
    }
}
