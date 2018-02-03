using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular4Library.Data.Models
{
    public class ExportModel
    {
        public int Type { get; set; }
        public IEnumerable<int> IdsArray { get; set; }
        public bool IsXml { get; set; }
    }
}
