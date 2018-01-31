using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class OrderRecordBook : Book
    {
        public int RecordId { get; set; }

        public OrderRecordBook(Book book, int recordProductId) : base(book)
        {
            RecordId = recordProductId;            
        }        
    }
}
