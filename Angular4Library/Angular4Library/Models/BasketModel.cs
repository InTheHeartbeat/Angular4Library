using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data.Models;

namespace Angular4Library.Models
{
    public class BasketModel
    {
        public List<OrderRecordBook> BookProducts { get; set; }
        public List<OrderRecordJournal> JournalProducts { get; set; }
        public List<OrderRecordNewspaper> NewspaperProducts { get; set; }

        public int OrderId { get; set; }
        public double SumPrice { get; set; }
        public double TotalProductsCount => BookProducts.Count + JournalProducts.Count + NewspaperProducts.Count;

        public BasketModel()
        {
            BookProducts = new List<OrderRecordBook>();
            JournalProducts = new List<OrderRecordJournal>();
            NewspaperProducts = new List<OrderRecordNewspaper>();
        }
    }
}
