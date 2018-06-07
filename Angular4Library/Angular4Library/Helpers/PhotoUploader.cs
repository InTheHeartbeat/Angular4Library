using System;
using System.IO;
using System.Threading.Tasks;
using Angular4Library.ViewModels.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Angular4Library.Helpers
{
    public class PhotoUploader
    {
        public static async Task<ImageViewModel> UploadPhoto(HttpRequest request, IHostingEnvironment hostingEnvironment)
        {
            var file = request.Form.Files[0];
            string relPath = "/Upload/Images/";
            string root = hostingEnvironment.ContentRootPath + relPath;
            string customFileName = Guid.NewGuid().ToString() + new FileInfo(file.FileName).Extension;


            using (Stream stream = file.OpenReadStream())
            {
                using (var binaryReader = new BinaryReader(stream))
                {
                    byte[] fileContent = binaryReader.ReadBytes((int) file.Length);

                    using (FileStream fs = new FileStream(root + customFileName, FileMode.Create))
                    {
                        await fs.WriteAsync(fileContent, 0, fileContent.Length);
                    }
                }
            }

            return new ImageViewModel() {Path = relPath + customFileName};
        }
    }
}
