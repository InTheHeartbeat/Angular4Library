
namespace Angular4Library.Models.Data
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
