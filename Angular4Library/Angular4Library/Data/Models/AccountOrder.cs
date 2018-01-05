using Microsoft.EntityFrameworkCore;

namespace Angular4Library.Data.Models
{
    public class AccountOrder
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public float Sum { get; set; }
        public bool Completed { get; set; }
    }
}