using System;

namespace Angular4Library.Models.Data
{
    public class BookViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public int Pages { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
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

        public BookViewModel()
        {

        }

        public BookViewModel(BookViewModel book)
        {
            Id = book.Id;
            Title = book.Title;
            Year = book.Year;
            Pages = book.Pages;
            Author = book.Author;
            Genre = book.Genre;
            Amount = book.Amount;
            Price = book.Price;
            PhotoPath = book.PhotoPath;
        }
    }
}
