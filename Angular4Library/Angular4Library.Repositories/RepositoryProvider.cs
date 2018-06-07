using Angular4Library.Data.Entities.Products;
using Angular4Library.Repositories.Interfaces;
using System.Data.SqlClient;

namespace Angular4Library.Repositories
{
    public class RepositoryProvider
    {
        public IAccountRepository AccountRepository { get; set; }
        public ISellRepository SellRepository { get; set; }
        public IAuthorRepository AuthorRepository { get; set; }
        public IBookRepository BooksRepository { get; set; }
        public IProductRepository<Newspaper> NewspapersRepository { get; set; }
        public IProductRepository<Journal> JournalsRepository { get; set; }

        public SqlTransaction SqlTransaction { get; set; }
        public SqlConnection TransactConnection
        {
            get => _transactConnection ?? (_transactConnection = new SqlConnection(DataContext.ConnectionString));            
        }

        private SqlConnection _transactConnection;

        public void CommitTransaction()
        {
            if (SqlTransaction != null)
            {
                SqlTransaction.Commit();
                
                if(_transactConnection != null && _transactConnection.State != System.Data.ConnectionState.Closed)
                {
                    _transactConnection.Close();
                }

                SqlTransaction.Dispose();
            }
        }

        public RepositoryProvider()
        {            
            AccountRepository = new AccountRepository(this);
            SellRepository = new SellRepository(this);
            BooksRepository = new BooksRepository(this);
            NewspapersRepository = new NewspapersRepository(this);
            JournalsRepository = new JournalsRepository(this);
            AuthorRepository = new AuthorRepository(this);
        }
    }
}
