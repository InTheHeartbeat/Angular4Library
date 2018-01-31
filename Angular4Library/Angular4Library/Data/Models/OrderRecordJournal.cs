using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class OrderRecordJournal : Journal
    {
        public int RecordId { get; set; }
        public OrderRecordJournal(Journal journal, int recordProductId) :base(journal)
        {
            RecordId = recordProductId;
       }        
    }
}
