using System;
using System.Linq;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Angular4Library.Extensions;
using Angular4Library.Models;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    public class AccountController : Controller
    {
        private LibraryContext _context;

        public AccountController(LibraryContext context)
        {
            _context = context;
        }

        [Route("api/Account/GetCurrentUser")]        
        [HttpGet]
        public IActionResult GetCurrentUser()
        {                    
            string at = Request.Cookies["AT"];
            string vt = Request.Cookies["VT"];

            string adr = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            if (String.IsNullOrWhiteSpace(at) && String.IsNullOrWhiteSpace(vt) && !String.IsNullOrWhiteSpace(adr))
            {                
                return Ok(GetAuthDataModel(InitializeVisitor()));
            }

            if (!String.IsNullOrWhiteSpace(vt) && !String.IsNullOrWhiteSpace(adr))
            {                
                return Ok(GetAuthDataModel(GetCurrentVisitor(vt)));
            }

            if (!String.IsNullOrWhiteSpace(at) && !String.IsNullOrWhiteSpace(adr))
            {
                return Ok(GetAuthDataModel(GetCurrentAccount(at, adr)));
            }

            return BadRequest();
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

        private Visitor InitializeVisitor()
        {
            Guid token = Guid.NewGuid();

            Visitor visitor = new Visitor()
            {
                Token = token,
                LastAccess = DateTime.Now
            };

            _context.Visitors.Insert(visitor);

            return visitor;
        }

        private AuthDataModel GetAuthDataModel(Visitor visitor)
        {
            return new AuthDataModel()
            {
                IsAdmin = false,
                IsVisitor = true,
                Token = visitor.Token.ToString(),
                Login = String.Empty
            };
        }

        private AuthDataModel GetAuthDataModel(Account account)
        {
            AccountAccessRecord rec = _context.AccountAccessRecords.FindOne(a => a.AccountId == account.Id);
            return new AuthDataModel()
            {
                IsAdmin = account.IsAdmin,
                IsVisitor = false,
                Token = rec.Token.ToString(),
                Login = account.Login
            };
        }

        [Route("api/Account/TrySignIn")]        
        [HttpPost]
        public IActionResult TrySignIn([FromBody] SignInDataModel dataModel)
        {
            try
            {
                Account account = _context.Accounts.FindOne(
                    ac => ac.Login == dataModel.Login && ac.Hash == dataModel.Password.MD5());

                if (account == null)
                {
                    return Ok(new AuthDataModel() {Message = "Login or password incorrect"});
                }

                Guid token = Guid.NewGuid();


                string adr = Request.HttpContext.Connection.RemoteIpAddress.ToString();                

                AccountAccessRecord previousRecord = _context.AccountAccessRecords.FindOne(r => r.Source == adr);
                if (previousRecord != null)
                {
                    _context.AccountAccessRecords.Delete(previousRecord.Id);
                }

                AccountAccessRecord record = new AccountAccessRecord()
                {
                    ActiveDate = DateTime.Now,
                    AccountId = account.Id,
                    Source = adr,
                    Token = token
                };
                _context.AccountAccessRecords.Insert(record);

                return Ok(new AuthDataModel()
                {
                    IsAdmin = account.IsAdmin,
                    Login = account.Login,
                    Token = token.ToString(),
                    IsVisitor = false
                });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Route("api/Account/SignOut")]        
        [HttpPost]
        public IActionResult SignOut([FromBody] AuthDataModel model)
        {
            AccountAccessRecord a = _context.AccountAccessRecords.FindById(_context.AccountAccessRecords.Min()); 
            AccountAccessRecord previousRecord = _context.AccountAccessRecords.FindOne(r => r.Token == new Guid(model.Token));
            if (previousRecord != null)
            {
                _context.AccountAccessRecords.Delete(previousRecord.Id);
                return GetCurrentUser();
            }

            return BadRequest();
        }

        [Route("api/Account/TrySignUp")]        
        [HttpPost]
        public IActionResult TrySignUp([FromBody]SignInDataModel dataModel)
        {
            try
            {
                AuthDataModel model = new AuthDataModel();
                if (_context.Accounts.Exists(ac => ac.Login == dataModel.Login))
                {
                    model.Message = "Login already exist";
                    return BadRequest(model);
                }

                Account newAccount = new Account()
                {
                    Login = dataModel.Login,
                    Hash = dataModel.Password.MD5(),
                    IsAdmin = false 
                };

                _context.Accounts.Insert(newAccount);                

                return TrySignIn(dataModel);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

