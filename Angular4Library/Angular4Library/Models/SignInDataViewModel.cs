using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Models
{
    public class SignInDataViewModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public SignInDataViewModel(string login, string password)
        {
            Login = login;
            Password = password;
        }

        public SignInDataViewModel()
        {
            
        }
    }
}
