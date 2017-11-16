using System;
using System.Linq;
using Angular4Library.Data;
using Angular4Library.Data.Models;
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
                return Ok(GetCurrentAccount(at, adr));
            }

            return BadRequest();
        }

        private object GetCurrentAccount(string at, string adr)
        {
            throw new NotImplementedException();
        }

        private Visitor GetCurrentVisitor(string vt)
        {
            return _context.Visitor.FirstOrDefault(v => v.Token.ToString() == vt);
        }

        private Visitor InitializeVisitor()
        {
            Guid token = Guid.NewGuid();

            Visitor visitor = new Visitor()
            {
                Token = token,
                LastAccess = DateTime.Now
            };

            _context.Visitor.Add(visitor);
            _context.SaveChanges();

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
        /*
        [Route("api/Account/TrySignIn")]
        [ResponseType(typeof(AuthModel))]
        [HttpPost]
        public IHttpActionResult TrySignIn(LoginDataModel dataModel)
        {
            try
            {
                Account account = DataContext.Accounts.FirstOrDefault(
                    ac => ac.Login == dataModel.Login && ac.Hash == dataModel.Password.MD5());

                if (account == null)
                {
                    return Ok(new AuthModel() {Message = "Login or password incorrect"});
                }

                Guid token = Guid.NewGuid();


                string adr = "";
                if (Request.Properties.ContainsKey("MS_HttpContext"))
                {
                    adr = ((HttpContextWrapper) Request.Properties["MS_HttpContext"]).Request.UserHostAddress;
                }

                AccountAccessRecord previousRecord = account.AccountAccessRecords.FirstOrDefault(r => r.Source == adr);
                if (previousRecord != null)
                {
                    DataContext.AccountAccessRecords.DeleteOnSubmit(previousRecord);
                    DataContext.SubmitChanges();
                }

                AccountAccessRecord record = new AccountAccessRecord()
                {
                    ActiveDate = DateTime.Now,
                    Account = account,
                    Source = adr,
                    Token = token
                };
                DataContext.AccountAccessRecords.InsertOnSubmit(record);
                DataContext.SubmitChanges();

                return Ok(new AuthModel()
                {
                    IsAdmin = account.IsAdmin,
                    Name = account.Login,
                    Token = token.ToString(),
                    IsVisitor = false
                });
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [Route("api/Account/SignOut")]
        [ResponseType(typeof(void))]
        [HttpGet]
        public IHttpActionResult SignOut()
        {
            if (CurrentUser == null) { return Unauthorized(); }
            string adr = "";
            if (Request.Properties.ContainsKey("MS_HttpContext"))
            {
                adr = ((HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request.UserHostAddress;
            }

            AccountAccessRecord previousRecord = CurrentUser?.AccountAccessRecords.FirstOrDefault(r => r.Source == adr);
            if (previousRecord != null)
            {
                DataContext.AccountAccessRecords.DeleteOnSubmit(previousRecord);
                DataContext.SubmitChanges();                
            }

            return Ok();
        }

        [Route("api/Account/TrySignUp")]
        [ResponseType(typeof(AuthModel))]
        [HttpPost]
        public IHttpActionResult TrySignUp(LoginDataModel dataModel)
        {
            try
            {
                AuthModel model = new AuthModel();
                if (DataContext.Accounts.Any(ac => ac.Login == dataModel.Login))
                {
                    model.Message = "Login already exist";
                    return Ok(model);
                }

                Account newAccount = new Account()
                {
                    Login = dataModel.Login,
                    Hash = dataModel.Password.MD5()
                };

                DataContext.Accounts.InsertOnSubmit(newAccount);
                DataContext.SubmitChanges();

                return TrySignIn(dataModel);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }*/
    }
}

