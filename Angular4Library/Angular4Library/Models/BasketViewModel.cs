using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data.Models;
using Angular4Library.Models.Data;

namespace Angular4Library.Models
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
