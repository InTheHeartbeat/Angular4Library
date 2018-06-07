using System.Collections.Generic;
using System.Linq;
using Angular4Library.Data.Entities.Additional;
using Angular4Library.Data.Entities.Products;
using Angular4Library.Data.Models.Products;
using Angular4Library.Repositories;
using Angular4Library.ViewModels.Author;
using Angular4Library.ViewModels.Books;
using Angular4Library.ViewModels.Data;

namespace Angular4Library.BusinessLogic.Services.Products
{
    public class BooksService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public BooksService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public IEnumerable<BookViewModel> GetAll()
        {
            IEnumerable<BookViewModel> result = _repositoryProvider.BooksRepository.GetAll().Select(book => new BookViewModel()
            {
                Id = book.Id,
                Amount = book.Amount,
                Authors = book.Authors.Select(author => new AuthorViewModel() { Id = author.Id, FullName = $"{author.Surname}, {author.Name} {author.LastName}" }).ToList(),
                Genre = book.Genre,
                Pages = book.Pages,
                PhotoPath = book.PhotoPath,
                Price = book.Price,
                Title = book.Title,
                Year = book.Year
            });
            return result;
        }
        public BookViewModel GetBookById(int id)
        {
            ExtendedBook obtained = _repositoryProvider.BooksRepository.GetProductById(id);
            BookViewModel result = CastToViewModel(obtained);
            return result;
        }

        public void AddNewBook(BookViewModel bookViewModel)
        {
            if (bookViewModel == null)
            {
                return;
            }

            var book = new Book();
            book.Amount = bookViewModel.Amount;
            book.Genre = bookViewModel.Genre;
            book.Pages = bookViewModel.Pages;
            book.PhotoPath = bookViewModel.PhotoPath;
            book.Price = bookViewModel.Price;
            book.Title = bookViewModel.Title;
            book.Year = bookViewModel.Year;

            bookViewModel.Id = _repositoryProvider.BooksRepository.InsertProduct(book);
            InsertBookAuthors(bookViewModel);
        }

        public void EditBook(BookViewModel bookViewModel)
        {
            if (bookViewModel == null) return;

            Book book = new Book();

            book.Id = bookViewModel.Id;
            book.Title = bookViewModel.Title;
            book.Pages = bookViewModel.Pages;
            book.PhotoPath = bookViewModel.PhotoPath;
            book.Year = bookViewModel.Year;
            book.Price = bookViewModel.Price;
            book.Genre = bookViewModel.Genre;
            book.Amount = bookViewModel.Amount;

            _repositoryProvider.BooksRepository.UpdateProduct(book);
            UpdateBookAuthors(bookViewModel);
        }

        private void InsertBookAuthors(BookViewModel bookViewModel)
        {
            _repositoryProvider.AuthorRepository.InsertAuthorOwnEntries(bookViewModel.Authors.Select(author => new AuthorOwnEntry()
            {
                AuthorId = author.Id,
                BookId = bookViewModel.Id
            }).ToList());
        }
        private void UpdateBookAuthors(BookViewModel bookViewModel)
        {
            ExtendedBook obtained = _repositoryProvider.BooksRepository.GetProductById(bookViewModel.Id);
            BookViewModel old = CastToViewModel(obtained);

            List<AuthorOwnEntry> newAuthors = bookViewModel.Authors.Except(old.Authors).Select(author => new AuthorOwnEntry()
            {
                AuthorId = author.Id,
                BookId = old.Id
            }).ToList();

            _repositoryProvider.AuthorRepository.UpdateBookAuthors(old.Id, newAuthors);
        }
        public void DeleteBookById(int id)
        {
            _repositoryProvider.AuthorRepository.DeleteAuthorOwnEntriesByBookId(id);
            _repositoryProvider.BooksRepository.DeleteProduct(id);
        }

        public static BookViewModel CastToViewModel(ExtendedBook book)
        {
            BookViewModel result = new BookViewModel()
            {
                Id = book.Id,
                Amount = book.Amount,
                Authors = book.Authors.Select(author => new AuthorViewModel() { Id = author.Id, FullName = $"{author.Surname}, {author.Name} {author.LastName}" }).ToList(),
                Genre = book.Genre,
                Pages = book.Pages,
                PhotoPath = book.PhotoPath,
                Price = book.Price,
                Title = book.Title,
                Year = book.Year
            };

            return result;
        }
    }
}
