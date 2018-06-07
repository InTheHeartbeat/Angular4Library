using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Angular4Library.Extensions
{
    public static class StringExtensions
    {
        public static string MD5(this string arg)
        {
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(arg);
            byte[] hash = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("x2"));
            }

            return sb.ToString();
        }

        public static bool IsValidIPAddress(this string arg)
        {
            IPAddress stub;
            bool result = IPAddress.TryParse(arg, out stub);
            stub = null;

            return result;                        
        }
    }
}