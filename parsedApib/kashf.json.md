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
    content: Documentation for the کشف API
---

# کشف

کشف با دیدن نمونه‌هایی از یک مفهوم در متن، تصویر و یا ویدئو، آن را یاد می‌گیرد و می تواند در داده‌های جدید آن مفهوم را پیدا کند.

برای دسترسی به واسط برنامه‌نویس کشف نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می‌شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای‌گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس kashf@roshan-ai.ir بنویسید.

# تحلیل متن

تابع تحلیل متن برچسب‌های مربوط به نمونه‌های ارسال شده را در یک مجموعه‌داده متنی تشخیص می‌دهد. این تابع یک مجموعه داده متنی و لیستی از متن‌ها را دریافت نموده و در پاسخ به ازای هر یک از نمونه‌ها، شناسه نمونه، متن نمونه و لیستی از برچسب‌های تشخیص داده شده را به همراه میزان اطمینان پیش‌بینی برای هر دسته ارسال می‌کند.


## نمونه

> Request

```plaintext
{
    "dataset": "digikala",
    "contents": [
        "ارزش خریدنش رو بی شک داره",
        "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "digikala",
    "contents": [
        "ارزش خریدنش رو بی شک داره",
        "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_texts/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "digikala",
    "contents": [
        "ارزش خریدنش رو بی شک داره",
        "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_texts/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/tag_texts/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "digikala",
    "contents": [
        "ارزش خریدنش رو بی شک داره",
        "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره"
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

  $url = "https://kashf.roshan-ai.ir/api/tag_texts/";
  $content = json_encode(
      '{
    "dataset": "digikala",
    "contents": [
        "ارزش خریدنش رو بی شک داره",
        "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/tag_texts/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "digikala",
    "contents": [
        "ارزش خریدنش رو بی شک داره",
        "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره"
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
    "content": "ارزش خریدنش رو بی شک داره",
    "tags": [
      {
        "id": 39,
        "probability": 1.0,
        "title": "توصیه خرید"
      }
    ]
  },
  {
    "content": "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره",
    "tags": [
      {
        "id": 56,
        "probability": 1.0,
        "title": "عدم رضایت بعد خرید"
      }
    ]
  }
]

```

`POST /api/tag_texts/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌</p>
<br><br>
<dl>
<strong>contents(required)</strong>
<br>
<br>
Value: [contents, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست نمونه‌های متنی ارسالی</p>
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
<img src="./images/vector.svg" alt="vector">  در صورتی که این ویژگی فعال باشد، تابع تا انجام کامل تحلیل منتظر مانده و پس از پایان فرآیند تحلیل، نتیجه را ارسال می‌کند. در صورتی که غیرفعال باشد تابع فرآیند تحلیل را آغاز کرده و تا پایان فرآیند  تحلیل، با اعلام وضعیت(‌processing)

پاسخ می‌دهد. نتیجه تحلیل در اولین فراخوانی پس از پایان فرآیند ارسال می‌شود</p>
<br><br>
<dl>
<strong>tree_based</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    false
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  تحلیل متن به روش درختی</p>
<br><br>
# تحلیل تصویر

تابع تحلیل تصویر برچسب‌های مربوط به نمونه‌ تصاویر ارسال شده را در یک مجموعه‌داده تصویری تشخیص می‌دهد. این تابع یک مجموعه داده تصویری و لیستی از تصاویر مورد سوال را دریافت کرده و در پاسخ به ازای هر یک از نمونه‌ها، شناسه نمونه، لینک تصویر و لیست برچسب‌های تشخیص داده شده را به همراه میزان اطمینان تشخیص، به صورت عددی بین صفر و یک، برای هر برچسب ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "image_urls": [
        "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "image_urls": [
        "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_images/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "image_urls": [
        "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_images/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/tag_images/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "image_urls": [
        "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg"
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

  $url = "https://kashf.roshan-ai.ir/api/tag_images/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "image_urls": [
        "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/tag_images/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "image_urls": [
        "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg"
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
    "image_url": "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
    "tags": [
      {
        "id": 1,
        "probability": 1.0,
        "title": "حرم رضوی"
      }
    ]
  },
  {
    "image_url": "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg",
    "tags": [
      {
        "id": 36,
        "probability": 1.0,
        "title": "تئاتر شهر"
      }
    ]
  }
]

```

می‌توانید برای همین تابع، فایل تصویر را به طور مستقیم و در قالب تقاضای multipart/form-data ارسال نمایید.

`POST /api/tag_images/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌</p>
<br><br>
<dl>
<strong>image_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس تصاویر ارسالی برای تحلیل</p>
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
<img src="./images/vector.svg" alt="vector">  در صورتی که این ویژگی فعال باشد، تابع تا انجام کامل تحلیل منتظر مانده و پس از پایان فرآیند تحلیل، نتیجه را ارسال می‌کند. در صورتی که غیرفعال باشد تابع فرآیند تحلیل را آغاز کرده و تا پایان فرآيند تحلیل  با اعلام وضعیت(‌processing)

پاسخ می‌دهد. نتیجه تحلیل در اولین فراخوانی پس از پایان فرآیند ارسال می‌شود.</p>
<br><br>
# تحلیل چهره

تابع تحلیل چهره، چهره‌های تصاویر ارسال شده را در یک مجموعه‌داده چهره تشخیص می‌دهد. این تابع یک مجموعه داده چهره و لیستی از تصاویر مورد سوال را دریافت کرده و در پاسخ به ازای هر یک از نمونه‌ها، شناسه نمونه، لینک تصویر و لیست چهره‌های تشخیص داده شده را به همراه میزان اطمینان تشخیص، به صورت عددی بین صفر و یک، برای هر چهره ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_faces/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_faces/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/tag_faces/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
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

  $url = "https://kashf.roshan-ai.ir/api/tag_faces/";
  $content = json_encode(
      '{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/tag_faces/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
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
    "image_url": "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
    "tags": [
      {
        "id": 328742,
        "probability": 1.0,
        "title": "حسین امیرعبداللهیان (سیاسی)"
      }
    ]
  }
]

```

