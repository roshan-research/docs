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
    content: Documentation for the الفبا API
---

# الفبا

نویسه‌خوان الفبا تصویر اسناد فارسی، انگلیسی و عربی را می‌خواند و در قالب متن مرتب ارائه می‌دهد.

برای دسترسی به واسط برنامه‌نویس الفبا نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می‌شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای‌گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس alefba@roshan-ai.ir بنویسید.

# خواندن سند

این تابع، یک سند را دریافت می‌کند و متن صفحات آن را در قالب JSON باز می‌گرداند. خروجی نویسه‌خوان شامل بخش‌های نوشته (پاراگراف)، جدول و تصویر است. مکان و ابعاد هر بخش در خروجی مشخص شده است و اطلاعات کامل خطوط متن در بخش نوشته ظاهر می‌شود. برای هر خط متن، ویژگی احتمال صحت هم قرار داده شده که نشان می‌دهد ابزار نویسه‌خوان چقدر از نتیجه تحلیل، مطمئن است.

`/api/read_document/`


## نمونه ارسال با لینک سند

> Request

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

> Response 

> Content-Type: application/json

```json
"{\n  \"document_url\": \"http://bayanbox.ir/view/5067853395275628881/boute.pdf\",\n  \"pages\": [{\n    \"page_url\": \"http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1\",\n    \"width\": 2125,\n    \"height\": 2750,\n    \"text\": \"بوته\\n\\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\\n...\",\n    \"parts\": [\n      {\n        \"type\": \"text\",\n        \"direction\": \"rtl\",\n        \"box\": \"209 305 1711 449\",\n        \"text\": \"درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\\n...\",\n        \"lines\": [\n          {\n            \"probability\": 1.0,\n            \"box\": \"211 305 1707 57\",\n            \"text\": \"درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\"\n          },\n          ...\n        ]\n      },\n      ...\n    ]\n  },{\n    \"page_url\": \"http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=2\",\n    \"width\": 2125,\n    \"height\": 2750,\n    \"text\": \"انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\\n...\",\n    \"parts\": [\n      {\n        \"type\": \"text\",\n        \"direction\": \"rtl\",\n        \"box\": \"210 110 1714 294\",\n        \"text\": \"انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\\n...\",\n        \"lines\": [\n          {\n            \"probability\": 1.0,\n            \"box\": \"210 110 1706 58\",\n            \"text\": \"انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\"\n          },\n          ...\n        ],\n      },\n      ...\n    ]\n  }]\n}\n"
```

`POST /api/read_document/`

<dl>
<strong>document_url(required)</strong>
<br>
<br>
Value: URL
</dl>

<p style="direction:rtl;font-weight:600;">آدرس سند ورودی</p>

<dl>
<strong>type</strong>
<br>
<br>
Value: general
</dl>

<p style="direction:rtl;font-weight:600;">این ویژگی نوع سند را مشخص می‌کند</p>

<dl>
<strong>fix_orientation</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">در صورت فعال بودن این ویژگی، الفبا سعی می‌کند چرخش ۹۰، ۱۸۰ و یا ۲۷۰ درجه تصویر را اصلاح کند</p>

<dl>
<strong>word_positions</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">در صورت فعال بودن این ویژگی اطلاعات مکانی واژه‌ها در خروجی قرار می‌گیرد</p>

<dl>
<strong>wait</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">اگر این ویژگی فعال باشد، کاربر منتظر می‌ماند تا نتیجه تحلیل آماده شود؛ در غیر این صورت، تقاضای تحلیل دریافت می‌شود و کاربر با استفاده از واسط «وضعیت سند» از میزان پیشرفت تحلیل مطلع می‌شود. به این ترتیب پس از پایان پردازش، تقاضای جدیدی برای پردازش سند ارسال می‌شود و این بار تقاضا با نتیجه مناسب پاسخ داده می‌شود.</p>

## نمونه ارسال مستقیم سند

> Request

