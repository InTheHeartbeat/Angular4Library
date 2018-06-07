
using Angular4Library.Data.Entities.Accounting;

namespace Angular4Library.Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Visitor GetVisitorByToken(string visitorToken);
        Account GetAccountByToken(string accountToken, string remoteAddress);
        AccountAccessRecord GetAccountAccessRecord(Account account);
        Account GetAccountByAuthData(string login, string password);
        void InsertNewVisitor(Visitor visitor);
        void InsertNewAccountAccessRecord(AccountAccessRecord accessRecord);
        void DeleteAccountAccessRecordByAddress(string remoteAddress);
        void DeleteAccountAccessRecordByToken(string token);
        bool CheckLoginAvailable(string login);
        void InsertNewAccount(Account newAccount);
    }
}