using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data.Models;
using LiteDB;
using Microsoft.EntityFrameworkCore;

namespace Angular4Library.Data
{
    public class LibraryContext : IDisposable
    {
        private LiteDatabase db;

        public LiteCollection<Visitor> Visitor => db.GetCollection<Visitor>();
        public LiteCollection<Account> Account => db.GetCollection<Account>();
        public LiteCollection<AccountAccessRecord> AccountAccessRecord => db.GetCollection<AccountAccessRecord>();

        public LibraryContext()
        {
            db = new LiteDatabase("Data/db.ldb");
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
