using System.Collections.Generic;

namespace Angular4Library.Data.Models.DataTransfer
{
    public class ExportModel
    {        
        public IEnumerable<int> IdsArray { get; set; }
        public bool IsXml { get; set; }
    }
}
