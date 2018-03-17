using System.IO;
using System.Linq;
using Angular4Library.Data.Models.DataTransfer;
using Angular4Library.Data.Providers;
using Angular4Library.Data.Transfer.Helpers;
using Microsoft.AspNetCore.Http;

namespace Angular4Library.Services.Data
{
    public class ImportService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public ImportService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public void Import(IFormFile file)
        {
            FileInfo fileInfo = new FileInfo(file.FileName.Trim('\"'));
            ImportModel importModel = ImportHelper.Import(file.OpenReadStream(), fileInfo.Extension == ".xml");

            if (importModel.BookProducts != null && importModel.BookProducts.Any())
            {
                importModel.BookProducts.ForEach(_repositoryProvider.BooksRepository.InsertProduct);
            }
            if (importModel.JournalProducts != null && importModel.JournalProducts.Any())
            {
                importModel.JournalProducts.ForEach(_repositoryProvider.JournalsRepository.InsertProduct);
            }
            if (importModel.NewspaperProducts != null && importModel.NewspaperProducts.Any())
            {
                importModel.NewspaperProducts.ForEach(_repositoryProvider.NewspapersRepository.InsertProduct);
            }
        }
    }
}