می‌توانید برای همین تابع، فایل تصویر را به طور مستقیم و در قالب تقاضای multipart/form-data ارسال نمایید.

`POST /api/tag_faces/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌</p>
<br><br>
<dl>
<strong>image_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس تصاویر ارسالی برای تحلیل</p>
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
<img src="./images/vector.svg" alt="vector">  در صورتی که این ویژگی فعال باشد، تابع تا انجام کامل تحلیل منتظر مانده و پس از پایان نتیجه را ارسال می‌کند. در صورتی که غیرفعال باشد تابع فرآیند تحلیل را آغاز کرده و تا پایان تحلیل بلافاصله با اعلام وضعیت(‌processing)

پاسخ می‌دهد. نتیجه تحلیل در اولین فراخوانی پس از پایان تحلیل ارسال می‌شود</p>
<br><br>
# تحلیل فریم‌های ویدئو

این تابع برای تحلیل فریم‌های یک ویدئو و تشخیص برچسب‌های مربوط به هر فریم در یک مجموعه داده مشخص کاربرد دارد. ابن تابع مجموعه داده مربوطه و لیست آدرس‌های مربوط به ویدئو‌ها را دریافت کرده و در پاسخ لیستی از فریم‌های استخراج شده، شامل شماره، برچسب زمانی و لیستی از برچسب‌های تشخیص داده شده به همراه میزان اطمینان از هر برچسب را ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_video_frames/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_video_frames/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/tag_video_frames/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4"
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

  $url = "https://kashf.roshan-ai.ir/api/tag_video_frames/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/tag_video_frames/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4"
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
    "video_url": "https://hw15.cdn.asset.aparat.com/aparat-video/98b7e4cc00c97dffde2ae00567b98a4312759670-480p__79959.mp4",
    "frames": [
      {
        "frame": 3,
        "time": "0:00:00",
        "tags": [
          {
            "id": 0,
            "probability": 1.0,
            "title": "ناآشنا"
          }
        ]
      },
      {
        "frame": 585,
        "time": "0:00:23",
        "tags": [
          {
            "id": 39127,
            "probability": 0.99,
            "title": "پل طبیعت"
          }
        ]
      },
      {
        "frame": 603,
        "time": "0:00:24",
        "tags": [
          {
            "id": 2,
            "probability": 1.0,
            "title": "میدان آزادی"
          }
        ]
      }
    ]
  }
]

```

`POST /api/tag_video_frames/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌</p>
<br><br>
<dl>
<strong>video_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس ویدئوهای ارسالی برای تحلیل فریم‌ها</p>
<br><br>
<dl>
<strong>every_ms</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    100
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  فاصله بین فریم‌های استخراج شده برای تحلیل بر مبنای میلی ثانیه</p>
<br><br>
<dl>
<strong>min_frame_diff</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0.4
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  حداقل مقدار تفاوت دو فریم که بیش از آن، دو فریم متفاوت در نظر گرفته می‌شوند.</p>
<br><br>
<dl>
<strong>duration</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  مقدار ثانیه‌‌ای از ابتدای ویدئو که مورد پردازش قرار می‌گیرد. اگر این ویژگی null باشد کل ویدئو پردازش می‌شود.</p>
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
<img src="./images/vector.svg" alt="vector">  در صورتی که این ویژگی فعال باشد، تابع تا انجام کامل تحلیل منتظر مانده و پس از پایان نتیجه را ارسال می‌کند. در صورتی که غیرفعال باشد تابع فرآیند تحلیل را آغاز کرده و تا پایان فرآیند تحلیل، با اعلام وضعیت(‌processing)

پاسخ می‌دهد. نتیجه تحلیل در اولین فراخوانی پس از پایان فرآیند ارسال می‌شود</p>
<br><br>
# تحلیل چهره‌های ویدئو

این تابع برای تحلیل فریم‌های یک ویدئو و تشخیص چهره‌ها در ویدئو  کاربرد دارد. ابن تابع مجموعه داده مربوطه و لیست آدرس‌های مربوط به ویدئو‌ها را دریافت کرده و در پاسخ لیستی از فریم‌های استخراج شده، شامل شماره، برچسب زمانی و لیستی از چهره‌های تشخیص داده شده به همراه میزان اطمینان از هر دسته را ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_video_faces/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_video_faces/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/tag_video_faces/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
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

  $url = "https://kashf.roshan-ai.ir/api/tag_video_faces/";
  $content = json_encode(
      '{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/tag_video_faces/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
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

`POST /api/tag_video_faces/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌</p>
<br><br>
<dl>
<strong>video_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس ویدئوهای ارسالی برای تحلیل فریم‌ها</p>
<br><br>
<dl>
<strong>every_ms</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    100
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  فاصله بین فریم‌های استخراج شده برای تحلیل بر مبنای میلی ثانیه</p>
<br><br>
<dl>
<strong>min_frame_diff</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0.4
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  حداقل مقدار تفاوت دو فریم که بیش از آن، دو فریم متفاوت در نظر گرفته می‌شوند.</p>
<br><br>
<dl>
<strong>duration</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    25
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  مقدار ثانیه‌‌ای از ابتدای ویدئو که مورد پردازش قرار می‌گیرد. اگر این ویژگی null باشد کل ویدئو پردازش می‌شود.</p>
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
<img src="./images/vector.svg" alt="vector">  در صورتی که این ویژگی فعال باشد، تابع تا انجام کامل تحلیل منتظر مانده و پس از پایان فرآيند تحلیل، نتیجه را ارسال می‌کند. در صورتی که غیرفعال باشد تابع فرآیند تحلیل را آغاز کرده و تا پایان فرآيند تحلیل، با اعلام وضعیت(‌processing)

