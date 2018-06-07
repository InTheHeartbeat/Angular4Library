using System;
using System.Collections.Generic;
using System.Linq;
using Angular4Library.Data.Entities.Products;
using Angular4Library.Repositories;
using Angular4Library.ViewModels.Newspapers;

namespace Angular4Library.BusinessLogic.Services.Products
{
    public class NewspapersService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public NewspapersService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public IEnumerable<NewspaperViewModel> GetAll()
        {
            IEnumerable<NewspaperViewModel> result = _repositoryProvider.NewspapersRepository.GetAll().Select(CastDataModelToViewModel);
            return result;
        }
        public NewspaperViewModel GetNewspaperById(int id)
        {
            Newspaper obtained = _repositoryProvider.NewspapersRepository.GetProductById(id);
            var result = CastDataModelToViewModel(obtained);
            return result;
        }

        public void AddNewNewspaper(NewspaperViewModel newspaperViewModel)
        {
            if (newspaperViewModel == null) return;

            var newspaper = new Newspaper();            
            newspaper.Amount = newspaperViewModel.Amount;
            newspaper.Date = newspaperViewModel.Date;
            newspaper.Periodicity = newspaperViewModel.Periodicity;           
            newspaper.PhotoPath = newspaperViewModel.PhotoPath;
            newspaper.Price = newspaperViewModel.Price;
            newspaper.Title = newspaperViewModel.Title;            
            _repositoryProvider.NewspapersRepository.InsertProduct(newspaper);
        }
        public void EditNewspaper(NewspaperViewModel newspaperViewModel)
        {
            if (newspaperViewModel == null) return;

            Newspaper newspaper = _repositoryProvider.NewspapersRepository.GetProductById(newspaperViewModel.Id);

            if (newspaper == null)
            {
                throw new ArgumentException("Not found");
            }

            newspaper.Amount = newspaperViewModel.Amount;
            newspaper.Date = newspaperViewModel.Date;
            newspaper.Periodicity = newspaperViewModel.Periodicity;            
            newspaper.PhotoPath = newspaperViewModel.PhotoPath;
            newspaper.Price = newspaperViewModel.Price;
            newspaper.Title = newspaperViewModel.Title;            

            _repositoryProvider.NewspapersRepository.UpdateProduct(newspaper);
        }
        public void DeleteNewspaperById(int id)
        {
            _repositoryProvider.NewspapersRepository.DeleteProduct(id);
        }

        internal static NewspaperViewModel CastDataModelToViewModel(Newspaper dataModel)
        {
            var result = new NewspaperViewModel();
            if (dataModel == null) return result;

            result.Id = dataModel.Id;
            result.Amount = dataModel.Amount;
            result.Periodicity = dataModel.Periodicity;
            result.Periodicity = dataModel.Periodicity;            
            result.PhotoPath = dataModel.PhotoPath;
            result.Price = dataModel.Price;
            result.Title = dataModel.Title;
            result.Date = dataModel.Date;
            return result;
        }
    }
}
