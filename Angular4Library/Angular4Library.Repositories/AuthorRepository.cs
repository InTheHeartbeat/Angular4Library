using Angular4Library.Data.Entities.Additional;
using Angular4Library.Repositories.Interfaces;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Angular4Library.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private RepositoryProvider _provider;

        public AuthorRepository(RepositoryProvider repositoryProvider)
        {
            _provider = repositoryProvider;
        }

        public void InsertAuthor(Author author)
        {
            if (author == null)
            {
                throw new ArgumentNullException();
            }

            if (author.Birthday == DateTime.MinValue)
            {
                author.Birthday = DateTime.MaxValue;
            }
            if (author.DateOfDeath == DateTime.MinValue)
            {
                author.DateOfDeath = DateTime.MaxValue;
            }

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("INSERT INTO Author (Name, Surname,LastName,Birthday,DateOfDeath) Values (@Name, @Surname, @LastName,@Birthday,@DateOfDeath);",
                    author);
            }
        }
        public void InsertAuthorOwnEntry(AuthorOwnEntry ownEntry)
        {
            if (ownEntry == null)
            {
                throw new ArgumentNullException();
            }

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("INSERT INTO AuthorOwnEntry (AuthorId, BookId) Values (@AuthorId, @BookId);",
                    ownEntry);
            }
        }
        public void InsertAuthorOwnEntries(List<AuthorOwnEntry> ownEntries)
        {
            if (ownEntries == null)
            {
                throw new ArgumentNullException();
            }
            if (!ownEntries.Any())
            {
                return;
            }

            string sql = "INSERT INTO AuthorOwnEntry (AuthorId, BookId) Values (@AuthorId, @BookId);";
            
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {                                
                ownEntries.ForEach(entry => connection.Execute(sql, entry));
            }
        }
        public void DeleteAuthorOwnEntriesByBookId(int bookId)
        {
            if (bookId < 1)
            {
                throw new ArgumentException();
            }

            string sql = "delete from AuthorOwnEntry where BookId = @BookId;";            

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {                
                connection.Execute(sql, new { BookId = bookId });
            }
        }

        public IEnumerable<Author> GetAuthors()
        {
            IEnumerable<Author> result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.Query<Author>("select * from Author;");
            }

            return result;
        }
        public IEnumerable<Author> GetAuthorsWithoutExists(IEnumerable<Author> exist)
        {
            IEnumerable<Author> result = GetAuthors().Where(author => !exist.Any(existAuthor => existAuthor.Id == author.Id));
            return result;
        }
        public IEnumerable<Author> GetAuthorsByBookId(int bookId)
        {
            IEnumerable<Author> result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.Query<Author>(@"select * from AuthorOwnEntry 
                                                                                join Author 
                                                                                on AuthorOwnEntry.AuthorId=Author.Id;");
            }

            return result;
        }

        public void UpdateBookAuthors(int id, List<AuthorOwnEntry> newAuthors)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {                
                    string delete = "delete from AuthorOwnEntry where BookId = @BookId;";
                    string insert = "INSERT INTO AuthorOwnEntry (AuthorId, BookId) Values (@AuthorId, @BookId);";

                    connection.Execute(delete, new { BookId = id }, transaction);
                    newAuthors.ForEach(entry => connection.Execute(insert, entry, transaction));

                    try
                    {
                        transaction.Commit();
                    }
                    catch (Exception e)
                    {
                        transaction.Rollback();
                    }
                }
            }
        }
    }
}
