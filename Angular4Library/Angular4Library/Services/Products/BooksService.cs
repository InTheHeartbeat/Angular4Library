using System;
using System.Collections.Generic;
using System.Linq;
using Angular4Library.Data.Models.Products;
using Angular4Library.Data.Providers;
using Angular4Library.Models.Data;

namespace Angular4Library.Services.Products
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
            IEnumerable<BookViewModel> result = _repositoryProvider.BooksRepository.GetAll().Select(CastDataModelToViewModel);
            return result;
        }

        public BookViewModel GetBookById(int id)
        {
            Book obtained = _repositoryProvider.BooksRepository.GetProductById(id);
            var result = CastDataModelToViewModel(obtained);
            return result;
        }

        public void AddNewBook(BookViewModel bookViewModel)
        {
            if (bookViewModel == null) return;

            var book = new Book();
            book.Id = bookViewModel.Id;
            book.Amount = bookViewModel.Amount;
            book.Author = bookViewModel.Author;
            book.Genre = bookViewModel.Genre;
            book.Pages = bookViewModel.Pages;
            book.PhotoPath = bookViewModel.PhotoPath;
            book.Price = bookViewModel.Price;
            book.Title = bookViewModel.Title;
            book.Year = bookViewModel.Year;
            _repositoryProvider.BooksRepository.InsertProduct(book);
        }

        public void EditBook(BookViewModel bookViewModel)
        {
            if (bookViewModel == null) return;

            Book book = _repositoryProvider.BooksRepository.GetProductById(bookViewModel.Id);

            if (book == null)
            {
                throw new ArgumentException("Not found");
            }

            book.Title = bookViewModel.Title;
            book.Author = bookViewModel.Author;
            book.Genre = bookViewModel.Genre;
            book.Pages = bookViewModel.Pages;
            book.Year = bookViewModel.Year;
            book.Price = bookViewModel.Price;
            book.Amount = bookViewModel.Amount;
            book.PhotoPath = bookViewModel.PhotoPath;

            _repositoryProvider.BooksRepository.UpdateProduct(book);
        }

        public void DeleteBookById(int id)
        {
            _repositoryProvider.BooksRepository.DeleteProduct(id);            
        }

        internal static BookViewModel CastDataModelToViewModel(Book dataModel)
        {
            var result = new BookViewModel();
            if (dataModel == null) return result;

            result.Id = dataModel.Id;
            result.Amount = dataModel.Amount;
            result.Author = dataModel.Author;
            result.Genre = dataModel.Genre;
            result.Pages = dataModel.Pages;
            result.PhotoPath = dataModel.PhotoPath;
            result.Price = dataModel.Price;
            result.Title = dataModel.Title;
            result.Year = dataModel.Year;
            return result;
        }
    }
}
