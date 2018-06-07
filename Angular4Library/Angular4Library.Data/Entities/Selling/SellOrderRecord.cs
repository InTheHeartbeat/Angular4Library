using System.ComponentModel.DataAnnotations.Schema;

namespace Angular4Library.Data.Entities.Selling
{
    public class SellOrderRecord
    {
        public int Id { get; set; }
        [ForeignKey("SellOrder")]
        public int OrderId { get; set; }
        public virtual SellOrder SellOrder { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public int ProductType { get; set; }
    }
}
