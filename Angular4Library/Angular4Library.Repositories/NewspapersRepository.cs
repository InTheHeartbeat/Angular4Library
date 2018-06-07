using Angular4Library.Data.Entities.Products;
using Angular4Library.Repositories.Interfaces;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Angular4Library.Repositories
{
    public class NewspapersRepository : IProductRepository<Newspaper>
    {        
        public NewspapersRepository(RepositoryProvider repositoryProvider)
        {            
        }

        public IEnumerable<Newspaper> GetAll()
        {
            IEnumerable<Newspaper> result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.Query<Newspaper>("select * from Newspaper;");
            }
            return result;
        }

        public Newspaper GetProductById(int id)
        {
            Newspaper result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<Newspaper>("select * from Newspaper where Id=@Id",
                    new { Id = id });
            }
            return result;
        }

        public int InsertProduct(Newspaper product)
        {
            int resultId = -1;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                resultId = (int)connection.ExecuteScalar(@"INSERT INTO Newspaper (Title, Date, Periodicity,Amount,Price,PhotoPath) 
                                                                output INSERTED.ID 
                                                                Values (@Title, @Date, @Periodicity, @Amount, @Price,@PhotoPath);
                                                                SELECT SCOPE_IDENTITY()",
                   product);
            }

            return resultId;
        }
        public void UpdateProduct(Newspaper product)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute(@"update Newspaper 
                                          set 
                                            Title=@Title, 
                                            Date=@Date, 
                                            Periodicity=@Periodicity,
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
