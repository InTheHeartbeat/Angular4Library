using System;

namespace Angular4Library.Data.Entities.Accounting
{
    public class Visitor
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime LastAccess { get; set; }               
    }
}
