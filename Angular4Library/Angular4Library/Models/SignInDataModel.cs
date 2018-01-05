using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Models
{
    public class SignInDataModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public SignInDataModel(string login, string password)
        {
            Login = login;
            Password = password;
        }

        public SignInDataModel()
        {
            
        }
    }
}