پاسخ می‌دهد. نتیجه تحلیل در اولین فراخوانی پس از پایان فرآیند ارسال می‌شود</p>
<br><br>
# تحلیل ویدئو

تابع تحلیل ویدئو، برچسب‌های مربوط به نمونه‌ ویدئوهای ارسال شده را در یک مجموعه‌داده ویدئویی تشخیص می‌دهد. این تابع یک مجموعه داده ویدئویی و لیستی از آدرس ویدئوهای مورد سوال را دریافت کرده و در پاسخ به ازای هر یک از نمونه‌ها، شناسه نمونه، لینک ویدئو و لیست برچسب‌های تشخیص داده شده را به همراه میزان اطمینان تشخیص، به صورت عددی بین صفر و یک، برای هر برچسب ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_videos/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_videos/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/tag_videos/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
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

  $url = "https://kashf.roshan-ai.ir/api/tag_videos/";
  $content = json_encode(
      '{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/tag_videos/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
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
    "image_url": "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4",
    "tags": [
      {
        "id": 77,
        "probability": 1.0,
        "title": "بسکتبال"
      }
    ]
  }
]

```

`POST /api/tag_videos/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌</p>
<br><br>
<dl>
<strong>video_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس ویدئوهای ارسالی برای تحلیل</p>
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
<img src="./images/vector.svg" alt="vector">  در صورتی که این ویژگی فعال باشد، تابع تا انجام کامل تحلیل منتظر مانده و پس از پایان فرآیند تحلیل، نتیجه را ارسال می‌کند. در صورتی که غیرفعال باشد تابع فرآیند تحلیل را آغاز کرده و تا پایان فرآیند،  با اعلام وضعیت(‌processing)

پاسخ می‌دهد. نتیجه تحلیل در اولین فراخوانی پس از پایان فرآیند ارسال می‌شود</p>
<br><br>
# آموزش مدل

با فراخوانی این تابع فرآیند آموزش مدل یادگیری ماشین روی مجموعه داده مشخص شده آِغاز می‌شود. خروجی تابع وضعیت آموزش را نمایش می‌دهد که در حالت عادی waiting می‌باشد. وضعیت waiting نشان می‌دهد فرآیند آموزش هنوز شروع نشده و منتظر تخصیص منابع و شروع فرآیند است.
برای مشاهده روند و وضعیت فرآیند آموزش و از تابع وضعیت داده استفاده کنید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran"
} \
      https://kashf.roshan-ai.ir/api/train_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/train_dataset/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/train_dataset/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran"
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

  $url = "https://kashf.roshan-ai.ir/api/train_dataset/";
  $content = json_encode(
      '{
    "dataset": "iran"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/train_dataset/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran"
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
    "dataset": "iran",
    "state": "waiting"
}

```

`POST /api/train_dataset/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده مورد نظر برای آموزش مدل</p>
<br><br>
# بازبینی مدل

با فراخوانی این تابع فرآیند بازبینی داده‌های موجود در مجموعه داده آغاز می‌شود. در فرآیند بازبینی سامانه با استفاده از مدل یادگیری ماشین مجددا تعدادی از داده‌ها را برچسب می‌زند. این تابع معمولا بعد از آموزش مدل جدید کاربرد دارد که با بازبینی داده‌ها، برچسب‌های برخی از نمونه‌ها تغییر می‌کنند. در این تابع حداکثر تعداد نمونه‌هایی که در این فرآیند بازبینی می‌شوند به عنوان پارامتر ارسال می‌شود. اگر تعداد نمونه‌های مجموعه داده کمتر از این مقدار باشد، تمامی نمونه‌ها بازبینی می‌شوند.
خروجی تابع وضعیت فرآیند را نشان می‌دهد که در حالت عادی waiting می‌باشد. براب مشاهده روند فرآیند و بررسی وضعیت آن، از فراخوانی تابع وضعیت داده استفاده نمایید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "max_predictions": 100
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "max_predictions": 100
} \
      https://kashf.roshan-ai.ir/api/retag_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "max_predictions": 100
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/retag_dataset/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/retag_dataset/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "max_predictions": 100
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

  $url = "https://kashf.roshan-ai.ir/api/retag_dataset/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "max_predictions": 100
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/retag_dataset/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "max_predictions": 100
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
    "dataset": "iran",
    "state": "waiting"
}

```

`POST /api/retag_dataset/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده مورد نظر برای آموزش مدل</p>
<br><br>
<dl>
<strong>max_predictions(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  حداکثر تعداد نمونه‌هایی بازبینی شوند</p>
<br><br>
# دریافت مجموعه داده

این تابع برای دریافت مجموعه داده در قالب یک فایل csv می‌باشد.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
} \
      https://kashf.roshan-ai.ir/api/export_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/export_dataset/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/export_dataset/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
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

  $url = "https://kashf.roshan-ai.ir/api/export_dataset/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/export_dataset/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
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
    "dataset": "iran",
    "state": "waiting"
}

