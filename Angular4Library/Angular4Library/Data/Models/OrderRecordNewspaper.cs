using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class OrderRecordNewspaper : Newspaper
    {
        public int RecordId { get; set; }
        public OrderRecordNewspaper(Newspaper newspaper, int recordProductId) :base(newspaper)
        {
            RecordId = recordProductId;
        }        
    }
}
