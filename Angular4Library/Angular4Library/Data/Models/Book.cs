using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Angular4Library.Data.Models
{
    public class Book
   {        
        [XmlIgnore]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public int Pages { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }

       public Book()
       {
           
       }

       protected Book(Book book)
       {
           Id = book.Id;
           Title = book.Title;
           Year = book.Year;
           Pages = book.Pages;
           Author = book.Author;
           Genre = book.Genre;
           Amount = book.Amount;
           Price = book.Price;
           PhotoPath = book.PhotoPath;
       }
    }
}
