using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Angular4Library.Data;
using Angular4Library.Data.Models;

namespace Angular4Library.Helpers
{
    public class ExportHelper
    {
        public static byte[] ExportBooks(ExportModel model, LibraryContext context)
        {
            if (model.IsXml)
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Book>));
                MemoryStream stream = new MemoryStream();
                serializer.Serialize(stream, model.IdsArray
                    .Select(id => context.Books.FindOne(book => book.Id == id)).ToList());
                return stream.ToArray();
            }
            else
            {
                MemoryStream stream = new MemoryStream();
                StreamWriter writer = new StreamWriter(stream);

                writer.WriteLine("Books");

                foreach (Book book in model.IdsArray.Select(id => context.Books.FindOne(bk=>bk.Id==id)))
                {
                    writer.WriteLine(book.Id);
                    writer.WriteLine(book.Title);
                    writer.WriteLine(book.Year);
                    writer.WriteLine(book.Pages);
                    writer.WriteLine(book.Author);
                    writer.WriteLine(book.Genre);
                    writer.WriteLine(book.Amount);
                    writer.WriteLine(book.Price);                    
                    writer.WriteLine(book.PhotoPath);
                }
                writer.Flush();
                stream.Seek(0, SeekOrigin.Begin);
                return stream.ToArray();
            }
        }        
        public static byte[] ExportJournals(ExportModel model, LibraryContext dataContext)
        {
            if (model.IsXml)
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Journal>));
                MemoryStream stream = new MemoryStream();
                serializer.Serialize(stream, model.IdsArray
                    .Select(id => dataContext.Journals.FindOne(journal => journal.Id == id)).ToList());                    
                return stream.ToArray();
            }
            else
            {
                MemoryStream stream = new MemoryStream();
                StreamWriter writer = new StreamWriter(stream);

                writer.WriteLine("Journals");

                foreach (Journal journal in model.IdsArray
                    .Select(id => dataContext.Journals.FindOne(journal => journal.Id == id)))
                {
                    writer.WriteLine(journal.Id);
                    writer.WriteLine(journal.Title);
                    writer.WriteLine(journal.Theme);
                    writer.WriteLine(journal.Periodicity);
                    writer.WriteLine(journal.Date);
                    writer.WriteLine(journal.Amount);
                    writer.WriteLine(journal.Price);                    
                    writer.WriteLine(journal.PhotoPath);
                }
                writer.Flush();
                stream.Seek(0, SeekOrigin.Begin);
                return stream.ToArray();
            }
        }
        public static byte[] ExportNewspapers(ExportModel model, LibraryContext dataContext)
        {
            if (model.IsXml)
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Newspaper>));
                MemoryStream stream = new MemoryStream();
                serializer.Serialize(stream, model.IdsArray
                    .Select(
                        id => dataContext.Newspapers.FindOne(newspaper => newspaper.Id == id)).ToList());
                return stream.ToArray();
            }
            else
            {
                MemoryStream stream = new MemoryStream();
                StreamWriter writer = new StreamWriter(stream);

                writer.WriteLine("Newspapers");

                foreach (Newspaper newspaper in model.IdsArray
                    .Select(id => dataContext.Newspapers.FindOne(newspaper => newspaper.Id == id)))
                {
                    writer.WriteLine(newspaper.Id);
                    writer.WriteLine(newspaper.Title);
                    writer.WriteLine(newspaper.Periodicity);
                    writer.WriteLine(newspaper.Date);
                    writer.WriteLine(newspaper.Amount);
                    writer.WriteLine(newspaper.Price);                   
                    writer.WriteLine(newspaper.PhotoPath);
                }
                writer.Flush();
                stream.Seek(0, SeekOrigin.Begin);
                return stream.ToArray();
            }
        }
    }
}
