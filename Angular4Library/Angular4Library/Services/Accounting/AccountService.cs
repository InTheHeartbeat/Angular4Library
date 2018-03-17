using System;
using Angular4Library.Data.Extensions;
using Angular4Library.Data.Models.Accounting;
using Angular4Library.Data.Providers;
using Angular4Library.Models;
using Microsoft.AspNetCore.Http;

namespace Angular4Library.Services.Accounting
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

            var model = new AuthDataViewModel();
            model.UserId = account.Id;
            model.IsAdmin = account.IsAdmin;
            model.IsVisitor = false;
            model.Token = _repositoryProvider.AccountRepository.GetAccountAccessRecord(account).Token.ToString();
            model.Login = account.Login;

            return model;
        }
        public AuthDataViewModel GetCurrentAuthData(HttpRequest request)
        {
            AuthDataViewModel result = null;

            string accountToken = request.Cookies["AT"];
            string visitorToken = request.Cookies["VT"];

            string remoteAddress = request.HttpContext.Connection.RemoteIpAddress.ToString();

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
            Visitor currentVisitor = _repositoryProvider.AccountRepository.InsertNewVisitor();

            var model = new AuthDataViewModel();
            model.UserId = currentVisitor.Id;
            model.IsAdmin = false;
            model.IsVisitor = true;
            model.Token = currentVisitor.Token.ToString();
            model.Login = String.Empty;

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

            AccountAccessRecord accountAccessRecord = _repositoryProvider.AccountRepository.InsertNewAccountAccessRecord(account.Id, remoteAddress);

            var result = new AuthDataViewModel();
            
            result.IsAdmin = account.IsAdmin;
            result.Login = account.Login;
            result.Token = accountAccessRecord.Token.ToString();
            result.IsVisitor = false;

            return result;
        }
        public void SignOutAccount(string token)
        {
            _repositoryProvider.AccountRepository.DeleteAccountAccessRecordByToken(token);
        }

        public void CreateAccount(SignInDataViewModel dataViewModel)
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
    }
}
