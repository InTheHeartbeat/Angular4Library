using Angular4Library.Data.Entities.Products;
using Angular4Library.Repositories.Interfaces;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Angular4Library.Repositories
{
    public class JournalsRepository : IProductRepository<Journal>
    {
        public JournalsRepository(RepositoryProvider repositoryProvider)
        {            
        }

        public IEnumerable<Journal> GetAll()
        {
            IEnumerable<Journal> result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.Query<Journal>("select * from Journal;");
            }
            return result;
        }

        public Journal GetProductById(int id)
        {
            Journal result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<Journal>("select * from Journal where Id=@Id",
                    new { Id = id });
            }
            return result;
        }

        public int InsertProduct(Journal product)
        {
            int resultId = -1;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                resultId = (int)connection.ExecuteScalar(@"INSERT INTO Journal (Title, Date, Pages,  Periodicity,Theme,Amount,Price,PhotoPath) 
                                                                output INSERTED.ID
                                                                Values (@Title, @Date, @Pages, @Periodicity, @Theme, @Amount,@Price,@PhotoPath);
                                                                SELECT SCOPE_IDENTITY()",
                     product);
            }

            return resultId;
        }
        public void UpdateProduct(Journal product)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute(@"update Journal 
                                            set 
                                            Title=@Title, 
                                            Date=@Date, 
                                            Pages=@Pages, 
                                            Periodicity=@Periodicity,
                                            Theme = @Theme, 
                                            Amount=@Amount,
                                            Price=@Price,
                                            PhotoPath=@PhotoPath 
                                            where Id=@Id;",
                   product);
            }
        }
        public void DeleteProduct(int id)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("delete from Journal where Id = @Id;",
                    new { Id = id });
            }
        }
    }
}
