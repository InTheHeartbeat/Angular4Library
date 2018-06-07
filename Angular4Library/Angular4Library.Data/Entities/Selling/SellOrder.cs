namespace Angular4Library.Data.Entities.Selling
{
    public class SellOrder
    {
        public int Id { get; set; }        
        public bool Authorized { get; set; }
        public int UserId { get; set; }        
        public bool Completed { get; set; }
    }
}