```plaintext
"--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: multipart/form-data; boundary={boundary value}" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n" \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
from urllib2 import Request, urlopen

values = """
"--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"
"""

headers = {
  'Content-Type': 'multipart/form-data; boundary={boundary value}','Authorization': 'Token TOKEN_KEY',
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

            byte[] out = ""--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "multipart/form-data; boundary={boundary value}");
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
      '"--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: multipart/form-data; boundary={boundary value}",
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
            httpWebRequest.Headers["Content-Type"]= "multipart/form-data; boundary={boundary value}";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = ""--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"";

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

> Content-Type: application/json

```json
"{\n  \"pages\": [{\n    \"page_url\": \"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf@page=1\",\n    \"width\": 2125,\n    \"height\": 2750,\n    \"text\": \"بوته\\n\\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\\n...\",\n    \"parts\": [\n      {\n        \"type\": \"text\",\n        \"direction\": \"rtl\",\n        \"box\": \"209 305 1711 449\",\n        \"text\": \"درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\\n...\",\n        \"lines\": [\n          {\n            \"probability\": 1.0,\n            \"box\": \"211 305 1707 57\",\n            \"text\": \"درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\"\n          },\n          ...\n        ]\n      },\n      ...\n    ]\n  },{\n    \"page_url\":\"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf@page=2\",\n    \"width\": 2125,\n    \"height\": 2750,\n    \"text\": \"انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\\n...\",\n    \"parts\": [\n      {\n        \"type\": \"text\",\n        \"direction\": \"rtl\",\n        \"box\": \"210 110 1714 294\",\n        \"text\": \"انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\\n...\",\n        \"lines\": [\n          {\n            \"probability\": 1.0,\n            \"box\": \"210 110 1706 58\",\n            \"text\": \"انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\"\n          },\n          ...\n        ],\n      },\n      ...\n    ]\n  }],\n  \"document_url\":\"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf\"\n}\n"
```

`POST /api/read_document/`

<dl>
<strong>document(required)</strong>
<br>
<br>
Value: undefined
</dl>

<p style="direction:rtl;font-weight:600;">فایل سند ورودی</p>

<dl>
<strong>type</strong>
<br>
<br>
Value: general
</dl>

<p style="direction:rtl;font-weight:600;">این ویژگی نوع سند را مشخص می‌کند</p>

<dl>
<strong>fix_orientation</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">در صورت فعال بودن این ویژگی، الفبا سعی می‌کند چرخش ۹۰، ۱۸۰ و یا ۲۷۰ درجه تصویر را اصلاح کند</p>

<dl>
<strong>word_positions</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">در صورت فعال بودن این ویژگی اطلاعات مکانی واژه‌ها در خروجی قرار می‌گیرد</p>

<dl>
<strong>wait</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">اگر این ویژگی فعال باشد، کاربر منتظر می‌ماند تا نتیجه تحلیل آماده شود؛ در غیر این صورت، تقاضای تحلیل دریافت می‌شود و کاربر با استفاده از واسط «وضعیت سند» از میزان پیشرفت تحلیل مطلع می‌شود. به این ترتیب پس از پایان پردازش، تقاضای جدیدی برای پردازش سند ارسال می‌شود و این بار تقاضا با نتیجه مناسب پاسخ داده می‌شود.</p>

# خواندن صفحه

این تابع، تصویر نوشته را دریافت می‌کند و متن آن را در قالب JSON باز می‌گرداند. خروجی نویسه‌خوان شامل بخش‌های نوشته (پاراگراف)، جدول و تصویر است. مکان و ابعاد هر بخش در خروجی مشخص شده است و اطلاعات کامل خطوط متن در بخش نوشته ظاهر می‌شود. برای هر خط متن، ویژگی احتمال صحت هم قرار داده شده که نشان می‌دهد ابزار نویسه‌خوان چقدر از نتیجه تحلیل، مطمئن است.

`/api/read_pages/`


## نمونه

> Request

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

> Response 

> Content-Type: application/json

```json
"[{\n  \"page_url\": \"http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1\",\n  \"width\": 2125,\n  \"height\": 2750,\n  \"text\": \"بوته\\n\\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\\n...\",\n  \"parts\": [\n    {\n      \"type\": \"text\",\n      \"direction\": \"rtl\",\n      \"box\": \"209 305 1711 449\",\n      \"text\": \"درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\\n...\",\n      \"lines\": [\n        {\n          \"probability\": 1.0,\n          \"box\": \"211 305 1707 57\",\n          \"text\": \"درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\"\n        },\n        ...\n      ]\n    },\n    ...\n  ]\n}]\n"
```

`POST /api/read_pages/`

<dl>
<strong>page_urls(required)</strong>
<br>
<br>
Value: [object Object],[object Object],[object Object]
</dl>

<p style="direction:rtl;font-weight:600;">آدرس صفحات ورودی</p>

<dl>
<strong>type</strong>
<br>
<br>
Value: general
</dl>

<p style="direction:rtl;font-weight:600;">این ویژگی نوع سند را مشخص می‌کند</p>

<dl>
<strong>fix_orientation</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">در صورت فعال بودن این ویژگی، الفبا سعی می‌کند چرخش ۹۰، ۱۸۰ و یا ۲۷۰ درجه تصویر را اصلاح کند</p>

<dl>
<strong>word_positions</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">در صورت فعال بودن این ویژگی اطلاعات مکانی واژه‌ها در خروجی قرار می‌گیرد</p>

<dl>
<strong>wait</strong>
<br>
<br>
Value: true
</dl>

<p style="direction:rtl;font-weight:600;">اگر این ویژگی فعال باشد، کاربر منتظر می‌ماند تا نتیجه تحلیل آماده شود؛ در غیر این صورت، تقاضای تحلیل دریافت می‌شود و کاربر با استفاده از واسط «وضعیت سند» از میزان پیشرفت تحلیل مطلع می‌شود. به این ترتیب پس از پایان پردازش، تقاضای جدیدی برای پردازش سند ارسال می‌شود و این بار تقاضا با نتیجه مناسب پاسخ داده می‌شود.</p>

# وضعیت سند

این تابع برای هر کدام از سندهای ورودی مشخص می‌کند که چه تعداد از صفحات آنها تحلیل شده است.

`/api/document_status/`


## نمونه

> Request

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

> Response 

> Content-Type: application/json

```json
{
    "http://bayanbox.ir/view/5067853395275628881/boute.pdf": {
        "analyzed": true,
        "processed_pages": 2,
        "all_pages": 2
    }
}
```

`POST /api/document_status/`

# صفحات سند

نویسه‌خوان برای تحلیل سند، ابتدا باید آن را صفحه‌صفحه کند. این تابع، فایل سند را در قالب PDF دریافت می‌کند و صفحات آن را به عنوان نتیجه باز می‌گرداند. بعد از این مرحله، تابع «خواندن صفحه» می‌تواند هر کدام از صفحه‌های سند را تحلیل کند.

`/api/document_pages/`


## نمونه

> Request

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

> Response 

> Content-Type: application/json

```json
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "pages": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=2"
    ]
}
```

`POST /api/document_pages/`

# دریافت فایل ورد

با استفاده از این تابع می‌توانید نتیجه صفحات پردازش شده را در قالب فایل Microsoft Word دریافت نمایید. در فایل خروجی، قالب سند حفظ شده است و اجزای متن شامل خطوط، پاراگراف‌ها و خانه‌های جدول در جای خود قرار گرفته‌اند.

`/api/download_word/`


## نمونه

> Request

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

> Response 

```json
""
```

`POST /api/download_word/`

# دریافت فایل اکسل

با استفاده از این تابع می‌توانید نتیجه صفحات پردازش شده را در قالب فایل Microsoft Excel دریافت نمایید. دقت کنید که برای استفاده از این خروجی لازم است در هنگام خواندن سند، ویژگی <code>type</code> را برابر مقدار <code>excel</code> قرار دهید.

`/api/download_excel/`


## نمونه

> Request

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

> Response 

```json
""
```

`POST /api/download_excel/`

# دریافت فایل قابل جستجو

با استفاده از این تابع می‌توانید نتیجه صفحات پردازش شده را در قالب فایل PDF دریافت نمایید. فایل خروجی، تصاویر صفحات سند ورودی را به همراه نتیجه پردازش آنها نشان می‌دهد. به این ترتیب با جستجوی یک عبارت در این فایل، واژه‌های مورد جستجو در تصویر مشخص و رنگی می‌شوند.

`/api/download_pdf/`


## نمونه

> Request

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

> Response 

```json
""
```

`POST /api/download_pdf/`

# حذف سند

با استفاده از این تابع می‌توانید سند ثبت شده در سامانه را به طور کامل حذف کنید.

`/api/delete_document/`


## نمونه

> Request

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

> Response 

> Content-Type: application/json

```json
{
    "message": "Document deleted successfully."
}
```

`POST /api/delete_document/`

# خواندن سند نامتقارن

این قابلیت برای جلوگیری از انتظار برای تحلیل فایل قرار داده شده است. پس  از ارسال رکوئست وضعیت فایل در حال تحلیل قرار گرفته و پس اتمام تحلیل رکوئست کالبک حاوی اطلاعات فایل به آدرس وارد شده فرستاده میشود.

`/api/read_document/`


## نمونه

> Request

```plaintext
{
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" --header "Content-Type: application/json" \
      --data-binary {
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
} \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY','Content-Type': 'application/json',
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
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.setRequestProperty("Content-Type", "application/json");
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
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
              "Content-Type: application/json",
              "Authorization: Token TOKEN_KEY",
              "Content-Type: application/json",
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
            httpWebRequest.Headers["Content-Type"]= "application/json";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
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

> Content-Type: application/json

```json
{
    "state": "processing",
    "document_url": "http://192.168.254.3:5013/static/2021-10-12%20%281%29.png"
}
```

`POST /api/read_document/`

