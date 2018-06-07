using Angular4Library.ViewModels.Sell;
using System.Collections.Generic;

namespace Angular4Library.ViewModels
{
    public class BasketViewModel
    {
        public List<OrderRecordBookViewModel> BookProducts { get; set; }
        public List<OrderRecordJournalViewModel> JournalProducts { get; set; }
        public List<OrderRecordNewspaperViewModel> NewspaperProducts { get; set; }

        public int OrderId { get; set; }       
        public double TotalProductsCount => BookProducts.Count + JournalProducts.Count + NewspaperProducts.Count;

        public BasketViewModel()
        {
            BookProducts = new List<OrderRecordBookViewModel>();
            JournalProducts = new List<OrderRecordJournalViewModel>();
            NewspaperProducts = new List<OrderRecordNewspaperViewModel>();
        }
    }
}
