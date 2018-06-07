using Angular4Library.Data.Entities.Selling;
using Angular4Library.Repositories.Interfaces;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Angular4Library.Repositories
{
    public class SellRepository : ISellRepository
    {        
        public SellRepository(RepositoryProvider repositoryProvider)
        {            
        }

        public SellOrder GetSellOrder(int userId, bool authorized, bool completed)
        {
            SellOrder result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<SellOrder>(@"select * from SellOrder 
                                                                                    where Completed=@Completed and UserId=@UserId and Authorized=@Authorized",
                    new { Completed = completed, UserId = userId, Authorized = authorized });
            }

            return result;
        }        
        public SellOrder GetSellOrderById(int orderId)
        {
            SellOrder result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<SellOrder>("select * from SellOrder where Id=@Id",
                    new { Id = orderId });
            }

            return result;
        }
        
        public SellOrder InsertNewOrder(SellOrder order)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute(@"INSERT INTO SellOrder (UserId, Authorized, Completed) 
                                          Values (@UserId, @Authorized, @Completed);",
                    order);
            }

            return GetSellOrder(order.UserId, order.Authorized, order.Completed);
        }

        public IEnumerable<SellOrderRecord> GetOrderRecordsByOrderId(int orderId)
        {
            IEnumerable<SellOrderRecord> result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.Query<SellOrderRecord>("select * from SellOrderRecord where OrderId = @OrderId", new { OrderId = orderId });
            }

            return result;
        }

        public void InsertNewOrderRecord(SellOrderRecord record)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute(@"INSERT INTO SellOrderRecord (OrderId, ProductId, ProductType, Count) 
                                          Values (@OrderId, @ProductId, @ProductType, @Count);",
                    record);            
            }
        }
        public void RemoveRecord(int recordId)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("delete from SellOrderRecord where Id = @Id;",
                    new { Id = recordId });
            }
        }
        
        public void UpdateOrder(SellOrder order)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute(@"update SellOrder 
                                            set Authorized=@Authorized, Completed=@Completed, UserId=@UserId 
                                            where Id=@Id;",
                    order);
            }
        }
    }
}
