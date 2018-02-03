using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class ImportModel
    {
        public List<Book> BookProducts { get; set; }
        public List<Journal> JournalProducts { get; set; }
        public List<Newspaper> NewspaperProducts { get; set; }
    }
}
