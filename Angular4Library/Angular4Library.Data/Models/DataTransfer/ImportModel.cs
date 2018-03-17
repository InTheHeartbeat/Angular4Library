using System.Collections.Generic;
using Angular4Library.Data.Models.Products;

namespace Angular4Library.Data.Models.DataTransfer
{
    public class ImportModel
    {
        public List<Book> BookProducts { get; set; }
        public List<Journal> JournalProducts { get; set; }
        public List<Newspaper> NewspaperProducts { get; set; }    
    }
}
