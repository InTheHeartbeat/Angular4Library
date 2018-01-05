using System;
using System.Net.Http;
using Angular4Library.Data;
using Angular4Library.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Controllers.Api
{
    /*
    public class BaseApiController : Controller
    {
        protected Account CurrentUser { get; private set; }
        //protected Visitor CurrentVisitor { get; private set; }

        protected LibraryContext DataContext { get; private set; }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);

            DataContext = new LibraryDataContext();

            InitializeCurrentUser(controllerContext.Request);
            InitializeCurrentVisitor(controllerContext.Request);
        }

        private void InitializeCurrentUser(HttpRequestMessage requestContext)
        {
            string at = requestContext.Headers.GetCookies("AToken")?.FirstOrDefault()?["AToken"]?.Value;

            string adr = "";
            if (requestContext.Properties.ContainsKey("MS_HttpContext"))
            {
                adr = ((HttpContextWrapper)requestContext.Properties["MS_HttpContext"]).Request.UserHostAddress;
            }

            if (!string.IsNullOrWhiteSpace(at) && !string.IsNullOrWhiteSpace(adr))
            {
                Guid token = Guid.Parse(at);
                try
                {
                    CurrentUser = DataContext.AccountAccessRecord.FirstOrDefault(t => t.Token == token && t.Source == adr)?.Account;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);                    
                }                
            }
        }

        private void InitializeCurrentVisitor(HttpRequestMessage requestContext)
        {
            string vt = requestContext.Headers.GetCookies("VToken")?.FirstOrDefault()?["VToken"]?.Value; ;
            if (vt != null)
            {
                Guid guid = Guid.Parse(vt);
                try
                {
                    CurrentVisitor = DataContext.Visitors.FirstOrDefault(v => v.Token == guid);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);                   
                }                
            }
        }
    }*/
}
