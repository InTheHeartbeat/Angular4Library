using Angular4Library.Data.Entities.Selling;
using System.Collections.Generic;

namespace Angular4Library.Repositories.Interfaces
{
    public interface ISellRepository
    {
        SellOrder GetSellOrder(int userId, bool authorized, bool completed);
        SellOrder InsertNewOrder(SellOrder order);
        IEnumerable<SellOrderRecord> GetOrderRecordsByOrderId(int orderId);
        void InsertNewOrderRecord(SellOrderRecord record);
        void RemoveRecord(int recordId);
        SellOrder GetSellOrderById(int orderId);
        void UpdateOrder(SellOrder order);
    }
}