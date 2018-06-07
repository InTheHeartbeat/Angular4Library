using System.IO;
using System.Linq;
using Angular4Library.BusinessLogic.Services.Products;
using Angular4Library.Data.Models.DataTransfer;
using Angular4Library.Data.Transfer.Helpers;
using Angular4Library.Repositories;
using Angular4Library.ViewModels.Author;
using Angular4Library.ViewModels.Books;
using Microsoft.AspNetCore.Http;

namespace Angular4Library.BusinessLogic.Services.Transfer
{
    public class ImportService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public ImportService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public void Import(IFormFile file, BooksService booksService)
        {
            FileInfo fileInfo = new FileInfo(file.FileName.Trim('\"'));
            ImportModel importModel = ImportHelper.Import(file.OpenReadStream(), fileInfo.Extension == ".xml");

            if (importModel.BookProducts != null && importModel.BookProducts.Any())
            {
                importModel.BookProducts.ForEach(book => booksService.AddNewBook(new BookViewModel
                { 
                   Amount = book.Amount,
                   Authors = book.Authors.Select(author => new AuthorViewModel { Id = author.Id}).ToList(),
                   Genre = book.Genre,
                   Pages = book.Pages,
                   PhotoPath = book.PhotoPath,
                   Price = book.Price,
                   Title = book.Title,
                   Year = book.Year
                }));
            }
            if (importModel.JournalProducts != null && importModel.JournalProducts.Any())
            {
                importModel.JournalProducts.ForEach(journal => _repositoryProvider.JournalsRepository.InsertProduct(journal));
            }
            if (importModel.NewspaperProducts != null && importModel.NewspaperProducts.Any())
            {
                importModel.NewspaperProducts.ForEach(newspaper => _repositoryProvider.NewspapersRepository.InsertProduct(newspaper));
            }
        }
    }
}
