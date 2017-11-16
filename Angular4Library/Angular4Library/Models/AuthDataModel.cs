using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Models
{
    public class AuthDataModel
    {
        public string Login { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsVisitor { get; set; }
        public string Token { get; set; }       
    }
}
