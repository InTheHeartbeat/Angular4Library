using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class Newspaper
    {        
        public int Id { get; set; }
        public string Title { get; set; }
        public int Date { get; set; }        
        public string Periodicity { get; set; }        
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }

        public Newspaper()
        {
            
        }

        protected Newspaper(Newspaper newspaper)
        {
            Id = newspaper.Id;
            Title = newspaper.Title;
            Periodicity = newspaper.Periodicity;
            Date = newspaper.Date;
            Amount = newspaper.Amount;
            Price = newspaper.Price;
            PhotoPath = newspaper.PhotoPath;
        }
    }
}
