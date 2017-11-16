using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular4Library.Data
{
    public class LibraryContext : DbContext
    {
        public DbSet<Visitor> Visitor { get; set; }

        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
            
        }

    }
}
