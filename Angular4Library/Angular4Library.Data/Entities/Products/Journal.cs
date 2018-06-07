using System;
using System.Xml.Serialization;

namespace Angular4Library.Data.Entities.Products
{
    public class Journal
    {
        [XmlIgnore]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public int Pages { get; set; }
        public string Periodicity { get; set; }
        public string Theme { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }

        public Journal()
        {

        }
    }
}
