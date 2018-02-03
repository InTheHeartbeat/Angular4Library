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
                            Id = b.Id,
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
                            Id = b.Id,
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
                            Id = b.Id,
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

                    if (d.DocumentElement.Name == "ArrayOfBookModel")
                    {
                        return "Book";

                    }
                    if (d.DocumentElement.Name == "ArrayOfJournalModel")
                    {
                        return "Journal";

                    }
                    if (d.DocumentElement.Name == "ArrayOfNewspaperModel")
                    {
                        return "Newspaper";

                    }
                }
                catch (Exception e)
                {
                    throw;
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

                for (var i = 0; i + 8 < data.Length; i += 10)
                {
                    result.Add(new Book()
                    {
                        Id = int.Parse(data[i + 1]),
                        Title = data[i + 2],
                        Year = int.Parse(data[i + 3]),
                        Pages = int.Parse(data[i + 4]),
                        Author = data[i + 5],
                        Genre = data[i + 6],
                        Amount = int.Parse(data[i + 7]),
                        Price = double.Parse(data[i + 8]),                            
                        PhotoPath = data[i + 10]
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

                for (var i = 0; i + 8 < data.Length; i += 9)
                {
                    result.Add(new Journal()
                    {
                        Id = int.Parse(data[i + 1]),
                        Title = data[i + 2],
                        Theme = data[i + 3],
                        Periodicity = data[i + 4],
                        Date = data[i + 5],
                        Amount = int.Parse(data[i + 6]),
                        Price = double.Parse(data[i + 7]),                            
                        PhotoPath = data[i + 9]
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

                for (var i = 0; i + 8 < data.Length; i += 8)
                {
                    result.Add(new Newspaper()
                    {
                        Id = int.Parse(data[i + 1]),
                        Title = data[i + 2],
                        Periodicity = data[i + 3],
                        Date = data[i + 4],
                        Amount = int.Parse(data[i + 5]),
                        Price = double.Parse(data[i + 6]),                            
                        PhotoPath = data[i + 8]
                    });
                }
            }
            return result;
        }
    }
}
