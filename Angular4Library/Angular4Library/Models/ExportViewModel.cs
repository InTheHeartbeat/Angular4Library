using System.Collections.Generic;

namespace Angular4Library.Models
{
    public class ExportViewModel
    {
        public int Type { get; set; }
        public IEnumerable<int> IdsArray { get; set; }
        public bool IsXml { get; set; }
    }
}
