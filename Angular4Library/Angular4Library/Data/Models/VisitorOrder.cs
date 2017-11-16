using System;
using Microsoft.EntityFrameworkCore;

namespace Angular4Library.Data.Models
{
    public class VisitorOrder
    {
        public int Id { get; set; }
        public int VisitorId { get; set; }
        public float Sum { get; set; }
        public bool Completed { get; set; }

        public DbSet<VisitorOrderRecord> VisitorOrderRecords { get; set; }

        public Visitor Visitor { get; set; }
    }
}