---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - plaintext: RAW
  - shell: CURL
  - python: PYTHON
  - java: JAVA
  - php: PHP
  - csharp: C#

includes:
  - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the الفبا API
---

# الفبا

نویسه خوان الفبا تصویر اسناد فارسی، انگلیسی و عربی را میخواند و در قالب متن مرتب ارائه می دهد.

برای دسترسی به واسط برنامه نویس الفبا نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس alefba@roshan-ai.ir بنویسید.

# نمونه

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true
} \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/read_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/read_document/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/read_document/";
  $content = json_encode(
      '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/read_document/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```

```json
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "pages": [
        {
            "page_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
            "width": 2125,
            "height": 2750,
            "text": "بوته\n\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
            "parts": [
                {
                    "type": "text",
                    "direction": "rtl",
                    "box": "209 305 1711 449",
                    "text": "درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
                    "lines": [
                        {
                            "probability": 1,
                            "box": "211 305 1707 57",
                            "text": "درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها"
                        }
                    ]
                }
            ]
        },
        {
            "page_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=2",
            "width": 2125,
            "height": 2750,
            "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
            "parts": [
                {
                    "type": "text",
                    "direction": "rtl",
                    "box": "210 110 1714 294",
                    "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
                    "lines": [
                        {
                            "probability": 1,
                            "box": "210 110 1706 58",
                            "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین"
                        }
                    ]
                }
            ]
        }
    ]
}
```

این تابع، یک سند را دریافت می‌کند و متن صفحات آن را در قالب JSON باز می‌گرداند. خروجی نویسه‌خوان شامل بخش‌های نوشته (پاراگراف)، جدول و تصویر است. مکان و ابعاد هر بخش در خروجی مشخص شده است و اطلاعات کامل خطوط متن در بخش نوشته ظاهر می‌شود. برای هر خط متن، ویژگی احتمال صحت هم قرار داده شده که نشان می‌دهد ابزار نویسه‌خوان چقدر از نتیجه تحلیل، مطمئن است.


`POST /api/read_document/`


Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY



Key | Value | TypeAttributes | Description
--- | ----- | -------------- | -----------
document_url | URL | required | آدرس سند ورودی
type | ["general"] |  | این ویژگی نوع سند را مشخص می‌کند
fix_orientation | true |  | در صورت فعال بودن این ویژگی، الفبا سعی می‌کند چرخش ۹۰، ۱۸۰ و یا ۲۷۰ درجه تصویر را اصلاح کند
word_positions | true |  | در صورت فعال بودن این ویژگی اطلاعات مکانی واژه‌ها در خروجی قرار می‌گیرد
wait | true |  | اگر این ویژگی فعال باشد، کاربر منتظر می‌ماند تا نتیجه تحلیل آماده شود؛ در غیر این صورت، تقاضای تحلیل دریافت می‌شود و کاربر با استفاده از واسط «وضعیت سند» از میزان پیشرفت تحلیل مطلع می‌شود. به این ترتیب پس از پایان پردازش، تقاضای جدیدی برای پردازش سند ارسال می‌شود و این بار تقاضا با نتیجه مناسب پاسخ داده می‌شود.

# نمونه

```plaintext
{
    document: "DOCUMENT DATA"
}
```

```shell
curl -X POST --header "Authorization: Token TOKEN_KEY" -F "document=@example.pdf" http://alefba.roshan-ai.ir/api/read_document
```

```python
import requests

headers = {'Authorization': 'Token TOKEN_KEY',}
files = {'document': ('FILE NAME', open('YOUR FILE PATH', 'rb')),}
response = requests.post('https://alefba.roshan-ai.ir/api/read_document/', headers=headers, files=files)
print(response)
```

```java
import java.io.*;
import java.net.*;
import java.nio.file.Files;

public class MultiPartRequest {
  public static void main(String[] args) throws IOException {

    String url = "https://alefba.roshan-ai.ir/api/read_document/";
    File textFile = new File("YOUR FILE PATH");
    String boundary = Long.toHexString(System.currentTimeMillis());
    String CRLF = "\r\n";

    URLConnection connection = new URL(url).openConnection();
    connection.setDoOutput(true);
    connection.setRequestProperty("accept", "*/*");
    connection.setRequestProperty("Connection", "close");
    connection.setRequestProperty("Authorization", "Token TOKEN_KEY");
    connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

    try (
        OutputStream output = connection.getOutputStream();
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(output), true);
    ) {
      writer.append("--").append(boundary).append(CRLF);
      writer.append("Content-Disposition: form-data; name=\"document\"; filename=\"").append(textFile.getName()).append("\"").append(CRLF);
      writer.append("Content-Type: application/pdf").append(CRLF);
      writer.append(CRLF).flush();
      Files.copy(textFile.toPath(), output);
      output.flush();
      writer.append(CRLF).flush();
      writer.append("--").append(boundary).append("--").append(CRLF).flush();
    }


    BufferedReader inputStream = new BufferedReader(new InputStreamReader((InputStream) connection.getContent()));
    String inputLine;
    while ((inputLine = inputStream.readLine()) != null){
      System.out.println(inputLine);
    }
    inputStream.close();
  }
}
```

```php
$fields = array("f1"=>"value1", "another_field2"=>"anothervalue");

$filenames = array("FILE_PATH_1", "FILE_PATH_2");

$files = array();
foreach ($filenames as $f){
   $files[$f] = file_get_contents($f);
}

$url = "https://alefba.roshan-ai.ir/api/read_document/";

$curl = curl_init();

$url_data = http_build_query($data);

$boundary = uniqid();
$delimiter = '-------------' . $boundary;

$post_data = build_data_files($boundary, $fields, $files);

curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => 1,
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POST => 1,
  CURLOPT_POSTFIELDS => $post_data,
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer $TOKEN",
    "Content-Type: multipart/form-data; boundary=" . $delimiter,
  ),
));

$response = curl_exec($curl);

$info = curl_getinfo($curl);
var_dump($response);
$err = curl_error($curl);
echo "error";
var_dump($err);
curl_close($curl);

function build_data_files($boundary, $fields, $files){
    $data = '';
    $eol = "\r\n";
    $delimiter = '-------------' . $boundary;
    foreach ($fields as $name => $content) {
        $data .= "--" . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $name . "\"".$eol.$eol
            . $content . $eol;
    }
    foreach ($files as $name => $content) {
        $data .= "--" . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $name . '"; filename="' . $name . '"' . $eol
            . 'Content-Type: image/png'.$eol
            . 'Content-Transfer-Encoding: binary'.$eol
            ;
        $data .= $eol;
        $data .= $content . $eol;
    }
    $data .= "--" . $delimiter . "--".$eol;
    return $data;
}
```

```csharp
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
```

```json
{
    "pages": [
        {
            "page_url": "http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf@page=1",
            "width": 2125,
            "height": 2750,
            "text": "بوته\n\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
            "parts": [
                {
                "type": "text",
                "direction": "rtl",
                "box": "209 305 1711 449",
                "text": "درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
                "lines": [
                    {
                    "probability": 1.0,
                    "box": "211 305 1707 57",
                    "text": "درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها"
                    },
                    ...
                ]
                },
                ...
            ]
        },{
            "page_url":"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf@page=2",
            "width": 2125,
            "height": 2750,
            "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
            "parts": [
                {
                "type": "text",
                "direction": "rtl",
                "box": "210 110 1714 294",
                "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
                "lines": [
                    {
                    "probability": 1.0,
                    "box": "210 110 1706 58",
                    "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین"
                    },
                    ...
                ],
                },
                ...
            ]
        }],
    "document_url":"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf"
}
```

این تابع، یک سند را دریافت می‌کند و متن صفحات آن را در قالب JSON باز می‌گرداند. خروجی نویسه‌خوان شامل بخش‌های نوشته (پاراگراف)، جدول و تصویر است. مکان و ابعاد هر بخش در خروجی مشخص شده است و اطلاعات کامل خطوط متن در بخش نوشته ظاهر می‌شود. برای هر خط متن، ویژگی احتمال صحت هم قرار داده شده که نشان می‌دهد ابزار نویسه‌خوان چقدر از نتیجه تحلیل، مطمئن است.


`POST /api/read_document/`


Content-Type | Authorization
------------ | -------------
multipart/form-data | Token TOKEN_KEY



Key | Value | TypeAttributes | Description
--- | ----- | -------------- | -----------
document | binary | required | فایل سند ورودی


# نمونه


```plaintext
{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true
} \
      https://alefba.roshan-ai.ir/api/read_pages/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/read_pages/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/read_pages/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/read_pages/";
  $content = json_encode(
      '{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/read_pages/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```


```json
[
    {
        "page_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
        "width": 2125,
        "height": 2750,
        "text": "بوته\n\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
        "parts": [
            {
                "type": "text",
                "direction": "rtl",
                "box": "209 305 1711 449",
                "text": "درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
                "lines": [
                    {
                        "probability": 1,
                        "box": "211 305 1707 57",
                        "text": "درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها"
                    }
                ]
            }
        ]
    }
]
```

این تابع، تصویر نوشته را دریافت می‌کند و متن آن را در قالب JSON باز می‌گرداند. خروجی نویسه‌خوان شامل بخش‌های نوشته (پاراگراف)، جدول و تصویر است. مکان و ابعاد هر بخش در خروجی مشخص شده است و اطلاعات کامل خطوط متن در بخش نوشته ظاهر می‌شود. برای هر خط متن، ویژگی احتمال صحت هم قرار داده شده که نشان می‌دهد ابزار نویسه‌خوان چقدر از نتیجه تحلیل، مطمئن است.


`POST /api/read_pages/`

Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY



Key | Value | TypeAttributes | Description
--- | ----- | -------------- | -----------
page_urls | ["URL1","URL2","..."] | required | آدرس صفحات ورودی
type | ["general"] |  | این ویژگی نوع سند را مشخص می‌کند
fix_orientation | true |  | در صورت فعال بودن این ویژگی، الفبا سعی می‌کند چرخش ۹۰، ۱۸۰ و یا ۲۷۰ درجه تصویر را اصلاح کند
word_positions | true |  | در صورت فعال بودن این ویژگی اطلاعات مکانی واژه‌ها در خروجی قرار می‌گیرد
wait | true |  | اگر این ویژگی فعال باشد، کاربر منتظر می‌ماند تا نتیجه تحلیل آماده شود؛ در غیر این صورت، تقاضای تحلیل دریافت می‌شود و کاربر با استفاده از واسط «وضعیت سند» از میزان پیشرفت تحلیل مطلع می‌شود. به این ترتیب پس از پایان پردازش، تقاضای جدیدی برای پردازش سند ارسال می‌شود و این بار تقاضا با نتیجه مناسب پاسخ داده می‌شود.

# نمونه


```plaintext
{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
} \
      https://alefba.roshan-ai.ir/api/document_status/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/document_status/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/document_status/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/document_status/";
  $content = json_encode(
      '{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/document_status/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```


```json
{
    "http://bayanbox.ir/view/5067853395275628881/boute.pdf": {
        "analyzed": true,
        "processed_pages": 2,
        "all_pages": 2
    }
}
```

این تابع برای هر کدام از سندهای ورودی مشخص می‌کند که چه تعداد از صفحات آنها تحلیل شده است.

`POST /api/document_status/`


Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY

# نمونه


```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
} \
      https://alefba.roshan-ai.ir/api/document_pages/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/document_pages/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/document_pages/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/document_pages/";
  $content = json_encode(
      '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/document_pages/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```


```json
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "pages": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=2"
    ]
}
```

نویسه‌خوان برای تحلیل سند، ابتدا باید آن را صفحه‌صفحه کند. این تابع، فایل سند را در قالب PDF دریافت می‌کند و صفحات آن را به عنوان نتیجه باز می‌گرداند. بعد از این مرحله، تابع «خواندن صفحه» می‌تواند هر کدام از صفحه‌های سند را تحلیل کند.


`POST /api/document_pages/`



Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY

# نمونه


```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
} \
      https://alefba.roshan-ai.ir/api/download_word/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/download_word/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/download_word/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/download_word/";
  $content = json_encode(
      '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/download_word/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```


با استفاده از این تابع می‌توانید نتیجه صفحات پردازش شده را در قالب فایل Microsoft Word دریافت نمایید. در فایل خروجی، قالب سند حفظ شده است و اجزای متن شامل خطوط، پاراگراف‌ها و خانه‌های جدول در جای خود قرار گرفته‌اند.

`POST /api/download_word/`


Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY



Content-Type | Content-Disposition
------------ | -------------------
application/msword | attachment; filename=Alefba.docx

# نمونه


```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
} \
      https://alefba.roshan-ai.ir/api/download_excel/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/download_excel/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/download_excel/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/download_excel/";
  $content = json_encode(
      '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/download_excel/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```

با استفاده از این تابع می‌توانید نتیجه صفحات پردازش شده را در قالب فایل Microsoft Excel دریافت نمایید. دقت کنید که برای استفاده از این خروجی لازم است در هنگام خواندن سند، ویژگی <code>type</code> را برابر مقدار <code>excel</code> قرار دهید.

`POST /api/download_excel/`

Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY



Content-Type | Content-Disposition
------------ | -------------------
application/msword | attachment; filename=Alefba.xlsx

# نمونه


```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png"
} \
      https://alefba.roshan-ai.ir/api/download_pdf/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/download_pdf/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/download_pdf/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png"
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/download_pdf/";
  $content = json_encode(
      '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png"
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/download_pdf/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png"
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```

با استفاده از این تابع می‌توانید نتیجه صفحات پردازش شده را در قالب فایل PDF دریافت نمایید. فایل خروجی، تصاویر صفحات سند ورودی را به همراه نتیجه پردازش آنها نشان می‌دهد. به این ترتیب با جستجوی یک عبارت در این فایل، واژه‌های مورد جستجو در تصویر مشخص و رنگی می‌شوند.

`POST /api/download_pdf/`

Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY



Content-Type | Content-Disposition
------------ | -------------------
application/pdf | attachment; filename=Alefba.pdf

# نمونه

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
} \
      https://alefba.roshan-ai.ir/api/delete_document/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/delete_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

```java
import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/delete_document/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
```

```php
<?php

  $url = "https://alefba.roshan-ai.ir/api/delete_document/";
  $content = json_encode(
      '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              );
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

  $json_response = curl_exec($curl);

  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

  if ( $status != 200 ) {
      die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
  }


  curl_close($curl);

  $response = json_decode($json_response, true);
?>
```

```csharp
using System;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace MyRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://alefba.roshan-ai.ir/api/delete_document/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                Console.WriteLine(result);
            }
        }
    }
}
```


```json
{
    "message": "Document deleted successfully."
}
```

با استفاده از این تابع می‌توانید سند ثبت شده در سامانه را به طور کامل حذف کنید.

`POST /api/delete_document/`


Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY
-