```

`POST /api/export_dataset/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده مورد نظر برای آموزش مدل</p>
<br><br>
<dl>
<strong>original_urls</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد، آدرس‌های اصلی تصاویر و یا ویدئوها در فایل قرار می‌گیرند و در غیر این صورت، آدرس نمونه داخل سرور کشف در فایل گذاشته می‌شود.</p>
<br><br>
<dl>
<strong>tag_names</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    false
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد نام عناوین به عنوان برچسب انتخاب می‌شوند و در غیر این صورت شناسه‌ها به عنوان برچسب قرار داده می‌شوند.</p>
<br><br>
# وارد کردن داده

این تابع برای وارد کردن داده‌ها در قالب فایل csv و اضافه کردن آن‌ها به مجموعه داده می‌باشد.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
} \
      https://kashf.roshan-ai.ir/api/export_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/export_dataset/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/export_dataset/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
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

  $url = "https://kashf.roshan-ai.ir/api/export_dataset/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/export_dataset/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
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
    "dataset": "iran",
    "state": "waiting"
}

```

می‌توانید برای همین تابع، فایل داده را به طور مستقیم و در قالب تقاضای multipart/form-data ارسال نمایید:

`POST /api/export_dataset/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده مورد نظر برای آموزش مدل</p>
<br><br>
<dl>
<strong>csv_url(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    imported file URL
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس فایل حاوی داده مربوطه</p>
<br><br>
<dl>
<strong>report_items</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد، تمامی نمونه‌های موجود در فایل به عنوان گزارش در برچسب مربوطه اضافه می‌شوند.</p>
<br><br>
<dl>
<strong>tag_names</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد نام عناوین به عنوان برچسب انتخاب می‌شوند و در غیر این صورت شناسه‌ها به عنوان برچسب قرار داده می‌شوند.</p>
<br><br>
# وضعیت داده‌ها

این تابع اطلاعاتی از وضعیت داده‌ها و فرآیندهای آموزش و ارزیابی را در  مجموعه داده مشخص شده ارسال می‌نماید. این اطلاعات شامل موارد زیر هستند:

+ وضعیت فرآیند آموزش و ارزیابی مجموعه داده

+ تعداد کل نمونه‌ها

+ تعداد کل نمونه‌های گزارش شده

+ نتایج ارزیابی مدل آموزش داده شده روی مجموعه داده

+ اطلاعات داده و ارزیابی مربوط به هر کدام از دسته‌ها (در صورت فعال بودن ویژگی tags)

وضعیت‌هایی ممکن مجموعه داده:

+ waiting: در این حالت مجموعه داده منتظر دریافت منابع و شروع فرآیند می‌باشد.

+ training: فرآیند آموزش مدل یادگیری ماشین در حال انجام است.

+ trained: آموزش مدل پایان یافته و مدل جدید آماده شده است.

+ retagging: فرایند بازبینی داده‌ها در حال انجام است

+ retagged: بازبینی داده‌ها پایان یافته و نتایج ارزیابی به روز شده است.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "tags": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "tags": true
} \
      https://kashf.roshan-ai.ir/api/dataset_info/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "tags": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/dataset_info/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/dataset_info/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "tags": true
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

  $url = "https://kashf.roshan-ai.ir/api/dataset_info/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "tags": true
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/dataset_info/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "tags": true
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
  "title": "لحظه",
  "state": "trained",
  "report_count": 935,
  "data_count": 2404,
  "evaluation": {
    "recall": 87,
    "precision": 91
  },
  "tags": [
    {
      "title": "برج میلاد"
      "id": 3,
      "reports": 116,
      "predictions": 156,
      "evaluation": {
        "recall": 80.3,
        "precision": 91.4,
        "f1": 86.0
      },
    },
    ...
  ]
}

```

`POST /api/dataset_info/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده مورد نظر برای دریافت اطلاعات وضعیت</p>
<br><br>
<dl>
<strong>tags</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد، اطلاعات مربوط به وضعیت داده و ارزیابی تک تک برچسب‌های موجود در مجموعه داده ارسال می‌شود.</p>
<br><br>
# گزارش برچسب متن

وظیفه این تابع افزودن گزارش به برچسب‌ها می‌باشد. یک گزارش نمونه‌ای است که تعلق و یا عدم تعلق به یک برچسب از قبل در آن مشخص شده و سامانه با استفاده از این گزارش‌ها مدل یادگیری ماشین را آموزش می‌دهد. این تابع یک نمونه متنی را در مجموعه داده متنی مشخص شده و در برچسب مشخص شده گزارش می‌کند. این گزارش می‌تواند مثبت (‌نمونه متعلق به برچسب است) و یا منفی (نمونه متلعق به برچسب نیست) باشد.  خروجی این تابع شامل لیستی از آیتم‌هاست که هر آیتم شناسه گزارش مربوط به همراه یک دوتایی شامل شناسه برچسب و مثبت یا منفی بودن گزارش را مشخص می‌کند.


## نمونه

> Request

```plaintext
[
    {
        "content": "پیشنهاد میکنم از این بخرید خیلی عالیه.",
        "tag_id": 39,
        "positive": true
    }
]
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary [
    {
        "content": "پیشنهاد میکنم از این بخرید خیلی عالیه.",
        "tag_id": 39,
        "positive": true
    }
] \
      https://kashf.roshan-ai.ir/api/report_text_tags/
```

