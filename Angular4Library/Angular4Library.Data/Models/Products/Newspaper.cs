using System;
using System.Xml.Serialization;

namespace Angular4Library.Data.Models.Products
{
    public class Newspaper
    {
        [XmlIgnore]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }        
        public string Periodicity { get; set; }        
        public int Amount { get; set; }
        public double Price { get; set; }
        public string PhotoPath
        {
            get
            {
                if (String.IsNullOrEmpty(_photoPath))
                {
                    return "/Upload/Images/no-photo-e.png";
                }
                return _photoPath;
            }
            set => _photoPath = value;
        }

        private string _photoPath;

        public Newspaper()
        {
            
        }

        protected Newspaper(Newspaper newspaper)
        {
            Id = newspaper.Id;
            Title = newspaper.Title;
            Periodicity = newspaper.Periodicity;
            Date = newspaper.Date;
            Amount = newspaper.Amount;
            Price = newspaper.Price;
            PhotoPath = newspaper.PhotoPath;
        }
    }
}
