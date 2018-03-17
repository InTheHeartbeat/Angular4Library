using System.Collections.Generic;
using Angular4Library.Data.Models.Selling;

namespace Angular4Library.Data.Interfaces
{
    public interface ISellRepository
    {
        SellOrder GetSellOrder(int userId, bool authorized);
        SellOrder InsertNewOrder(bool completed, int userId, bool authorized);
        IEnumerable<SellOrderRecord> GetOrderRecordsByOrderId(int orderId);
        void InsertNewOrderRecord(SellOrderRecord record);
        void RemoveRecord(int recordId);
        SellOrder GetSellOrderById(int orderId);
        void UpdateOrder(SellOrder order);
    }
}