```python
from urllib2 import Request, urlopen

values = """
[
    {
        "content": "پیشنهاد میکنم از این بخرید خیلی عالیه.",
        "tag_id": 39,
        "positive": true
    }
]
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/report_text_tags/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/report_text_tags/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "[
    {
        "content": "پیشنهاد میکنم از این بخرید خیلی عالیه.",
        "tag_id": 39,
        "positive": true
    }
]".getBytes(StandardCharsets.UTF_8);
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

  $url = "https://kashf.roshan-ai.ir/api/report_text_tags/";
  $content = json_encode(
      '[
    {
        "content": "پیشنهاد میکنم از این بخرید خیلی عالیه.",
        "tag_id": 39,
        "positive": true
    }
]');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/report_text_tags/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "[
    {
        "content": "پیشنهاد میکنم از این بخرید خیلی عالیه.",
        "tag_id": 39,
        "positive": true
    }
]";

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
    "report": "[[39,true]]",
    "id": 1211592
  }
]

```

`POST /api/report_text_tags/`

<dl>
<strong>content(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  متن نمونه گزارش شده</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب مورد نظر برای گزارش</p>
<br><br>
<dl>
<strong>positive</strong>
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
<img src="./images/vector.svg" alt="vector">  این ویژگی بیانگر مثبت (تعلق نمونه به برچسب) و یا منفی (عدم تعلق نمونه به برچسب) است</p>
<br><br>
# گزارش برچسب تصویر

وظیفه این تابع افزودن گزارش به برچسب‌ها می‌باشد. یک گزارش  تعلق و یا عدم تعلق یک نمونه را به یک برچسب مشخص می‌کند و سامانه با استفاده از گزارش‌ها مدل یادگیری ماشین را آموزش می‌دهد. این تابع یک تصویر را در مجموعه داده تصویری مشخص شده و در دسته مشخص شده گزارش می‌کند. این گزارش می‌تواند مثبت (‌نمونه متعلق به دسته است) و یا منفی (نمونه متلعق به دسته نیست) باشد.  خروجی این تابع شمال لیستی از آیتم‌هاست که هر آیتم شناسه گزارش مربوط به همراه یک دوتایی شامل شناسه دسته و مثبت یا منفی بودن گزارش را مشخص می‌کند.


## نمونه

> Request

```plaintext
[
    {
        "image_url": "https://upload.wikimedia.org/wikipedia/fa/thumb/5/54/Tehran-Milad_Tower2.jpg/800px-Tehran-Milad_Tower2.jpg",
        "tag_id": 3,
        "positive": true
    }
]
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary [
    {
        "image_url": "https://upload.wikimedia.org/wikipedia/fa/thumb/5/54/Tehran-Milad_Tower2.jpg/800px-Tehran-Milad_Tower2.jpg",
        "tag_id": 3,
        "positive": true
    }
] \
      https://kashf.roshan-ai.ir/api/report_image_tags/
```

```python
from urllib2 import Request, urlopen

values = """
[
    {
        "image_url": "https://upload.wikimedia.org/wikipedia/fa/thumb/5/54/Tehran-Milad_Tower2.jpg/800px-Tehran-Milad_Tower2.jpg",
        "tag_id": 3,
        "positive": true
    }
]
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/report_image_tags/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/report_image_tags/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "[
    {
        "image_url": "https://upload.wikimedia.org/wikipedia/fa/thumb/5/54/Tehran-Milad_Tower2.jpg/800px-Tehran-Milad_Tower2.jpg",
        "tag_id": 3,
        "positive": true
    }
]".getBytes(StandardCharsets.UTF_8);
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

  $url = "https://kashf.roshan-ai.ir/api/report_image_tags/";
  $content = json_encode(
      '[
    {
        "image_url": "https://upload.wikimedia.org/wikipedia/fa/thumb/5/54/Tehran-Milad_Tower2.jpg/800px-Tehran-Milad_Tower2.jpg",
        "tag_id": 3,
        "positive": true
    }
]');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/report_image_tags/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "[
    {
        "image_url": "https://upload.wikimedia.org/wikipedia/fa/thumb/5/54/Tehran-Milad_Tower2.jpg/800px-Tehran-Milad_Tower2.jpg",
        "tag_id": 3,
        "positive": true
    }
]";

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
    "report": "[[3,true]]",
    "id": 1211593
  }
]

```

`POST /api/report_image_tags/`

<dl>
<strong>image_url(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    URL
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس تصویر گزارش شده</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب مورد نظر برای گزارش</p>
<br><br>
<dl>
<strong>positive</strong>
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
<img src="./images/vector.svg" alt="vector">  این ویژگی بیانگر مثبت (تعلق نمونه به برچسب) و یا منفی (عدم تعلق نمونه به برچسب) است</p>
<br><br>
# حذف گزارش

این تابع یک گزارش موجود را حذف می‌کند. برای حذف گزارش تابع شناسه گزارش و شناسه برچسب را به عنوان ورودی می‌گیرد. برای حذف گزارش متنی شناسه متن با عنوان text_id و برای حذف گزارش تصویری شناسه تصویر با عنوان image_id ارسال می‌شود.


## نمونه

> Request

```plaintext
"{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n" \
      https://kashf.roshan-ai.ir/api/remove_tag_report/
```

```python
from urllib2 import Request, urlopen

values = """
"{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/remove_tag_report/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/remove_tag_report/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = ""{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"".getBytes(StandardCharsets.UTF_8);
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

  $url = "https://kashf.roshan-ai.ir/api/remove_tag_report/";
  $content = json_encode(
      '"{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/remove_tag_report/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = ""{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"";

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
      "image_id": 1211593,
      "tag_id": 3,
    }


```

`POST /api/remove_tag_report/`

<dl>
<strong>text_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس متن گزارش شده</p>
<br><br>
<dl>
<strong>image_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس تصویر گزارش شده</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب مورد نظر برای گزارش</p>
<br><br>
# ایجاد برچسب

این تابع وظیفه ایجاد برچسب جدید در یک مجموعه داده را دارد. برای این کار عنوان برچسب و همچنین مجموعه داده‌ای که برچسب در آن باید ساخته شود به عنوان ورودی به تابع داده می‌شود. همچنین در تنظیمات ارسالی به تابع می‌توان مشخص کرد که برچسب ساخته شده فعال یا غیرفعال باشد. در صورتی که یک برچسب غیرفعال باشد، گزارش‌های مربوط به آن برچسب در فرآیند آموزش و ارزیابی شرکت داده نمی‌شود و در نتیجه مدل نیز این برچسب را آموزش نمی‌بیند.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "title": "New Place"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "title": "New Place"
} \
      https://kashf.roshan-ai.ir/api/create_tag/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "title": "New Place"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/create_tag/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/create_tag/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "title": "New Place"
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

  $url = "https://kashf.roshan-ai.ir/api/create_tag/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "title": "New Place"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/create_tag/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "title": "New Place"
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
  "title": "New Place",
  "tag_id": 111111111,
  "active": true
}

