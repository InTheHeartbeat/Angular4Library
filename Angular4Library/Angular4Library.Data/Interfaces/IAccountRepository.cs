using Angular4Library.Data.Models.Accounting;

namespace Angular4Library.Data.Interfaces
{
    public interface IAccountRepository
    {
        Visitor GetVisitorByToken(string visitorToken);
        Account GetAccountByToken(string accountToken, string remoteAddress);
        AccountAccessRecord GetAccountAccessRecord(Account account);
        Account GetAccountByAuthData(string login, string password);
        Visitor InsertNewVisitor();
        AccountAccessRecord InsertNewAccountAccessRecord(int accountId, string remoteAddress);
        void DeleteAccountAccessRecordByAddress(string remoteAddress);
        void DeleteAccountAccessRecordByToken(string token);
        bool CheckLoginAvailable(string login);
        void InsertNewAccount(Account newAccount);
    }
}