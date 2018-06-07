using System;
using Angular4Library.Data.Entities.Accounting;
using Angular4Library.Extensions;
using Angular4Library.Repositories;
using Angular4Library.ViewModels;
using Angular4Library.ViewModels.Account;

namespace Angular4Library.BusinessLogic.Services.Accounting
{
    public class AccountService
    {
        private readonly RepositoryProvider _repositoryProvider;
        public AccountService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public AuthDataViewModel GetAuthDataViewModel(string visitorToken)
        {
            Visitor currentVisitor = _repositoryProvider.AccountRepository.GetVisitorByToken(visitorToken);

            var model = new AuthDataViewModel();
            model.UserId = currentVisitor.Id;
            model.IsAdmin = false;
            model.IsVisitor = true;
            model.Token = currentVisitor.Token.ToString();
            model.Login = String.Empty;

            return model;
        }
        public AuthDataViewModel GetAuthDataViewModel(string accountToken, string remoteAddress)
        {
            Account account = _repositoryProvider.AccountRepository.GetAccountByToken(accountToken, remoteAddress);
            AuthDataViewModel model = null;
            if (account != null)
            {
                model = new AuthDataViewModel();
                model.UserId = account.Id;
                model.IsAdmin = account.IsAdmin;
                model.IsVisitor = false;
                model.Token = _repositoryProvider.AccountRepository.GetAccountAccessRecord(account).Token.ToString();
                model.Login = account.Login;
            }
            return model;
        }
        public AuthDataViewModel GetCurrentAuthData(string accountToken, string visitorToken, string remoteAddress)
        {
            AuthDataViewModel result = null;

            if (String.IsNullOrWhiteSpace(accountToken) && String.IsNullOrWhiteSpace(visitorToken) && !String.IsNullOrWhiteSpace(remoteAddress))
            {
                result = SignVisitor();
                return result;
            }

            if (!String.IsNullOrWhiteSpace(visitorToken) && !String.IsNullOrWhiteSpace(remoteAddress))
            {
                result = GetAuthDataViewModel(visitorToken);
                return result;
            }

            if (!String.IsNullOrWhiteSpace(accountToken) && !String.IsNullOrWhiteSpace(remoteAddress))
            {
                result = GetAuthDataViewModel(accountToken, remoteAddress);
                return result;
            }

            return result;
        }

        public AuthDataViewModel SignVisitor()
        {
            Guid token = Guid.NewGuid();

            Visitor visitor = new Visitor();
            visitor.Token = token.ToString();
            visitor.LastAccess = DateTime.Now;

            _repositoryProvider.AccountRepository.InsertNewVisitor(visitor);

            AuthDataViewModel model = CreateVisitorDataModel(visitor);

            return model;
        }
        public AuthDataViewModel SignAccount(string login, string password, string remoteAddress)
        {
            Account account = _repositoryProvider.AccountRepository.GetAccountByAuthData(login, password);

            if (account == null)
            {
                throw new ArgumentException("Login or password incorrect");
            }

            _repositoryProvider.AccountRepository.DeleteAccountAccessRecordByAddress(remoteAddress);

            AccountAccessRecord accountAccessRecord = null;

            accountAccessRecord = CreateAccountAccessRecord(account, remoteAddress);
            _repositoryProvider.AccountRepository.InsertNewAccountAccessRecord(accountAccessRecord);

            AuthDataViewModel result = CreateAccountDataModel(account, accountAccessRecord);
            return result;
        }

        public void SignOutAccount(string token)
        {
            _repositoryProvider.AccountRepository.DeleteAccountAccessRecordByToken(token);
        }
        public void CreateAccount(SignInViewModel dataViewModel)
        {
            if (_repositoryProvider.AccountRepository.CheckLoginAvailable(dataViewModel.Login))
            {
                throw new ArgumentException("Login already exist");
            }

            var newAccount = new Account()
            {
                Login = dataViewModel.Login,
                Hash = dataViewModel.Password.MD5(),
                IsAdmin = false
            };

            _repositoryProvider.AccountRepository.InsertNewAccount(newAccount);
        }

        private AuthDataViewModel CreateVisitorDataModel(Visitor visitor)
        {
            if (visitor == null)
            {
                throw new ArgumentNullException();
            }

            var model = new AuthDataViewModel();
            model.UserId = visitor.Id;
            model.IsAdmin = false;
            model.IsVisitor = true;
            model.Token = visitor.Token.ToString();
            model.Login = String.Empty;

            return model;
        }
        private AuthDataViewModel CreateAccountDataModel(Account account, AccountAccessRecord accountAccessRecord)
        {
            if (account == null || accountAccessRecord == null)
            {
                throw new ArgumentNullException();
            }

            var result = new AuthDataViewModel();

            result.IsAdmin = account.IsAdmin;
            result.Login = account.Login;
            result.Token = accountAccessRecord.Token.ToString();
            result.IsVisitor = false;

            return result;
        }
        private AccountAccessRecord CreateAccountAccessRecord(Account account, string remoteAddress)
        {
            if (account == null || String.IsNullOrWhiteSpace(remoteAddress))
            {
                throw new ArgumentNullException();
            }

            if (!remoteAddress.IsValidIPAddress())
            {
                throw new ArgumentException("Invalid remote IP address!");
            }

            var accountAccessRecord = new AccountAccessRecord();

            accountAccessRecord.ActiveDate = DateTime.Now;
            accountAccessRecord.AccountId = account.Id;
            accountAccessRecord.Source = remoteAddress;
            accountAccessRecord.Token = Guid.NewGuid().ToString();

            return accountAccessRecord;
        }
    }
}
