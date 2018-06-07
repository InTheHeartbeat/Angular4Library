
using Angular4Library.Data.Entities.Accounting;
using Angular4Library.Extensions;
using Angular4Library.Repositories.Interfaces;
using Dapper;
using System.Data.SqlClient;

namespace Angular4Library.Repositories
{
    public class AccountRepository : IAccountRepository
    {       
        public AccountRepository(RepositoryProvider repositoryProvider)
        {            
        }

        public Visitor GetVisitorByToken(string visitorToken)
        {
            Visitor result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<Visitor>("select * from Visitor where Token = @VisitorToken;", new { VisitorToken = visitorToken });
            }

            return result;
        }
        public Account GetAccountByToken(string accountToken, string remoteAddress)
        {
            Account result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                
                AccountAccessRecord record = connection.QueryFirstOrDefault<AccountAccessRecord>("select * from AccountAccessRecord where Source = @Source and Token = @Token;", new { Source = remoteAddress, Token = accountToken });

                if (record != null)
                {
                    result = connection.QueryFirstOrDefault<Account>("select * from Account where Id=@Id;", new { Id = record.AccountId });
                }
            }

            return result;
        }
        public AccountAccessRecord GetAccountAccessRecord(Account account)
        {
            AccountAccessRecord result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<AccountAccessRecord>("select * from AccountAccessRecord where AccountId = @AccountId;", new { AccountId = account.Id });
            }
            return result;
        }     
        public Account GetAccountByAuthData(string login, string password)
        {
            Account result = null;
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<Account>("select * from Account where Login = @Login and Hash=@Hash;",
                    new { Login = login, Hash = password.MD5() });
            }     
            return result;
        }
        
        public void InsertNewVisitor(Visitor visitor)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {            
                connection.Execute("INSERT INTO Visitor (Token, LastAccess) Values (@Token, @LastAccess);",
                    visitor);
            }                    
        }

        public void InsertNewAccountAccessRecord(AccountAccessRecord accessRecord)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("INSERT INTO AccountAccessRecord (Source, Token, ActiveDate, AccountId) Values (@Source, @Token, @ActiveDate, @AccountId);",
                    accessRecord);
            }
        }

        public void DeleteAccountAccessRecordByAddress(string remoteAddress)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("delete from AccountAccessRecord where Source = @Source",
                    new { Source = remoteAddress });
            }            
        }
        public void DeleteAccountAccessRecordByToken(string token)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("delete from AccountAccessRecord where Token = @Token",
                    new { Token = token });
            }
        }

        public bool CheckLoginAvailable(string login)
        {
            Account result = null;

            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                result = connection.QueryFirstOrDefault<Account>("select * from Account where Login = @Login", new { Login = login });
            }

            return result != null;
        }

        public void InsertNewAccount(Account newAccount)
        {
            using (var connection = new SqlConnection(DataContext.ConnectionString))
            {
                connection.Execute("INSERT INTO Account (Login, IsAdmin, Hash) Values (@Login, @IsAdmin, @Hash);",
                    newAccount);
            }
        }
    }
}