```

`POST /api/create_tag/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌ای که برچسب جدید در آن ساخته می‌شود</p>
<br><br>
<dl>
<strong>title(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عنوان برچسب</p>
<br><br>
<dl>
<strong>positive</strong>
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
<img src="./images/vector.svg" alt="vector">  این ویژگی بیانگر فعال یا غیر فعال بودن برچسب در مجموعه داده است. در صورتی که یک برچسب غیرفعال باشد، گزارش‌های مربوط به آن برچسب در فرآیند آموزش و ارزیابی شرکت داده نمی‌شود و در نتیجه مدل نیز این برچسب را آموزش نمی‌بیند.</p>
<br><br>
# ویرایش برچسب

این تابع برای ویرایش اطلاعات و مشخصات مربوط به یک برچسب موجود کاربرد دارد. با استفاده از این تابع می‌توان نام برچسب، مجموعه داده‌ای که برچسب متعلق به آن است و وضعیت برچسب (فعال یا غیر فعال) را ویرایش نمود.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "tag_id": 111111111,
    "title": "Old Place",
    "active": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "tag_id": 111111111,
    "title": "Old Place",
    "active": true
} \
      https://kashf.roshan-ai.ir/api/update_tag/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "tag_id": 111111111,
    "title": "Old Place",
    "active": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/update_tag/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/update_tag/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "tag_id": 111111111,
    "title": "Old Place",
    "active": true
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

  $url = "https://kashf.roshan-ai.ir/api/update_tag/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "tag_id": 111111111,
    "title": "Old Place",
    "active": true
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/update_tag/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "tag_id": 111111111,
    "title": "Old Place",
    "active": true
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
  "title": "Old Place",
  "tag_id": 111111111,
  "active": true
}

```

`POST /api/update_tag/`

<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب</p>
<br><br>
<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده‌ای صاحب برچسب</p>
<br><br>
<dl>
<strong>title(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عنوان برچسب</p>
<br><br>
<dl>
<strong>positive</strong>
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
<img src="./images/vector.svg" alt="vector">  این ویژگی بیانگر فعال یا غیر فعال بودن برچسب در مجموعه داده است. در صورتی که یک برچسب غیرفعال باشد، گزارش‌های مربوط به آن برچسب در فرآیند آموزش و ارزیابی شرکت داده نمی‌شود و در نتیجه مدل نیز این برچسب را آموزش نمی‌بیند.</p>
<br><br>
# حذف برچسب

این تابع یک برچسب را حذف می‌کند. با حذف یک برچسب تمامی گزارش‌های مربوط به آن نیز حذف می‌گردد. این تابع شناسه برچسب مورد نظر برای حذف را به عنوان ورودی دریافت کرده و در پاسخ مجموعه داده صاحب برچسب و تعداد گزارش‌های پاک شده از این مجموعه داده را ارسال می‌کند.


## نمونه

> Request

```plaintext
{
    "tag_id": 111111111
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "tag_id": 111111111
} \
      https://kashf.roshan-ai.ir/api/delete_tag/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "tag_id": 111111111
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/delete_tag/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/delete_tag/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "tag_id": 111111111
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

  $url = "https://kashf.roshan-ai.ir/api/delete_tag/";
  $content = json_encode(
      '{
    "tag_id": 111111111
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/delete_tag/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "tag_id": 111111111
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
  "dataset": "iran",
  "deleted_reports": 0
}

