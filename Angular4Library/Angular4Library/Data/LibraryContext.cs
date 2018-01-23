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

        public LiteCollection<Visitor> Visitors => db.GetCollection<Visitor>();
        public LiteCollection<Account> Accounts => db.GetCollection<Account>();
        public LiteCollection<AccountAccessRecord> AccountAccessRecords => db.GetCollection<AccountAccessRecord>();
        public LiteCollection<Book> Books => db.GetCollection<Book>();
        public LiteCollection<Journal> Journals => db.GetCollection<Journal>();        

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
