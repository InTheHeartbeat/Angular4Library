
using Angular4Library.ViewModels.Books;

namespace Angular4Library.ViewModels.Sell
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
