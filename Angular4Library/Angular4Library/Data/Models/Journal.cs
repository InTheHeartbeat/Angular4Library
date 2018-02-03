using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class Journal
    {         
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public int Pages { get; set; }
        public string Periodicity { get; set; }
        public string Theme { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }
        protected Journal(Journal journal)
        {
            Id = journal.Id;
            Title = journal.Title;
            Theme = journal.Theme;
            Pages = journal.Pages;
            Periodicity = journal.Periodicity;
            Date = journal.Date;
            Amount = journal.Amount;
            Price = journal.Price;
            PhotoPath = journal.PhotoPath;
        }

        public Journal()
        {
            
        }
    }
}
