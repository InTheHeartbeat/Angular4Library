using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.ViewModels.Account
{
    public class SignInViewModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public SignInViewModel(string login, string password)
        {
            Login = login;
            Password = password;
        }

        public SignInViewModel()
        {
            
        }
    }
}
