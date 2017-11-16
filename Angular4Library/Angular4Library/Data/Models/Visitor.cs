using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Angular4Library.Data.Models
{
    public class Visitor
    {
        public int Id { get; set; }
        public Guid Token { get; set; }
        public DateTime LastAccess { get; set; }

        public DbSet<VisitorOrder> VisitorOrders { get; set; }
    }
}
