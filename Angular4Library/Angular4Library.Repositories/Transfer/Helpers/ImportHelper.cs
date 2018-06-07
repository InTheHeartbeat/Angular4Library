using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Serialization;
using Angular4Library.Data.Entities.Products;
using Angular4Library.Data.Models.DataTransfer;
using Angular4Library.Data.Models.Products;
using Angular4Library.Data.Transfer.Enums;

namespace Angular4Library.Data.Transfer.Helpers
{
    public class ImportHelper
    {

        public const int BookFieldsCount = 7;
        public const int JournalFieldsCount = 7;
        public const int NewspaperFieldsCount = 6;
        public const int NoImportableFieldsCount = 3;

        public static ImportModel Import(Stream stream, bool isXml)
        {
            var result = new ImportModel();
            try
            {
                string type = GetType(stream, isXml);
                if (type == "Book")
                {
                    result.BookProducts = ImportBooks(stream, isXml).Select(b => new ExtendedBook
                    {
                        Amount = b.Amount,
                        Pages = b.Pages,
                        Genre = b.Genre,                        
                        Title = b.Title,
                        Year = b.Year,
                        Price = b.Price,
                        PhotoPath = b.PhotoPath,
                        Authors = b.Authors                   
                    }).ToList();
                }
                if (type == "Journal")
                {
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
                }
                if (type == "Newspaper")
                {
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
                }                
            }
            catch { }

            return result;
        }

        private static string GetType(Stream stream, bool isXml)
        {
            var streamReader = new StreamReader(stream);

            string data = streamReader.ReadToEnd().Replace("\r", "");
            if (isXml)
            {
                try
                {
                    var xmlDocument = new XmlDocument();
                    xmlDocument.LoadXml(data);

                    if (xmlDocument.DocumentElement.Name == "ArrayOfBook")
                    {
                        return "Book";

                    }
                    if (xmlDocument.DocumentElement.Name == "ArrayOfJournal")
                    {
                        return "Journal";

                    }
                    if (xmlDocument.DocumentElement.Name == "ArrayOfNewspaper")
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
                data = data.Split('\n').First();

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
            return String.Empty;
        }

        private static List<ExtendedBook> ImportBooks(Stream stream, bool isXml)
        {
            stream.Position = 0;
            stream.Seek(0, SeekOrigin.Begin);
            if (isXml)
            {
                var serializer = new XmlSerializer(typeof(List<ExtendedBook>));
                return (List<ExtendedBook>)serializer.Deserialize(stream);
            }

            var result = new List<ExtendedBook>();
            using (var streamReader = new StreamReader(stream))
            {
                string[] data = streamReader.ReadToEnd().Replace("\r", "").Split('\n');

                if (data[0] != "Books") { throw new Exception("Incorrect file"); }

                for (var i = 0; i + NoImportableFieldsCount < data.Length; i += BookFieldsCount)
                {
                    result.Add(new ExtendedBook()
                    {                        
                        Title = data[i + (int)BookFieldsOffset.Title],
                        Year = int.Parse(data[i + (int)BookFieldsOffset.Year]),
                        Pages = int.Parse(data[i + (int)BookFieldsOffset.Pages]),                        
                        Genre = data[i + (int)BookFieldsOffset.Genre],
                        Amount = int.Parse(data[i + (int)BookFieldsOffset.Amount]),
                        Price = double.Parse(data[i + (int)BookFieldsOffset.Price]),                            
                        PhotoPath = data[i + (int)BookFieldsOffset.PhotoPath]
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
                var serializer = new XmlSerializer(typeof(List<Journal>));
                return (List<Journal>)serializer.Deserialize(stream);
            }

            var result = new List<Journal>();
            using (var streamReader = new StreamReader(stream))
            {
                string[] data = streamReader.ReadToEnd().Replace("\r", "").Split('\n');

                if (data[0] != "Journals") { throw new Exception("Incorrect file"); }

                for (var i = 0; i+NoImportableFieldsCount < data.Length; i += JournalFieldsCount)
                {
                    result.Add(new Journal()
                    {                        
                        Title = data[i + (int)JournalFieldsOffset.Title],
                        Theme = data[i + (int)JournalFieldsOffset.Theme],
                        Periodicity = data[i + (int)JournalFieldsOffset.Periodicity],
                        Date = data[i + (int)JournalFieldsOffset.Date],
                        Amount = int.Parse(data[i + (int)JournalFieldsOffset.Amount]),
                        Price = double.Parse(data[i + (int)JournalFieldsOffset.Price]),                            
                        PhotoPath = data[i + (int)JournalFieldsOffset.PhotoPath]
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
                var serializer = new XmlSerializer(typeof(List<Newspaper>));
                return (List<Newspaper>)serializer.Deserialize(stream);
            }

            var result = new List<Newspaper>();
            using (var streamReader = new StreamReader(stream))
            {
                string[] data = streamReader.ReadToEnd().Replace("\r", "").Split('\n');

                if (data[0] != "Newspapers") { throw new Exception("Incorrect file"); }

                for (var i = 0; i+NoImportableFieldsCount < data.Length; i += NewspaperFieldsCount)
                {
                    result.Add(new Newspaper()
                    {                        
                        Title = data[i + (int)NewspaperFieldsOffset.Title],
                        Periodicity = data[i + (int)NewspaperFieldsOffset.Periodicity],
                        Date = data[i + (int)NewspaperFieldsOffset.Date],
                        Amount = int.Parse(data[i + (int)NewspaperFieldsOffset.Amount]),
                        Price = double.Parse(data[i + (int)NewspaperFieldsOffset.Price]),                            
                        PhotoPath = data[i + (int)NewspaperFieldsOffset.PhotoPath]
                    });
                }
            }
            return result;
        }
    }
}
