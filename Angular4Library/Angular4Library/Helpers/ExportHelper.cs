using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Angular4Library.Data.Models;
using Angular4Library.Data.Models.Products;
using Angular4Library.Data.Providers;
using Angular4Library.Models;

namespace Angular4Library.Helpers
{
    public class ExportHelper
    {        
        public static byte[] ExportBooks(ExportViewModel viewModel, RepositoryProvider repositoryProvider)
        {
            var stream = new MemoryStream();
            if (viewModel.IsXml)
            {
                var serializer = new XmlSerializer(typeof(List<Book>));                
                serializer.Serialize(stream, viewModel.IdsArray.Select(id => repositoryProvider.BooksRepository.GetProductById(id)).ToList());                
            }
            
            if(!viewModel.IsXml)
            {                
                var writer = new StreamWriter(stream);
                writer.WriteLine("Books");

                foreach (Book book in viewModel.IdsArray.Select(id => repositoryProvider.BooksRepository.GetProductById(id)))
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
        public static byte[] ExportJournals(ExportViewModel viewModel, RepositoryProvider repositoryProvider)
        {
            var stream = new MemoryStream();

            if(viewModel.IsXml)
            {
                var serializer = new XmlSerializer(typeof(List<Journal>));                
                serializer.Serialize(stream, viewModel.IdsArray
                    .Select(id => repositoryProvider.JournalsRepository.GetProductById(id)).ToList());                                    
            }
            if(!viewModel.IsXml)
            {                
                var writer = new StreamWriter(stream);
                writer.WriteLine("Journals");

                foreach (Journal journal in viewModel.IdsArray
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
        public static byte[] ExportNewspapers(ExportViewModel viewModel, RepositoryProvider repositoryProvider)
        {
            var stream = new MemoryStream();
            if (viewModel.IsXml)
            {
                var serializer = new XmlSerializer(typeof(List<Newspaper>));                
                serializer.Serialize(stream, viewModel.IdsArray
                    .Select(
                        id => repositoryProvider.NewspapersRepository.GetProductById(id)).ToList());                
            }

            if (!viewModel.IsXml)
            {                
                var writer = new StreamWriter(stream);
                writer.WriteLine("Newspapers");

                foreach (Newspaper newspaper in viewModel.IdsArray
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
