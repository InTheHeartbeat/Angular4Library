using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;
using Angular4Library.Data.Models.DataTransfer;
using Angular4Library.Data.Models.Products;
using Angular4Library.Data.Providers;

namespace Angular4Library.Data.Transfer.Helpers
{
    public class ExportHelper
    {        
        public static byte[] ExportBooks(ExportModel model, RepositoryProvider repositoryProvider)
        {
            var stream = new MemoryStream();
            if (model.IsXml)
            {
                var serializer = new XmlSerializer(typeof(List<Book>));                
                serializer.Serialize(stream, model.IdsArray.Select(id => repositoryProvider.BooksRepository.GetProductById(id)).ToList());                
            }
            
            if(!model.IsXml)
            {                
                var writer = new StreamWriter(stream);
                writer.WriteLine("Books");

                foreach (Book book in model.IdsArray.Select(id => repositoryProvider.BooksRepository.GetProductById(id)))
                {                   
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
            }
            return stream.ToArray();
        }        
        public static byte[] ExportJournals(ExportModel model, RepositoryProvider repositoryProvider)
        {
            var stream = new MemoryStream();

            if(model.IsXml)
            {
                var serializer = new XmlSerializer(typeof(List<Journal>));                
                serializer.Serialize(stream, model.IdsArray
                    .Select(id => repositoryProvider.JournalsRepository.GetProductById(id)).ToList());                                    
            }
            if(!model.IsXml)
            {                
                var writer = new StreamWriter(stream);
                writer.WriteLine("Journals");

                foreach (Journal journal in model.IdsArray
                    .Select(id => repositoryProvider.JournalsRepository.GetProductById(id)))
                {                    
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
            }
            return stream.ToArray();
        }
        public static byte[] ExportNewspapers(ExportModel model, RepositoryProvider repositoryProvider)
        {
            var stream = new MemoryStream();
            if (model.IsXml)
            {
                var serializer = new XmlSerializer(typeof(List<Newspaper>));                
                serializer.Serialize(stream, model.IdsArray
                    .Select(
                        id => repositoryProvider.NewspapersRepository.GetProductById(id)).ToList());                
            }

            if (!model.IsXml)
            {                
                var writer = new StreamWriter(stream);
                writer.WriteLine("Newspapers");

                foreach (Newspaper newspaper in model.IdsArray
                    .Select(id => repositoryProvider.NewspapersRepository.GetProductById(id)))
                {                    
                    writer.WriteLine(newspaper.Title);
                    writer.WriteLine(newspaper.Periodicity);
                    writer.WriteLine(newspaper.Date);
                    writer.WriteLine(newspaper.Amount);
                    writer.WriteLine(newspaper.Price);                   
                    writer.WriteLine(newspaper.PhotoPath);
                }
                writer.Flush();
                stream.Seek(0, SeekOrigin.Begin);                
            }
            return stream.ToArray();
        }
    }
}
