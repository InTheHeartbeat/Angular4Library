using Angular4Library.Data.Entities.Accounting;
using Angular4Library.Data.Entities.Additional;
using Angular4Library.Data.Entities.Products;
using Angular4Library.Data.Entities.Selling;
using Microsoft.EntityFrameworkCore;

namespace Angular4Library.Repositories
{
    public class DataContext : DbContext
    {
        public static readonly string ConnectionString = "Data Source=DESKTOP-1DKHDBR;Initial Catalog=Library;Integrated Security=True";

        public DbSet<Account> Account { get; set; }
        public DbSet<AccountAccessRecord> AccountAccessRecord { get; set; }
        public DbSet<Visitor> Visitor { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<AuthorOwnEntry> AuthorOwnEntrie { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<Journal> Journal { get; set; }
        public DbSet<Newspaper> Newspaper { get; set; }
        public DbSet<SellOrder> SellOrder { get; set; }
        public DbSet<SellOrderRecord> SellOrderRecord { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {            
        }
    }
}
