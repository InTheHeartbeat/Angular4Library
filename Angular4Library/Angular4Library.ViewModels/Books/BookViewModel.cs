using System;
using System.Collections.Generic;
using Angular4Library.ViewModels.Author;

namespace Angular4Library.ViewModels.Books
{
    public class BookViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public int Pages { get; set; }
        public List<AuthorViewModel> Authors { get; set; }
        public string Genre { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }

        public string PhotoPath
        {
            get
            {
                if (String.IsNullOrEmpty(_photoPath))
                {
                    return "../Upload/Images/no-photo-e.png";
                }
                return _photoPath;
            }
            set => _photoPath = value;
        }

        private string _photoPath;        

        public BookViewModel(BookViewModel book)
        {
            Id = book.Id;
            Title = book.Title;
            Year = book.Year;
            Pages = book.Pages;
            Authors = book.Authors;            
            Amount = book.Amount;
            Price = book.Price;
            PhotoPath = book.PhotoPath;
        }

        public BookViewModel()
        {
        }
    }
}
