using System;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Accounting;
using Angular4Library.Data.Models.Products;
using Angular4Library.Data.Models.Selling;
using LiteDB;

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
        public LiteCollection<Newspaper> Newspapers => db.GetCollection<Newspaper>();        
        public LiteCollection<SellOrder> SellOrders => db.GetCollection<SellOrder>();
        public LiteCollection<SellOrderRecord> SellOrderRecords => db.GetCollection<SellOrderRecord>();

        public LibraryContext()
        {
            db = new LiteDatabase(@"Data/db.ldb");
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
