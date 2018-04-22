using Angular4Library.Data.Enums;
using Angular4Library.Data.Models.Selling;
using Angular4Library.Data.Providers;
using Angular4Library.Models;
using Angular4Library.Models.Data;
using Angular4Library.Services.Products;

namespace Angular4Library.Services.Selling
{
    public class SellService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public SellService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public SellOrder GetSellOrder(int userId, bool authorized)
        {
            SellOrder order = _repositoryProvider.SellRepository.GetSellOrder(userId, authorized);                

            if (order != null)
            {
                return order;
            }

            order = CreateNewSellOrder(userId, authorized);
            
            return order;
        }

        public SellOrder CreateNewSellOrder(int userId, bool authorized)
        {
            SellOrder result = _repositoryProvider.SellRepository.InsertNewOrder(false, userId, authorized);
            return result;
        }

        public BasketViewModel GetBasket(AuthDataViewModel currentUser)
        {
            SellOrder order = GetSellOrder(currentUser.UserId, !currentUser.IsVisitor);

            var result = new BasketViewModel();
            result.OrderId = order.Id;

            foreach (SellOrderRecord record in _repositoryProvider.SellRepository.GetOrderRecordsByOrderId(order.Id))
            {
                if (record.ProductType == (int)ProductType.Book)
                {
                    result.BookProducts.Add(new OrderRecordBookViewModel(BooksService.CastDataModelToViewModel(_repositoryProvider.BooksRepository.GetProductById(record.ProductId)), record.Id));
                }
                if (record.ProductType == (int)ProductType.Journal)
                {
                    result.JournalProducts.Add(new OrderRecordJournalViewModel(JournalsService.CastDataModelToViewModel(_repositoryProvider.JournalsRepository.GetProductById(record.ProductId)), record.Id));
                }
                if (record.ProductType == (int)ProductType.Newspaper)
                {
                    result.NewspaperProducts.Add(new OrderRecordNewspaperViewModel(NewspapersService.CastDataModelToViewModel(_repositoryProvider.NewspapersRepository.GetProductById(record.ProductId)), record.Id));
                }
            }
            return result;
        }

        public void AddToBasket(AuthDataViewModel currentUser, AddToBasketViewModel product)
        {
            var record = new SellOrderRecord();
            record.OrderId = GetSellOrder(currentUser.UserId, !currentUser.IsVisitor).Id;
            record.ProductId = product.ProductId;
            record.ProductType = product.ProductType;

            _repositoryProvider.SellRepository.InsertNewOrderRecord(record);
        }

        public void RemoveRecord(int recordId)
        {
            _repositoryProvider.SellRepository.RemoveRecord(recordId);
        }

        public void AcceptOrder(int orderId)
        {
            SellOrder order = _repositoryProvider.SellRepository.GetSellOrderById(orderId);
            order.Completed = true;
            _repositoryProvider.SellRepository.UpdateOrder(order);            
        }
    }
}
