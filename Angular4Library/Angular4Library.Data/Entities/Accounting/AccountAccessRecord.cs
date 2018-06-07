using System.ComponentModel.DataAnnotations.Schema;

namespace Angular4Library.Data.Entities.Accounting
{
    public class AccountAccessRecord
    {
        public int Id { get; set; }
        [ForeignKey("Account")]
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        public string Token { get; set; }
        public System.DateTime ActiveDate { get; set; }
        public string Source { get; set; }        
    }
}