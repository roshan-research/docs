---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell: CURL
  - java: JAVA
  - plaintext: RAW
  - python: PYTHON
  - php: PHP
  - csharp: C#

includes:
  - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the حرف API
---

# حرف

حرف، یک ای‌پی‌آیِ تبدیل گفتار به نوشتار فارسی است که می‌تواند صدای ورودی را اعم از صوت یا ویدیو یا پخش زنده به متن تبدیل کند. حرف با شنیدن هزاران ساعت گفتارِ فارسی در انواع و اقسام لحن‌ها، رده‌های سنی و جنسیت‌های مختلف، به‌خوبی تعلیم دیده است و با دقت بالایی این کار را انجام می‌دهد.

برای دسترسی به این ای‌پی‌آی، به یک <code>TOKEN_KEY</code> نیاز دارید که می‌توانید از طریق ایمیلِ harf@roshan-ai.ir درخواست دهید.

# تبدیل صدا به متن به‌شکل همگام

این تابع، فایل‌های صوتی یا ویدیویی را دریافت می‌کند و متن هر فایل را به‌شکل JSON تحویل می‌دهد. در خروجی، آدرس هر فایل (<code>media_url</code>) به‌همراه مدت‌زمان فایل (<code>duration</code>) و سگمنت‌ها (<code>segments</code>) بازگردانده می‌شود. هر سگمنت، بازهٔ زمانی کوتاهی شامل سه پارامتر <code>start</code> و <code>end</code> و <code>text</code> است که به‌ترتیب بیانگر شروع بازه، پایان بازه و متن بازه است.


## مثال: ارسال لینک فایل

> Request

```plaintext
{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ]
} \
      http://harf.roshan-ai.ir/api/transcribe_files/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://harf.roshan-ai.ir/api/transcribe_files/', data=values, headers=headers)

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
            URL url = new URL("http://harf.roshan-ai.ir/api/transcribe_files/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
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

  $url = "http://harf.roshan-ai.ir/api/transcribe_files/";
  $content = json_encode(
      '{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://harf.roshan-ai.ir/api/transcribe_files/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
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

> Response 

```json
[
  {
    "media_url": "https://i.ganjoor.net/a2/41417.mp3",
    "duration": "0:00:44",
    "segments": [
      {
        "start": "0:00:00",
        "end": "0:00:02",
        "text": "حکایت"
      },
      {
        "start": "0:00:02",
        "end": "0:00:06",
        "text": "یکی را از حکما شنیدم که می گفت"
      },
      {
        "start": "0:00:06",
        "end": "0:00:11",
        "text": "هرگز کسی به جهل خویش اقرار نکرده است"
      },
      {
        "start": "0:00:11",
        "end": "0:00:16",
        "text": "مگر آن کس که چون دیگری در سخن باشد"
      },
      {
        "start": "0:00:16",
        "end": "0:00:21",
        "text": "همچنان ناتمام گفته سخن آغاز کند"
      },
      ...
    ]
  }
]

```

`POST /api/transcribe_files/`

<dl>
<strong>media_urls(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    List of URLs
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لینک فایل‌های ورودی (صدا یا ویدیو)</p>
<br><br>
## مثال: ارسال مستقیم فایل

> Request

```plaintext
"--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"
```

```shell
curl -X
      POST --header "Authorization: Token TOKEN_KEY"
      -F "document=@example.pdf"
      http://alefba.roshan-ai.ir/api/read_document
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

> Response 

```json
[
  {
    "media_url": "http://harf.roshan-ai.ir/media/files/96/84/859267728361.mp3",
    "duration": "0:00:44",
    "segments": [
      {
        "start": "0:00:00",
        "end": "0:00:02",
        "text": "حکایت"
      },
      {
        "start": "0:00:02",
        "end": "0:00:06",
        "text": "یکی را از حکما شنیدم که می گفت"
      },
      {
        "start": "0:00:06",
        "end": "0:00:11",
        "text": "هرگز کسی به جهل خویش اقرار نکرده است"
      },
      {
        "start": "0:00:11",
        "end": "0:00:16",
        "text": "مگر آن کس که چون دیگری در سخن باشد"
      },
      {
        "start": "0:00:16",
        "end": "0:00:21",
        "text": "همچنان ناتمام گفته سخن آغاز کند"
      },
      ...
    ]
  }
]

```

`POST /api/transcribe_files/`

