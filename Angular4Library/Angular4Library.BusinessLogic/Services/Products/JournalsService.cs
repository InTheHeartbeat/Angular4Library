using System;
using System.Collections.Generic;
using System.Linq;
using Angular4Library.Data.Entities.Products;
using Angular4Library.Repositories;
using Angular4Library.ViewModels.Data;
using Angular4Library.ViewModels.Journals;

namespace Angular4Library.BusinessLogic.Services.Products
{
    public class JournalsService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public JournalsService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public IEnumerable<JournalViewModel> GetAll()
        {
            IEnumerable<JournalViewModel> result = _repositoryProvider.JournalsRepository.GetAll().Select(CastDataModelToViewModel);
            return result;
        }
        public JournalViewModel GetJournalById(int id)
        {
            Journal obtained = _repositoryProvider.JournalsRepository.GetProductById(id);
            var result = CastDataModelToViewModel(obtained);
            return result;
        }

        public void AddNewJournal(JournalViewModel journalViewModel)
        {
            if (journalViewModel == null) return;

            var journal = new Journal();            
            journal.Amount = journalViewModel.Amount;
            journal.Date = journalViewModel.Date;
            journal.Periodicity = journalViewModel.Periodicity;
            journal.Pages = journalViewModel.Pages;
            journal.PhotoPath = journalViewModel.PhotoPath;
            journal.Price = journalViewModel.Price;
            journal.Title = journalViewModel.Title;
            journal.Theme = journalViewModel.Theme;
            _repositoryProvider.JournalsRepository.InsertProduct(journal);
        }
        public void EditJournal(JournalViewModel journalViewModel)
        {
            if (journalViewModel == null) return;

            Journal journal = _repositoryProvider.JournalsRepository.GetProductById(journalViewModel.Id);

            if (journal == null)
            {
                throw new ArgumentException("Not found");
            }

            journal.Amount = journalViewModel.Amount;
            journal.Date = journalViewModel.Date;
            journal.Periodicity = journalViewModel.Periodicity;
            journal.Pages = journalViewModel.Pages;
            journal.PhotoPath = journalViewModel.PhotoPath;
            journal.Price = journalViewModel.Price;
            journal.Title = journalViewModel.Title;
            journal.Theme = journalViewModel.Theme;

            _repositoryProvider.JournalsRepository.UpdateProduct(journal);
        }
        public void DeleteJournalById(int id)
        {
            _repositoryProvider.JournalsRepository.DeleteProduct(id);
        }
        internal static JournalViewModel CastDataModelToViewModel(Journal dataModel)
        {
            var result = new JournalViewModel();
            if (dataModel == null) return result;


            result.Id = dataModel.Id;
            result.Amount = dataModel.Amount;
            result.Periodicity = dataModel.Periodicity;
            result.Theme = dataModel.Theme;
            result.Pages = dataModel.Pages;
            result.PhotoPath = dataModel.PhotoPath;
            result.Price = dataModel.Price;
            result.Title = dataModel.Title;
            result.Date = dataModel.Date;
            return result;
        }
    }
}
