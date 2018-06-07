using Angular4Library.Data.Entities.Additional;
using System;
using System.Collections.Generic;
using System.Text;

namespace Angular4Library.Data.Models.Products
{
    public class ExtendedBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public int Pages { get; set; }
        public List<Author> Authors { get; set; }
        public string Genre { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }
    }
}
