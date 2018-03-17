namespace Angular4Library.Data.Models.Selling
{
    public class VisitorOrder
    {
        public int Id { get; set; }
        public int VisitorId { get; set; }
        public float Sum { get; set; }
        public bool Completed { get; set; }
    }
}