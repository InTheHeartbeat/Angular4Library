using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class Account
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
        public string Login { get; set; }
        public string Hash { get; set; }                
    }
}
