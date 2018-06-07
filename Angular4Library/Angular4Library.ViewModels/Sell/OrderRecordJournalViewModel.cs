
using Angular4Library.ViewModels.Journals;

namespace Angular4Library.ViewModels.Sell
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
