
namespace Angular4Library.Models.Data
{
    public class OrderRecordBookViewModel : BookViewModel
    {
        public int RecordId { get; set; }

        public OrderRecordBookViewModel(BookViewModel book, int recordProductId) : base(book)
        {
            RecordId = recordProductId;            
        }        
    }
}
