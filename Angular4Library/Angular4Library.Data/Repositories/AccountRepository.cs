using System;
using System.Collections.Generic;
using System.Text;
using Angular4Library.Data.Extensions;
using Angular4Library.Data.Interfaces;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Accounting;

namespace Angular4Library.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private LibraryContext _context;

        public AccountRepository(LibraryContext context)
        {
            _context = context;
        }

        public Visitor GetVisitorByToken(string visitorToken)
        {
            Visitor result = _context.Visitors.FindOne(visitor => visitor.Token.ToString() == visitorToken);
            return result;
        }
        public Account GetAccountByToken(string accountToken, string remoteAddress)
        {
            Account result = null;
            AccountAccessRecord record =
                _context.AccountAccessRecords.FindOne(accountAccessRecord => accountAccessRecord.Source == remoteAddress && accountAccessRecord.Token == Guid.Parse(accountToken));
            if (record != null)
            {
                result = _context.Accounts.FindOne(account => account.Id == record.AccountId);                               
            }

            return result;
        }
        public AccountAccessRecord GetAccountAccessRecord(Account account)
        {
            AccountAccessRecord result = _context.AccountAccessRecords.FindOne(accountAccessRecord => accountAccessRecord.AccountId == account.Id);
            return result;
        }     
        public Account GetAccountByAuthData(string login, string password)
        {
            Account result = _context.Accounts.FindOne(
                ac => ac.Login == login && ac.Hash == password.MD5());
            return result;
        }
        
        public Visitor InsertNewVisitor()
        {
            Guid token = Guid.NewGuid();

            Visitor visitor = new Visitor();
            visitor.Token = token;
            visitor.LastAccess = DateTime.Now;

            _context.Visitors.Insert(visitor);

            return visitor;
        }
        public AccountAccessRecord InsertNewAccountAccessRecord(int accountId, string remoteAddress)
        {
            var record = new AccountAccessRecord();
            record.ActiveDate = DateTime.Now;
            record.AccountId = accountId;
            record.Source = remoteAddress;
            record.Token = Guid.NewGuid();

            _context.AccountAccessRecords.Insert(record);

            return record;
        }

        public void DeleteAccountAccessRecordByAddress(string remoteAddress)
        {
            AccountAccessRecord previousRecord = _context.AccountAccessRecords.FindOne(r => r.Source == remoteAddress);
            if (previousRecord != null)
            {
                _context.AccountAccessRecords.Delete(previousRecord.Id);
            }
        }
        public void DeleteAccountAccessRecordByToken(string token)
        {
            AccountAccessRecord accountAccessRecord = _context.AccountAccessRecords.FindOne(r => r.Token == new Guid(token));
            if (accountAccessRecord != null)
            {
                _context.AccountAccessRecords.Delete(accountAccessRecord.Id);
            }
        }

        public bool CheckLoginAvailable(string login)
        {
            bool result = _context.Accounts.Exists(ac => ac.Login == login);
            return result;
        }

        public void InsertNewAccount(Account newAccount)
        {
            _context.Accounts.Insert(newAccount);
        }
    }
}
