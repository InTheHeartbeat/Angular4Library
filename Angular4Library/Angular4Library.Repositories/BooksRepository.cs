using System.Linq;
using System.Collections.Generic;
using System.Data;
using Angular4Library.Repositories.Interfaces;
using Angular4Library.Data.Models.Products;
using System.Data.SqlClient;
using Angular4Library.Data.Entities.Products;
using Angular4Library.Data.Entities.Additional;
using Dapper;

namespace Angular4Library.Repositories
{
    public class BooksRepository : IBookRepository
    {
        private RepositoryProvider _provider;
        public BooksRepository(RepositoryProvider repositoryProvider)
        {
            _provider = repositoryProvider;
        }

        public IEnumerable<ExtendedBook> GetAll()
        {
            var bookModelDictionary = new Dictionary<int, ExtendedBook>();

            IEnumerable<ExtendedBook> result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.Query<Book, Author, ExtendedBook>(@"
                 select book.*, book.Id as Id,author.*  from Book as book
                 join AuthorOwnEntry as authorBook on (book.Id = authorBook.BookId)
                 join Author as author on (authorBook.AuthorId = author.Id)
                ", (book, authorBook) =>
                {
                    ExtendedBook ExtendedBook;

                    if (!bookModelDictionary.TryGetValue(book.Id, out ExtendedBook))
                    {
                        ExtendedBook = new ExtendedBook()
                        {
                            Id = book.Id,
                            Title = book.Title,
                            Amount = book.Amount,
                            Genre = book.Genre,
                            Pages = book.Pages,
                            PhotoPath = book.PhotoPath,
                            Price = book.Price,
                            Year = book.Year,
                            Authors = new List<Author>()
                        };
                        bookModelDictionary.Add(ExtendedBook.Id, ExtendedBook);
                    }

                    if (authorBook != null)
                        ExtendedBook.Authors.Add(new Author()
                        {
                            Id = authorBook.Id,
                            Surname = authorBook.Surname,
                            Name = authorBook.Name,
                            LastName = authorBook.LastName
                        });

                    return ExtendedBook;
                }, splitOn: "Id").Distinct().ToList();

            }

            return result;
        }
        public ExtendedBook GetProductById(int id)
        {
            IEnumerable<ExtendedBook> result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                var bookModelDictionary = new Dictionary<int, ExtendedBook>();

                if (_provider.TransactConnection.State == ConnectionState.Open)
                {
                    _provider.TransactConnection.Close();
                }
                
                result = connection.Query<Book, Author, ExtendedBook>(@"
                     select book.*, book.Id as Id,author.*  from Book as book
                     join AuthorOwnEntry as authorBook on (book.Id = authorBook.BookId)
                     join Author as author on (authorBook.AuthorId = author.Id)
                     where book.Id = @bookId
                     ", (book, authorBook) =>
                {
                    ExtendedBook ExtendedBook;

                    if (!bookModelDictionary.TryGetValue(book.Id, out ExtendedBook))
                    {
                        ExtendedBook = new ExtendedBook()
                        {
                            Id = book.Id,
                            Title = book.Title,
                            Amount = book.Amount,
                            Genre = book.Genre,
                            Pages = book.Pages,
                            PhotoPath = book.PhotoPath,
                            Price = book.Price,
                            Year = book.Year,
                            Authors = new List<Author>()
                        };
                        bookModelDictionary.Add(ExtendedBook.Id, ExtendedBook);
                    }

                    if (authorBook != null)
                        ExtendedBook.Authors.Add(new Author()
                        {
                            Id = authorBook.Id,
                            Surname = authorBook.Surname,
                            Name = authorBook.Name,
                            LastName = authorBook.LastName
                        });

                    return ExtendedBook;
                }, splitOn: "Id", param: new { bookId = id }).Distinct().ToList();

            }

            return result.First();
        }

        public int InsertProduct(Book product)
        {
            int resultId = -1;

            string sql = @"INSERT INTO Book (Title, Year, Pages, Genre,Amount,Price,PhotoPath) 
                                                                output INSERTED.ID 
                                                                Values (@Title, @Year, @Pages, @Genre, @Amount,@Price,@PhotoPath);SELECT SCOPE_IDENTITY()";            
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                return resultId = (int)connection.ExecuteScalar(sql, product);
            }            
        }
        public void UpdateProduct(Book product)
        {
            string sql = @"update Book  
                                            set 
                                            Title=@Title, 
                                            Year=@Year, 
                                            Pages=@Pages, 
                                            Genre=@Genre,
                                            Amount=@Amount,
                                            Price=@Price,
                                            PhotoPath=@PhotoPath 
                                            where Id=@Id;";           

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {                                
                connection.Execute(sql, product);
            }
        }
        public void DeleteProduct(int id)
        {
            string sql = "delete from Book where Id = @Id;";            

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute(sql, new { Id = id });
            }
        }
    }
}