<dl>
<strong>media(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    file in binary
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  فایل ورودی</p>
<br><br>
# تبدیل صدا به متن به‌شکل ناهمگام

در این بخش نحوه تحلیل فایل به صورت ناهمگام، توضیح داده شده است.


## مثال: ارسال لینک فایل به‌شکل ناهمگام

> Request

```plaintext
{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ],
    "wait": false
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ],
    "wait": false
} \
      http://harf.roshan-ai.ir/api/transcribe_files/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ],
    "wait": false
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://harf.roshan-ai.ir/api/transcribe_files/', data=values, headers=headers)

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
            URL url = new URL("http://harf.roshan-ai.ir/api/transcribe_files/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ],
    "wait": false
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

  $url = "http://harf.roshan-ai.ir/api/transcribe_files/";
  $content = json_encode(
      '{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ],
    "wait": false
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://harf.roshan-ai.ir/api/transcribe_files/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "media_urls": [
        "https://i.ganjoor.net/a2/41417.mp3"
    ],
    "wait": false
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

> Response 

```json
{
  "state":"PENDING",
  "task_ids":["..."]
}

```

اگر در درخواست خود مقدار پارامتر <code>wait</code> را برابر <code>false</code> قرار دهید، درخواست به‌شکل ناهمگام ارسال می‌شود. در این حالت دیگر لازم نیست منتظر نتیجه بمانید. درعوض، در خروجی، دو پارامتر <code>state</code> و <code>task_ids</code> دریافت می‌کنید که اولی وضعیت پردازش را مشخص می‌کند و دومی لیستی از <code>task_id</code> ها را برمی‌گرداند.  هر <code>task_id</code> شناسهٔ پردازش یک فایل است که بعداً می‌توانید با تابع «دریافت پاسخ به‌شکل ناهمگام» از وضعیت پردازش آن باخبر شوید. در درخواست به‌شکل ناهمگام اگر نتیجهٔ پردازش آماده باشد، بلافاصله در خروجی نمایش داده می‌شود، اگر نه، وضعیت پردازش در پارامتر <code>state</code> برگردانده می‌شود، مثلاً <code>PENDING</code> یعنی در حال پردازش است.

`POST /api/transcribe_files/`

<dl>
<strong>media_urls(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    List of URLs
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لینک فایل‌های ورودی</p>
<br><br>
<dl>
<strong>wait</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    true
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اگر <code>false</code> باشد یعنی منتظر نتیجه نمی‌ماند. درعوض شناسهٔ پردازش فایل‌ها (<code>task_ids</code>) را برمی‌گرداند تا خودتان هرازگاهی وضعیت پردازش را چک کنید و بعد از پایان پردازش، مجددا درخواست دهید و خروجی نهایی را ببینید.</p>
<br><br>
## مثال: دریافت پاسخ به‌شکل ناهمگام

> Request

```plaintext
{
    "tasks_ids": [
        "..."
    ],
    "wait": false
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "tasks_ids": [
        "..."
    ],
    "wait": false
} \
      http://harf.roshan-ai.ir/api/transcribe_files/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "tasks_ids": [
        "..."
    ],
    "wait": false
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://harf.roshan-ai.ir/api/transcribe_files/', data=values, headers=headers)

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
            URL url = new URL("http://harf.roshan-ai.ir/api/transcribe_files/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "tasks_ids": [
        "..."
    ],
    "wait": false
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

  $url = "http://harf.roshan-ai.ir/api/transcribe_files/";
  $content = json_encode(
      '{
    "tasks_ids": [
        "..."
    ],
    "wait": false
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://harf.roshan-ai.ir/api/transcribe_files/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "tasks_ids": [
        "..."
    ],
    "wait": false
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

> Response 

```json
{"state":"PENDING"}

```

با ارسال یک یا چند شناسهٔ پردازش در پارامتر <code>task_ids</code>، نتیجهٔ پردازش آن‌ها بازگردانده می‌شود. در پاسخ خروجی، پارامتر <code>state</code> می‌تواند سه حالت داشته باشد. <code>PENDING</code> یعنی در حال پردازش، <code>FAILURE</code> یعنی بروز خطا، <code>TIMEOUT</code> یعنی پردازش فایل بیش از تحمل سامانه بوده است.

`POST /api/transcribe_files/`

<dl>
<strong>task_ids(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    List of task ids
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست شناسه‌های پردازش</p>
<br><br>
<dl>
<strong>wait</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    true
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  همانند قبل.</p>
<br><br>
# تبدیل پخش زندهٔ صدا به متن

برای تبدیل صدای درحال‌پخش (زنده، لایو، استریم) باید از طریق وب‌سوکت به سامانه متصل شوید. در این حالت، پس از برقراری ارتباط، فایل باید در قالب wav به صورت باینری به سرور ارسال شود.

{"segment_id": 1, "text": "سازمان بهداشت جهانی", "start": "0:00:00", "end": "0:00:05"}

اگر پردازش کامل نشده باشد، پاسخی به‌شکل زیر ارسال می‌شود:

{"state": "PENDING"}

در انتها، برای اعلام پایان فرایند پردازش باید متن "finalize"به سرور ارسال شود.


## مثال

> Request

```plaintext
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```shell
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```python
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```java
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```php
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```csharp
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

> Response 

```json
{"state":"PENDING"}

```

`POST /ws_api/transcribe_files/wav/sync/`

