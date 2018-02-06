using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Angular4Library.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Angular4Library.Helpers
{
    public class ImportHelper
    {
        public static ImportModel Import(Stream stream, bool isXml)
        {
            ImportModel result = new ImportModel();

            try
            {
                switch (GetType(stream, isXml))
                {
                    case "Book":
                        result.BookProducts = ImportBooks(stream, isXml).Select(b => new Book
                        {                            
                            Amount = b.Amount,                            
                            Pages = b.Pages,
                            Genre = b.Genre,
                            Author = b.Author,
                            Title = b.Title,
                            Year = b.Year,
                            Price = b.Price,                            
                            PhotoPath = b.PhotoPath
                        }).ToList();
                        break;
                    case "Journal":
                        result.JournalProducts = ImportJournals(stream, isXml).Select(b => new Journal()
                        {                            
                            Date = b.Date,
                            Amount = b.Amount,
                            Periodicity = b.Periodicity,
                            Theme = b.Theme,
                            Title = b.Title,
                            Price = b.Price,                            
                            PhotoPath = b.PhotoPath
                        })
                            .ToList();
                        break;
                    case "Newspaper":
                        result.NewspaperProducts = ImportNewspapers(stream, isXml).Select(b => new Newspaper()
                        {                            
                            Date = b.Date,
                            Amount = b.Amount,                            
                            Periodicity = b.Periodicity,
                            Title = b.Title,
                            Price = b.Price,                            
                            PhotoPath = b.PhotoPath
                        })
                            .ToList();
                        break;
                }
            }
            catch
            {                                
            }

            return result;
        }

        private static string GetType(Stream stream, bool isXml)
        {
            StreamReader streamReader = new StreamReader(stream);

            string data = streamReader.ReadToEnd().Replace("\r", "");
            if (isXml)
            {
                try
                {
                    XmlDocument d = new XmlDocument();
                    d.LoadXml(data);

                    if (d.DocumentElement.Name == "ArrayOfBook")
                    {
                        return "Book";

                    }
                    if (d.DocumentElement.Name == "ArrayOfJournal")
                    {
                        return "Journal";

                    }
                    if (d.DocumentElement.Name == "ArrayOfNewspaper")
                    {
                        return "Newspaper";

                    }
                }
                catch (Exception e)
                {                    
                }
            }

            if (!isXml)
            {
                data = data.Split('\n')[0];

                if (data == "Books")
                {
                    return "Book";
                }
                if (data == "Journals")
                {
                    return "Journal";
                }
                if (data == "Newspapers")
                {
                    return "Newspaper";
                }
            }
            return "";
        }

        private static List<Book> ImportBooks(Stream stream, bool isXml)
        {
            stream.Position = 0;
            stream.Seek(0, SeekOrigin.Begin);
            if (isXml)
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Book>));
                return (List<Book>)serializer.Deserialize(stream);
            }

            List<Book> result = new List<Book>();
            using (StreamReader streamReader = new StreamReader(stream))
            {
                string[] data = streamReader.ReadToEnd().Replace("\r", "").Split('\n');

                if (data[0] != "Books") { throw new Exception("Incorrect file"); }

                for (var i = 0; i+3 < data.Length; i += 8)
                {
                    result.Add(new Book()
                    {                        
                        Title = data[i + 1],
                        Year = int.Parse(data[i +2]),
                        Pages = int.Parse(data[i + 3]),
                        Author = data[i + 4],
                        Genre = data[i + 5],
                        Amount = int.Parse(data[i + 6]),
                        Price = double.Parse(data[i + 7]),                            
                        PhotoPath = data[i + 8]
                    });
                }
            }
            return result;
        }
        private static List<Journal> ImportJournals(Stream stream, bool isXml)
        {
            stream.Position = 0;
            stream.Seek(0, SeekOrigin.Begin);
            if (isXml)
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Journal>));
                return (List<Journal>)serializer.Deserialize(stream);
            }

            List<Journal> result = new List<Journal>();
            using (StreamReader streamReader = new StreamReader(stream))
            {
                string[] data = streamReader.ReadToEnd().Replace("\r", "").Split('\n');

                if (data[0] != "Journals") { throw new Exception("Incorrect file"); }

                for (var i = 0; i+3 < data.Length; i += 7)
                {
                    result.Add(new Journal()
                    {                        
                        Title = data[i + 1],
                        Theme = data[i + 2],
                        Periodicity = data[i + 3],
                        Date = data[i + 4],
                        Amount = int.Parse(data[i + 5]),
                        Price = double.Parse(data[i + 6]),                            
                        PhotoPath = data[i + 7]
                    });
                }
            }
            return result;
        }
        private static List<Newspaper> ImportNewspapers(Stream stream, bool isXml)
        {
            stream.Position = 0;
            stream.Seek(0, SeekOrigin.Begin);
            if (isXml)
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Newspaper>));
                return (List<Newspaper>)serializer.Deserialize(stream);
            }

            List<Newspaper> result = new List<Newspaper>();
            using (StreamReader streamReader = new StreamReader(stream))
            {
                string[] data = streamReader.ReadToEnd().Replace("\r", "").Split('\n');

                if (data[0] != "Newspapers") { throw new Exception("Incorrect file"); }

                for (var i = 0; i+3 < data.Length; i += 6)
                {
                    result.Add(new Newspaper()
                    {                        
                        Title = data[i + 1],
                        Periodicity = data[i + 2],
                        Date = data[i + 3],
                        Amount = int.Parse(data[i + 4]),
                        Price = double.Parse(data[i + 5]),                            
                        PhotoPath = data[i + 6]
                    });
                }
            }
            return result;
        }
    }
}
