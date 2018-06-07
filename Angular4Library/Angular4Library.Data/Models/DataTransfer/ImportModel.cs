using Angular4Library.Data.Entities.Products;
using Angular4Library.Data.Models.Products;
using System.Collections.Generic;

namespace Angular4Library.Data.Models.DataTransfer
{
    public class ImportModel
    {
        public List<ExtendedBook> BookProducts { get; set; }
        public List<Journal> JournalProducts { get; set; }
        public List<Newspaper> NewspaperProducts { get; set; }    
    }
}