```

`POST /api/delete_tag/`

<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب</p>
<br><br>
# تشخیص‌های یک برچسب

این تابع، لیستی حداکثر ۵۰ تایی از تشخیص‌های مدل در برچسب مربوطه ارسال می‌کند. نمونه‌های به صورت صفحه بندی شده ارسال می‌شود که می‌توان با پارامتر page در url صفحه مورد نظر را فراخوانی کرد.
 برای فراخوانی این تابع نیاز به مشخص کردن مجموعه داده و شناسه برچسب مورد نظر می‌باشد.


## نمونه

> Request

```plaintext
"{\n  \"dataset\": \"iran\"\n  \"tag_id\": 2\n}\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "{\n  \"dataset\": \"iran\"\n  \"tag_id\": 2\n}\n" \
      https://kashf.roshan-ai.ir/api/list_tag_predictions/
```

```python
from urllib2 import Request, urlopen

values = """
"{\n  \"dataset\": \"iran\"\n  \"tag_id\": 2\n}\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_tag_predictions/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/list_tag_predictions/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = ""{\n  \"dataset\": \"iran\"\n  \"tag_id\": 2\n}\n"".getBytes(StandardCharsets.UTF_8);
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

  $url = "https://kashf.roshan-ai.ir/api/list_tag_predictions/";
  $content = json_encode(
      '"{\n  \"dataset\": \"iran\"\n  \"tag_id\": 2\n}\n"');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/list_tag_predictions/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = ""{\n  \"dataset\": \"iran\"\n  \"tag_id\": 2\n}\n"";

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
  "count": 111,
  "next": "[base_url]/api/list_tag_predictions/?page=2",
  "previous": null,
  "results": [{"id": 1385,…}, {"id": 1873984,…},…]
}

```

`POST /api/list_tag_predictions/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب</p>
<br><br>
# گزارش‌های یک برچسب

این تابع، لیستی حداکثر ۵۰ تایی از گزارش‌های برچسب مربوطه را ارسال می‌کند.  نمونه‌های به صورت صفحه بندی شده ارسال می‌شود که می‌توان با پارامتر page در url صفحه مورد نظر را فراخوانی کرد.
 برای فراخوانی این تابع نیاز به مشخص کردن مجموعه داده و شناسه برچسب مورد نظر می‌باشد.
با استفاده از پارامتر reported_positive امکان فیلتر کردن گزارش‌های مثبت یا منفی وجود دارد.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "tag_id": 2
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "tag_id": 2
} \
      https://kashf.roshan-ai.ir/api/list_tag_reports/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "tag_id": 2
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_tag_reports/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/list_tag_reports/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "tag_id": 2
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

  $url = "https://kashf.roshan-ai.ir/api/list_tag_reports/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "tag_id": 2
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/list_tag_reports/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "tag_id": 2
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
  "count": 201,
  "next": "[base_url]/api/list_tag_reports/?page=2",
  "previous": null,
  "results": [{"image": {"id": 1832, "url": "http://cdn-tehran.wisgoon.com/dlir-s3/10531458126211291615.jpg",…},…},…]
}

```

`POST /api/list_tag_reports/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب</p>
<br><br>
<dl>
<strong>reported_positive</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    false
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد تنها گزارش‌های مثبت ارسال می‌شود و اگر غیر فعال باشد تنها گزارش‌های منفی ارسال می‌شود. اگر این ویژگی None باشد همه گزارش‌های ارسال می‌شود. مقدار پیش‌فرض این ویژگی None است.</p>
<br><br>
# گزارش‌های مشکوک یک برچسب

این تابع، لیستی حداکثر ۵۰ تایی از گزارش‌های برچسب مربوطه که مدل به برچسب آن مشکوک است را ارسال می‌کند. گزارش مشکوک در واقع گزارشی است که برچسب تشخیصی مدل با برچسب گزارش شده برای نمونه متفاوت باشد. نمونه‌ها به صورت صفحه بندی شده ارسال می‌شود که می‌توان با پارامتر page در url صفحه مورد نظر را فراخوانی کرد.
 برای فراخوانی این تابع نیاز به شناسه برچسب مورد نظر می‌باشد.
با استفاده از پارامتر reported_positive امکان فیلتر کردن گزارش‌های مثبت یا منفی وجود دارد.


## نمونه

> Request

```plaintext
{
    "tag_id": 2
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "tag_id": 2
} \
      https://kashf.roshan-ai.ir/api/list_notsure_reports_list/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "tag_id": 2
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_notsure_reports_list/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/list_notsure_reports_list/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "tag_id": 2
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

  $url = "https://kashf.roshan-ai.ir/api/list_notsure_reports_list/";
  $content = json_encode(
      '{
    "tag_id": 2
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/list_notsure_reports_list/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "tag_id": 2
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
  "count": 201,
  "next": "[base_url]/api/list_tag_reports/?page=2",
  "previous": null,
  "results": [{"image": {"id": 1832, "url": "http://cdn-tehran.wisgoon.com/dlir-s3/10531458126211291615.jpg",…},…},…]
}

```

`POST /api/list_notsure_reports_list/`

<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب</p>
<br><br>
<dl>
<strong>reported_positive</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    false
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد تنها گزارش‌های مثبت ارسال می‌شود و اگر غیر فعال باشد تنها گزارش‌های منفی ارسال می‌شود. اگر این ویژگی None باشد همه گزارش‌های ارسال می‌شود. مقدار پیش‌فرض این ویژگی None است.</p>
<br><br>
# مجموعه داده‌ها

با فراخوانی این تابع لیستی از مجموعه داده‌هایی که کاربر امکان مشاهده و دسترسی به آن‌ها را دارد دریافت می‌شود.


## نمونه

> Request

```plaintext
""
```

```shell
curl  --request GET \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "" \
      https://kashf.roshan-ai.ir/api/list_datasets/
```

```python
from urllib2 import Request, urlopen

values = """
""
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_datasets/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/list_datasets/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("GET");
            http.setDoOutput(true);

            byte[] out = """".getBytes(StandardCharsets.UTF_8);
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

  $url = "https://kashf.roshan-ai.ir/api/list_datasets/";
  $content = json_encode(
      '""');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/list_datasets/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "GET";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = """";

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
[{
    "title": "ایران",
    "type": "image-tag",
    "slug": "iran",
    "tag_count": 21,
    "report_count": 2526,
    "state": "trained",
    "evaluation": {"precision": 0.94 , "recall": 0.87},
    "trained_at": ""
  }, ...]

```

`GET /api/list_datasets/`

# نمونه‌های متنی یک مجموعه

این تابع با دریافت نام مجموعه داده و لیستی از شناسه‌ نمونه‌های، در پاسخ اطلاعات نمونه‌های مربوطه را ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "persica",
    "text_ids": [
        11462988
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "persica",
    "text_ids": [
        11462988
    ]
} \
      https://kashf.roshan-ai.ir/api/list_texts/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "persica",
    "text_ids": [
        11462988
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_texts/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/list_texts/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "persica",
    "text_ids": [
        11462988
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

  $url = "https://kashf.roshan-ai.ir/api/list_texts/";
  $content = json_encode(
      '{
    "dataset": "persica",
    "text_ids": [
        11462988
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/list_texts/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "persica",
    "text_ids": [
        11462988
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
[{
    "count": 234,
    "results": [{"text": {"id": 11462988,…},…}] 
  }, ...]

```

`POST /api/list_texts/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>text_ids(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیستی از شناسه نمونه‌ها</p>
<br><br>
# نمونه‌های تصویری یک مجموعه

این تابع با دریافت نام مجموعه داده و لیستی از شناسه‌ نمونه‌های، در پاسخ اطلاعات نمونه‌های مربوطه را ارسال می‌نماید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "text_ids": [
        1832
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "text_ids": [
        1832
    ]
} \
      https://kashf.roshan-ai.ir/api/list_images/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "text_ids": [
        1832
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_images/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/list_images/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "text_ids": [
        1832
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

  $url = "https://kashf.roshan-ai.ir/api/list_images/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "text_ids": [
        1832
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/list_images/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "text_ids": [
        1832
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
{
  "count": 201,
  "results": [{"image": {"id": 1832, "url": "http://cdn-tehran.wisgoon.com/dlir-s3/10531458126211291615.jpg",…}]
}

```

`POST /api/list_images/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>images_ids(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    0
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیستی از شناسه نمونه‌ها</p>
<br><br>
# جستجو در نمونه‌های متنی

برای جستجو در متن‌های موجود در یک مجموعه داده متنی از این تابع استفاده می‌شود. این تابع مجموعه داده متنی مورد نظر و عبارت جستجو را دریافت کرده و در پاسخ متن‌های شامل عبارت در مجموعه داده را ارسال می‌نماید.
این تابع امکان جستجو در نمونه‌های گزارش نشده و یا نمونه‌های گزارش شده را فراهم می‌کند.
نتایج جستجو به صورت صفحه‌بندی شده و در لیست‌های حداکثر ۵۰ تایی ارسال می‌شود.


## نمونه

> Request

```plaintext
{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
} \
      https://kashf.roshan-ai.ir/api/search_candidate_texts/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/search_candidate_texts/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/search_candidate_texts/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
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

  $url = "https://kashf.roshan-ai.ir/api/search_candidate_texts/";
  $content = json_encode(
      '{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/search_candidate_texts/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
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
  "count": 10,
  "next": null,
  "previous": null,
  "results": [{"id": 11462939,…}, {"id": 4446967,…}, {"id": 4444533,…}, {"id": 4444455,…}, {"id": 4444260,…}, {"id": 4444137,…},…]
}

```

`POST /api/search_candidate_texts/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>query(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    None
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عبارت جستجو</p>
<br><br>
<dl>
<strong>reported</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    false
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اگر این ویژگی فعال باشد تنها در نمونه‌های گزارش شده جستجو انجام می‌شود و در غیر این صورت در نمونه‌های گزارش نشده جستجو صورت می‌گیرد.</p>
<br><br>
<dl>
<strong>tag_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  گزارش‌ها در ویژگی reported بر مبنای این ویژگی در نظر گرفته می‌شود. در واقع در صورتی که reported فعال باشد جستجو در گزارش‌های مربوط به این شناسه برچسب انجام می‌شود.</p>
<br><br>
# جستجو در نمونه‌های تصویری

با استفاده از این تابع می‌توان در نمونه‌های تصویری یک مجموعه داده تصویری جستجو انجام داد.
نتایج به صورت صفحه بندی شده و در لیست‌های حداکثر ۵۰ تایی ارسال می‌شود.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
} \
      https://kashf.roshan-ai.ir/api/search_candidate_images/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/search_candidate_images/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/search_candidate_images/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
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

  $url = "https://kashf.roshan-ai.ir/api/search_candidate_images/";
  $content = json_encode(
      '{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/search_candidate_images/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
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
  "count": 10,
  "next": null,
  "previous": null,
  "results": [{"id": 11462939,…}, {"id": 4446967,…}, {"id": 4444533,…}, {"id": 4444455,…}, {"id": 4444260,…}, {"id": 4444137,…},…]
}

```

`POST /api/search_candidate_images/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>query(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    None
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عبارت جستجو</p>
<br><br>
<dl>
<strong>tag_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب مورد نظر</p>
<br><br>
# جستجو در نمونه‌های چهره‌ها

با استفاده از این تابع می‌توان در تصاویر چهره‌ها جستجو انجام داد.


## نمونه

> Request

```plaintext
{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
} \
      https://kashf.roshan-ai.ir/api/search_candidate_faces/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/search_candidate_faces/', data=values, headers=headers)

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
            URL url = new URL("https://kashf.roshan-ai.ir/api/search_candidate_faces/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
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

  $url = "https://kashf.roshan-ai.ir/api/search_candidate_faces/";
  $content = json_encode(
      '{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://kashf.roshan-ai.ir/api/search_candidate_faces/");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
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
{"items":[{"url":"https://static1.neshanonline.com/thumbnail/yVTNvWR9IHxN/gK8fHXfDXrqfbFZCqByYQnf9bgWP7DnqxIBUmuF8jDF1YIE8vRbA5t0DEhHhnmOX/Untitled.jpg","width":null,"height":null,"data":{},"processed":null}, ...],"count":76}

```

`POST /api/search_candidate_faces/`

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام مجموعه داده</p>
<br><br>
<dl>
<strong>query(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    None
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عبارت جستجو</p>
<br><br>
<dl>
<strong>tag_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسه برچسب مورد نظر</p>
<br><br>
