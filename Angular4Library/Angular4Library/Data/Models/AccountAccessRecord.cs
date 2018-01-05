namespace Angular4Library.Data.Models
{
    public class AccountAccessRecord
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public System.Guid Token { get; set; }
        public System.DateTime ActiveDate { get; set; }
        public string Source { get; set; }        
    }
}