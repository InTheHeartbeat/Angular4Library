using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Models.IO
{
    public class NewspaperContent
    {
        public string Title { get; set; }
        public string Date { get; set; }
        public string Periodicity { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath { get; set; }
    }
}
