using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Threading;

namespace MyRequest
{
    class Program
    {
		static async void UploadFile(String serverAddress,String filePath,String[] paramsName,String[] paramsValue){
			using (var formData = new MultipartFormDataContent()){
				formData.Headers.ContentType.MediaType = "multipart/form-data";
				var filestream = new FileStream(filePath, FileMode.Open);
				Stream fileStream = System.IO.File.OpenRead(filePath);
				var fileName = System.IO.Path.GetFileName(filePath);
				
				formData.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
				{
					FileName = fileName
				};
				
				for(int i = 0;i<paramsName.Length;i++){
					var stringContent = new StringContent(paramsValue[i]);
					stringContent.Headers.Add("Content-Disposition", "form-data; name=\"" + paramsName[i] + "\"");
					formData.Add(stringContent, paramsName[i]);
				}
				
				formData.Add(new StreamContent(fileStream), "file", filename);
				
				using (var client = new HttpClient()){
					client.DefaultRequestHeaders.Add("Authorization", "Token" + _bearerToken);
					
					var response = await client.PostAsync(serverAddress, formData).Result;
					return response.ToString();
					
					var message = await client.PostAsync(serverAddress, formData);
					result = await message.Content.ReadAsStringAsync();
					return result;
				}
			}
		}
    }
}