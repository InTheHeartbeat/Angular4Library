namespace Angular4Library.Data.Models
{
    public class VisitorOrderRecord
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public int Count { get; set; }

        public string ProductType { get; set; }

        public VisitorOrder VisitorOrder { get; set; }
    }
}