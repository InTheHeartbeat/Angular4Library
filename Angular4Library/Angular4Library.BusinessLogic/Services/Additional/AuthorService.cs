using Angular4Library.Data.Entities.Additional;
using Angular4Library.Repositories;
using Angular4Library.ViewModels.Author;
using System.Collections.Generic;
using System.Linq;

namespace Angular4Library.BusinessLogic.Services.Additional
{
    public class AuthorService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public AuthorService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public IEnumerable<AuthorViewModel> GetAuthors()
        {
            IEnumerable<AuthorViewModel> result = _repositoryProvider.AuthorRepository.GetAuthors().Select(author => new AuthorViewModel()
            {
                Id = author.Id,
                FullName = $"{author.LastName} {author.Name} {author.Surname}"
            });

            return result;
        }
        public IEnumerable<AuthorViewModel> GetAuthorsWithoutExists(int bookId)
        {
            IEnumerable<Author> exists = _repositoryProvider.AuthorRepository.GetAuthorsByBookId(bookId);

            IEnumerable<AuthorViewModel> result = _repositoryProvider.AuthorRepository
                .GetAuthorsWithoutExists(exists)
                .Select(author => new AuthorViewModel()
                {
                    Id = author.Id,
                    FullName = $"{author.LastName} {author.Name} {author.Surname}"
                });

            return result;
        }
    }
}
