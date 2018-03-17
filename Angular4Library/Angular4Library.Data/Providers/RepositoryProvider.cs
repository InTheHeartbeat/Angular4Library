using Angular4Library.Data.Interfaces;
using Angular4Library.Data.Models.Products;
using Angular4Library.Data.Repositories;

namespace Angular4Library.Data.Providers
{
    public class RepositoryProvider
    {
        public IAccountRepository AccountRepository { get; set; }
        public ISellRepository SellRepository { get; set; }
        public IProductRepository<Book> BooksRepository { get; set; }
        public IProductRepository<Newspaper> NewspapersRepository { get; set; }
        public IProductRepository<Journal> JournalsRepository { get; set; }

        public RepositoryProvider()
        {
            var context = new LibraryContext();
            AccountRepository = new AccountRepository(context);
        }
    }
}
