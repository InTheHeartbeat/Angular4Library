using System;

namespace Angular4Library.Data.Models.Accounting
{
    public class Visitor
    {
        public int Id { get; set; }
        public Guid Token { get; set; }
        public DateTime LastAccess { get; set; }               
    }
}
