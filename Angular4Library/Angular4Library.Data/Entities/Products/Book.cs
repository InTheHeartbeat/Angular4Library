using System;
using System.Xml.Serialization;

namespace Angular4Library.Data.Entities.Products
{
    public class Book
    {
        [XmlIgnore]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public int Pages { get; set; }        
        public string Genre { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }

        public Book()
        {

        }
    }
}
