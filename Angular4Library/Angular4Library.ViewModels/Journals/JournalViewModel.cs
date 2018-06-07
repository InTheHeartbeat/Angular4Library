using System;

namespace Angular4Library.ViewModels.Journals
{
    public class JournalViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public int Pages { get; set; }
        public string Periodicity { get; set; }
        public string Theme { get; set; }
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


        public JournalViewModel(JournalViewModel journal)
        {
            Id = journal.Id;
            Title = journal.Title;
            Theme = journal.Theme;
            Pages = journal.Pages;
            Periodicity = journal.Periodicity;
            Date = journal.Date;
            Amount = journal.Amount;
            Price = journal.Price;
            PhotoPath = journal.PhotoPath;
        }

        public JournalViewModel()
        {

        }
    }
}
