using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular4Library.Data.Models;
using Angular4Library.Models;
using Microsoft.AspNetCore.Http;

namespace Angular4Library.Data
{
    public class AccountProvider
    {
        private LibraryContext _context;
        public AccountProvider(LibraryContext context)
        {
            _context = context;
        }

        public AuthDataModel GetAuthDataModel(string vt)
        {
            Visitor current = GetCurrentVisitor(vt);
            return new AuthDataModel()
            {
                UserId = current.Id,
                IsAdmin = false,
                IsVisitor = true,
                Token = current.Token.ToString(),
                Login = String.Empty
            };
        }

        public AuthDataModel GetAuthDataModel(string at, string adr)
        {
            Account account = GetCurrentAccount(at, adr);
            AccountAccessRecord rec = _context.AccountAccessRecords.FindOne(a => a.AccountId == account.Id);
            return new AuthDataModel()
            {
                UserId = account.Id,
                IsAdmin = account.IsAdmin,
                IsVisitor = false,
                Token = rec.Token.ToString(),
                Login = account.Login
            };
        }

        public AuthDataModel GetCurrent(HttpRequest request)
        {
            string at = request.Cookies["AT"];
            string vt = request.Cookies["VT"];

            string adr = request.HttpContext.Connection.RemoteIpAddress.ToString();

            if (String.IsNullOrWhiteSpace(at) && String.IsNullOrWhiteSpace(vt) && !String.IsNullOrWhiteSpace(adr))
            {
                return InitializeVisitor();
            }

            if (!String.IsNullOrWhiteSpace(vt) && !String.IsNullOrWhiteSpace(adr))
            {
                return GetAuthDataModel(vt);
            }

            if (!String.IsNullOrWhiteSpace(at) && !String.IsNullOrWhiteSpace(adr))
            {
                return GetAuthDataModel(at, adr);
            }
            return null;
        }

        public AuthDataModel InitializeVisitor()
        {
            Guid token = Guid.NewGuid();

            Visitor visitor = new Visitor()
            {
                Token = token,
                LastAccess = DateTime.Now
            };

            _context.Visitors.Insert(visitor);

            return GetAuthDataModel(visitor.Token.ToString());
        }
        

        private Account GetCurrentAccount(string at, string adr)
        {
            AccountAccessRecord record =
                _context.AccountAccessRecords.FindOne(aar => aar.Source == adr && aar.Token == Guid.Parse(at));
            if (record != null)
            {
                return _context.Accounts.FindOne(a => a.Id == record.AccountId);
            }
            return null;
        }

        private Visitor GetCurrentVisitor(string vt)
        {
            return _context.Visitors.FindOne(v => v.Token.ToString() == vt);
        }
    }
}
