using System;
using System.Collections.Generic;
using System.Text;

namespace Angular4Library.Data.Entities.Additional
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        
        public DateTime Birthday { get; set; }
        public DateTime DateOfDeath { get; set; }

        public override bool Equals(object obj)
        {
            return ((Author)obj).Id == Id;
        }
    }
}
