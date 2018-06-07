
using Angular4Library.ViewModels.Newspapers;

namespace Angular4Library.ViewModels.Sell
{
    public class OrderRecordNewspaperViewModel : NewspaperViewModel
    {
        public int RecordId { get; set; }
        public OrderRecordNewspaperViewModel(NewspaperViewModel newspaper, int recordProductId) :base(newspaper)
        {
            RecordId = recordProductId;
        }        
    }
}
