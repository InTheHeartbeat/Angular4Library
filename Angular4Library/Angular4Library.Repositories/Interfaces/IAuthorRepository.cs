using Angular4Library.Data.Entities.Additional;
using System.Collections.Generic;

namespace Angular4Library.Repositories.Interfaces
{
    public interface IAuthorRepository
    {
        void InsertAuthor(Author author);
        void InsertAuthorOwnEntry(AuthorOwnEntry ownEntry);
        void InsertAuthorOwnEntries(List<AuthorOwnEntry> ownEntry);
        void DeleteAuthorOwnEntriesByBookId(int bookId);
        IEnumerable<Author> GetAuthors();
        IEnumerable<Author> GetAuthorsWithoutExists(IEnumerable<Author> exist);
        IEnumerable<Author> GetAuthorsByBookId(int bookId);
        void UpdateBookAuthors(int id, List<AuthorOwnEntry> newAuthors);
    }
}
