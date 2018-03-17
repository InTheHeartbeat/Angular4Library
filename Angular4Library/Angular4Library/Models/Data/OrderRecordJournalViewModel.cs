
namespace Angular4Library.Models.Data
{
    public class OrderRecordJournalViewModel : JournalViewModel
    {
        public int RecordId { get; set; }
        public OrderRecordJournalViewModel(JournalViewModel journal, int recordProductId) :base(journal)
        {
            RecordId = recordProductId;
       }        
    }
}
