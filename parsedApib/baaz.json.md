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
    content: Documentation for the باز API
---

# باز

باز یک ای‌پی‌آی بومی برای جستجو در محتوای فارسی است. برای دسترسی به این ای‌پی‌آی به یک `TOKEN_KEY` نیاز دارید که می‌توانید از طریق ایمیلِ <a href="mailto:baaz@roshan-ai.ir">baaz@roshan-ai.ir</a> درخواست دهید.

# ایندکس

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسهٔ ایندکس.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr></table>

قبل از اینکه بتوانید جستجو کنید ابتدا باید داده‌ها را ایندکس کنید. این تابع با دریافت یک شناسه، محتوای شما را تحت این شناسه ایندکس می‌کند.


## ایندکس‌کردن محتوا

> Request

```plaintext
{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "title": "ماجرای نیمروز",
            "director": "محمدحسین مهدویان",
            "actors": [
                "جواد عزتی",
                "هادی حجازی‌فر"
            ],
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "data": {
                "url": "https://www.filimo.com/m/czWum"
            }
        },
        {
            "type": "movie",
            "id": 2,
            "title": "ایستاده در غبار",
            "director": "محمدحسین مهدویان",
            "labels": [
                "هیجانی",
                "جنگی"
            ],
            "importance": 50,
            "data": {
                "url": "https://www.filimo.com/m/fsa4n"
            }
        },
        {
            "type": "person",
            "id": 1,
            "title": "ابراهیم حاتمی‌کیا",
            "data": {
                "url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"
            }
        }
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "items": [
        {
            "type": "movie",
            "id": 1,
            "title": "ماجرای نیمروز",
            "director": "محمدحسین مهدویان",
            "actors": [
                "جواد عزتی",
                "هادی حجازی‌فر"
            ],
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "data": {
                "url": "https://www.filimo.com/m/czWum"
            }
        },
        {
            "type": "movie",
            "id": 2,
            "title": "ایستاده در غبار",
            "director": "محمدحسین مهدویان",
            "labels": [
                "هیجانی",
                "جنگی"
            ],
            "importance": 50,
            "data": {
                "url": "https://www.filimo.com/m/fsa4n"
            }
        },
        {
            "type": "person",
            "id": 1,
            "title": "ابراهیم حاتمی‌کیا",
            "data": {
                "url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"
            }
        }
    ]
} \
      http://api.sobhe.ir:7000/{index_name}/index
```

```python
from urllib2 import Request, urlopen

values = """
{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "title": "ماجرای نیمروز",
            "director": "محمدحسین مهدویان",
            "actors": [
                "جواد عزتی",
                "هادی حجازی‌فر"
            ],
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "data": {
                "url": "https://www.filimo.com/m/czWum"
            }
        },
        {
            "type": "movie",
            "id": 2,
            "title": "ایستاده در غبار",
            "director": "محمدحسین مهدویان",
            "labels": [
                "هیجانی",
                "جنگی"
            ],
            "importance": 50,
            "data": {
                "url": "https://www.filimo.com/m/fsa4n"
            }
        },
        {
            "type": "person",
            "id": 1,
            "title": "ابراهیم حاتمی‌کیا",
            "data": {
                "url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"
            }
        }
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/index', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/index");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "title": "ماجرای نیمروز",
            "director": "محمدحسین مهدویان",
            "actors": [
                "جواد عزتی",
                "هادی حجازی‌فر"
            ],
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "data": {
                "url": "https://www.filimo.com/m/czWum"
            }
        },
        {
            "type": "movie",
            "id": 2,
            "title": "ایستاده در غبار",
            "director": "محمدحسین مهدویان",
            "labels": [
                "هیجانی",
                "جنگی"
            ],
            "importance": 50,
            "data": {
                "url": "https://www.filimo.com/m/fsa4n"
            }
        },
        {
            "type": "person",
            "id": 1,
            "title": "ابراهیم حاتمی‌کیا",
            "data": {
                "url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"
            }
        }
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

  $url = "http://api.sobhe.ir:7000/{index_name}/index";
  $content = json_encode(
      '{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "title": "ماجرای نیمروز",
            "director": "محمدحسین مهدویان",
            "actors": [
                "جواد عزتی",
                "هادی حجازی‌فر"
            ],
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "data": {
                "url": "https://www.filimo.com/m/czWum"
            }
        },
        {
            "type": "movie",
            "id": 2,
            "title": "ایستاده در غبار",
            "director": "محمدحسین مهدویان",
            "labels": [
                "هیجانی",
                "جنگی"
            ],
            "importance": 50,
            "data": {
                "url": "https://www.filimo.com/m/fsa4n"
            }
        },
        {
            "type": "person",
            "id": 1,
            "title": "ابراهیم حاتمی‌کیا",
            "data": {
                "url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"
            }
        }
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/index");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "title": "ماجرای نیمروز",
            "director": "محمدحسین مهدویان",
            "actors": [
                "جواد عزتی",
                "هادی حجازی‌فر"
            ],
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "data": {
                "url": "https://www.filimo.com/m/czWum"
            }
        },
        {
            "type": "movie",
            "id": 2,
            "title": "ایستاده در غبار",
            "director": "محمدحسین مهدویان",
            "labels": [
                "هیجانی",
                "جنگی"
            ],
            "importance": 50,
            "data": {
                "url": "https://www.filimo.com/m/fsa4n"
            }
        },
        {
            "type": "person",
            "id": 1,
            "title": "ابراهیم حاتمی‌کیا",
            "data": {
                "url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"
            }
        }
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
            "ids": [1, 2, 1]
       }

```

برای ایندکس‌کردن محتوا درخواست خود را با متد `POST` به‌همراه پارامتر `items` ارسال کنید. هر یک از عناصر آرایهٔ `items` بیانگر یک محتواست. هر محتوا دارای یک‌سری فیلدهای اجباری و یک‌سری فیلدهای اختیاری است. جدایی از این فیلدها می‌توانید فیلدهای خودتان را هم اضافه کنید. اگر محتوایی با `type` و `id` یکسان قبلاً ایندکس شده باشد جایگزین آن می‌شود.

`POST /{index_name}/index`

<dl>
<strong>type(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    movie
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نوع محتوا را مشخص می‌کند. درواقع هر `type` نمایندهٔ یک دسته از محتواست. مثلاً در نمونهٔ مقابل، مشخصات فیلم‌ها با تایپ movie و مشخصات افراد با تایپ `person` ارسال شده است. این فیلد قابل جستجو نیست.</p>
<br><br>
<dl>
<strong>id(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    1
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسهٔ محتواست که باید در سطح هر `type` منحصربه‌فرد باشد. اگر محتوایی با `type` و `id` یکسان ارسال شود خطایی صادر نمی‌شود بلکه محتوای جدید جایگزین قبلی می‌شود.</p>
<br><br>
<dl>
<strong>title(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    ماجرای نیمروز
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عنوان محتواست که مهم‌ترین عامل در رتبه‌بندی نتایج جستجو است. در هنگام جستجو اگر هیچ فیلدی برای جستجو انتخاب نشود جستجو به صورت پیش‌فرض روی این فیلد صورت می‌گیرد.</p>
<br><br>
<dl>
<strong>importance</strong>
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
<img src="./images/vector.svg" alt="vector">  میزان اهمیت محتواست. هرچه این عدد بیشتر باشد جایگاه محتوا در نتایج جستجو بالاتر است. این فیلد قابل جستجو نیست و فقط روی ترتیب نتایج جستجو اثر می‌گذارد.</p>
<br><br>
<dl>
<strong>time</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    2017
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  07-08 10:30:00 (string) - تاریخ محتواست. هرچه این تاریخ جدیدتر باشد جایگاه محتوا در نتایج جستجو بالاتر است. این فیلد قابل جستجو نیست و فقط روی ترتیب نتایج جستجو اثر می‌گذارد.</p>
<br><br>
<dl>
<strong>labels</strong>
<br>
<br>
Value: [هیجانی, ماجراجویی, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  برای هر محتوایی می‌توانید برچسب‌هایی تعریف کنید. این فیلد قابل جستجو نیست و صرفاً برای محدودکردن نتایج کاربرد دارد.</p>
<br><br>
<dl>
<strong>...</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    ...
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  به جز فیلدهای بالا هر فیلد دیگری می‌توانید تعریف کنید. این فیلدها قابل جستجو هستند و بعداً می‌توانید نتایج جستجو را بر اساس آن محدود کنید. فیلدهایی که اضافه می‌کنید فقط باید حاوی متن باشند. این فیلد می‌تواند یک **فیلد ساده حاوی متن** باشد مثل `director` در مثال مقابل یا یک **آرایهٔ حاوی مقادیر متنی** مثل `actors` یا یک **کلاس حاوی مقادیر متنی** مثل `data`.</p>
<br><br>
## ویرایش محتوای ایندکس

> Request

```plaintext
{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "importance": 200
        }
    ]
}
```

```shell
curl  --request PUT \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "items": [
        {
            "type": "movie",
            "id": 1,
            "importance": 200
        }
    ]
} \
      http://api.sobhe.ir:7000/{index_name}/index
```

```python
from urllib2 import Request, urlopen

values = """
{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "importance": 200
        }
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/index', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/index");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("PUT");
            http.setDoOutput(true);

            byte[] out = "{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "importance": 200
        }
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

  $url = "http://api.sobhe.ir:7000/{index_name}/index";
  $content = json_encode(
      '{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "importance": 200
        }
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/index");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "PUT";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "items": [
        {
            "type": "movie",
            "id": 1,
            "importance": 200
        }
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
            "ids": [1]
       }

```

برای ویرایش محتوای یک ایندکس درخواست خود را با متد `PUT` ارسال کنید و در بدنهٔ درخواست، آرایهٔ `items` را به‌همراه فیلدهایی که می‌خواهید مقدارشان تغییر کند ضمیمه کنید. در هر محتوا واردکردن دو فیلد `type` و `id` برای یافتن محتوا ضروری است. به‌جز این‌ها هر فیلد دیگری وارد کنید مقدار آن‌ها ویرایش می‌شود. بقیهٔ فیلدهایی که وارد نکرده‌اید دست‌نخورده باقی می‌مانند. مثلاً در نمونهٔ مقابل، محتوایی با تایپ movie و شناسهٔ ۱ در ایندکس جستجو می‌شود و مقدار فیلد importance آن به ۲۰۰ تغییر می‌کند.

`PUT /{index_name}/index`

## حذف محتوای ایندکس

> Request

```plaintext
{
    "type": "movie",
    "ids": [
        2
    ]
}
```

```shell
curl  --request DELETE \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "type": "movie",
    "ids": [
        2
    ]
} \
      http://api.sobhe.ir:7000/{index_name}/index
```

```python
from urllib2 import Request, urlopen

values = """
{
    "type": "movie",
    "ids": [
        2
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/index', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/index");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("DELETE");
            http.setDoOutput(true);

            byte[] out = "{
    "type": "movie",
    "ids": [
        2
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

  $url = "http://api.sobhe.ir:7000/{index_name}/index";
  $content = json_encode(
      '{
    "type": "movie",
    "ids": [
        2
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/index");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "DELETE";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "type": "movie",
    "ids": [
        2
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
            "ids": [2]
       }

```

برای حذف یک یا چند محتوا درخواست خود را با متد `DELETE` ارسال کنید و در بدنهٔ درخواست دو پارامتر `type` و `ids` را مقداردهی کنید. با ارسال این درخواست آن دسته از محتواهایی که نوعشان برابر `type` است و شناسه‌شان در آرایهٔ `ids` وجود دارد از ایندکس حذف می‌شوند. <mark>اگر هیچ پارامتری وارد نکنید کل ایندکس حذف می‌شود.</mark> 

`DELETE /{index_name}/index`

# جستجوی معمولی

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسهٔ ایندکسی که می‌خواهید در آن جستجو شود.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr>
<tr>
<td>
انواعی که می‌خواهید در آن‌ها جستجو شود. بیشتر از یک نوع را با کاراکتر خط عمودی `|` از هم جدا کنید.
</td>
<td style="font-weight: bold">
types
</td>
</tr>
<tr>
<td>
عبارت جستجو
</td>
<td style="font-weight: bold">
text
</td>
</tr>
<tr>
<td>
فیلد یا فیلدهایی که می‌خواهید در آن‌ها جستجو شود. بیشتر از یک فیلد را با کاراکتر خط عمودی `|` از هم جدا کنید. اگر هیچ فیلدی وارد نکنید جستجو به‌طور‌ پیش‌فرض در فیلد `Title` صورت می‌گیرد.
</td>
<td style="font-weight: normal">
fields
</td>
</tr>
<tr>
<td>
تعداد نتایج جستجو را مشخص می‌کند. این پارامتر اختیاری است و اگر ارسال نکنید کل نتایج جستجو نمایش داده می‌شود.
</td>
<td style="font-weight: normal">
size
</td>
</tr>
<tr>
<td>
بعد از ارسال درخواستِ جستجو، آرایه‌ای از نتایج بازگردانده می‌شود. با تنظیم پارمتر `from` بیان می‌کنید که نتایج از کدام شماره بازگردد؛ مثلاً ۰ یعنی از ابتدا همه را نشان بده. ۲ یعنی از سومین عنصر به بعد نشان بده. این پارامتر نیز همانند `size` اختیاری است و مقدار پیش‌فرض آن ۰ است یعنی همهٔ نتایج نشان داده می‌شود.
</td>
<td style="font-weight: normal">
from
</td>
</tr></table>

عبارتی را در یک ایندکس جستجو می‌کند. این تابع در صورت وجود اشتباه در عبارت جستجو منظور کاربر را حدس می‌زند و در پارامتر `didYouMean` حدس خود را برمی‌گرداند و برمبنای همین حدس، نتایج جستجو را باز می‌گرداند.


## مثال

> Request

```plaintext
""
```

```shell
curl  --request GET \ 
      \
      --data-binary "" \
      http://api.sobhe.ir:7000/{index_name}/{types}/query{?fields,text,size,from}
```

```python
from urllib2 import Request, urlopen

values = """
""
"""

headers = {
  
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/query{?fields,text,size,from}', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/query{?fields,text,size,from}");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("GET");
            http.setDoOutput(true);

            byte[] out = """".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/query{?fields,text,size,from}";
  $content = json_encode(
      '""');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/query{?fields,text,size,from}");

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
{
    "items": [
        {
            "_score": 9.680344,
            "highlight": {
                "title": [
                    "ماجرای <em>نیمروز</em>"
                ]
            },
            "id": "1",
            "title": "ماجرای نیمروز",
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100,
            "type": "movie"
        }
    ],
    "didYouMean": "<em>نیمروز</em>"
}


```

خروجی مقابل در پاسخ به این درخواست است:

`http://api.sobhe.ir:7000/index1/movie/query?text=نیم‌روز&fields=title&size=2&from=0`

عبارت `نیم‌روز` در فیلد `title` تمام آیتم‌های موجود در `index1` که تایپ آن `movie` است جستجو می‌شود و نتایج از آیتم شمارهٔ `۰` به‌بعد و به تعداد `۲` عدد بازمی‌گردد. در مثال مقابل چون فقط یک نتیجه وجود داشته همان یک نتیجه بازگردانده شده است.

`GET /{index_name}/{types}/query{?fields,text,size,from}`

# جستجوی درلحظه‌

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسهٔ ایندکسی که می‌خواهید در آن جستجو شود.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr>
<tr>
<td>
انواعی که می‌خواهید در آن‌ها جستجو شود. بیشتر از یک نوع را با کاراکتر خط عمودی `|` از هم جدا کنید.
</td>
<td style="font-weight: bold">
types
</td>
</tr>
<tr>
<td>
عبارت جستجو
</td>
<td style="font-weight: bold">
text
</td>
</tr>
<tr>
<td>
تعداد نتایج جستجو را مشخص می‌کند. این پارامتر اختیاری است و اگر ارسال نکنید کل نتایج جستجو نمایش داده می‌شود.
</td>
<td style="font-weight: normal">
size
</td>
</tr>
<tr>
<td>
بعد از ارسال درخواستِ جستجو، آرایه‌ای از نتایج بازگردانده می‌شود. با تنظیم پارمتر `from` بیان می‌کنید که نتایج از کدام شماره بازگردد؛ مثلاً ۰ یعنی از ابتدا همه را نشان بده. ۲ یعنی از سومین عنصر به بعد نشان بده. این پارامتر نیز همانند `size` اختیاری است و مقدار پیش‌فرض آن ۰ است یعنی همهٔ نتایج نشان داده می‌شود.
</td>
<td style="font-weight: normal">
from
</td>
</tr></table>

این تابع همزمان با تایپ کاربر جستجو می‌کند و دو تفاوت مهم با <a href="#5a91792863">جستجوی معمولی</a> دارد. اولاً فقط در فیلد title جستجو می‌کند و دوماً اگر بخشی از کلمه نیز در فیلد title وجود داشته باشد به عنوان نتیجه بازمی‌گرداند. به‌عنوان مثال در نمونه‌درخواست مقابل با جستجوی «ماجر»، فیلم «ماجرای نیمروز» جزو یکی از نتایج است. دقت کنید این تابع جستجو را فقط از ابتدای کلمه انجام می‌دهد. یعنی مثلاً‌ در نمونهٔ مقابل با جستجوی «ماجر»، «نیم» و «ماجرای نیمر» به نتایج مشابهی می‌رسید ولی جستجوی «جرای»، «روز» نتایجی در پی نخواهد داشت چون این‌ها بخشی از ابتدای کلمات نیست.


## مثال

> Request

```plaintext
""
```

```shell
curl  --request GET \ 
      \
      --data-binary "" \
      http://api.sobhe.ir:7000/{index_name}/{types}/complete{?text,size,from}
```

```python
from urllib2 import Request, urlopen

values = """
""
"""

headers = {
  
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/complete{?text,size,from}', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/complete{?text,size,from}");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("GET");
            http.setDoOutput(true);

            byte[] out = """".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/complete{?text,size,from}";
  $content = json_encode(
      '""');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/complete{?text,size,from}");

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
{
    "items": [
        {
            "_score": 3.3929849,
            "highlight": {
                "title": [
                    "<em>ماجرای</em> نیمروز"
                ]
            },
            "id": "1",
            "type": "movie",
            "title": "ماجرای نیمروز",
            "labels": [
                "هیجانی",
                "ماجراجویی"
            ],
            "importance": 100
        }
    ]
}


```

`GET /{index_name}/{types}/complete{?text,size,from}`

# ‌پیشنهاد جستجو

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسهٔ ایندکسی که می‌خواهید در آن جستجو شود.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr>
<tr>
<td>
انواعی که می‌خواهید در آن‌ها جستجو شود. بیشتر از یک نوع را با کاراکتر خط عمودی `|` از هم جدا کنید.
</td>
<td style="font-weight: bold">
types
</td>
</tr>
<tr>
<td>
عبارت جستجو
</td>
<td style="font-weight: bold">
text
</td>
</tr></table>

این تابع همزمان با جستجوی کاربر، با بررسی تاریخچهٔ جستجوهای قبلی، عبارات مناسبی برای جستجو پیشنهاد می‌دهد.


## مثال

> Request

```plaintext
""
```

```shell
curl  --request GET \ 
      \
      --data-binary "" \
      http://api.sobhe.ir:7000/{index_name}/{types}/suggest{?text}
```

```python
from urllib2 import Request, urlopen

values = """
""
"""

headers = {
  
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/suggest{?text}', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/suggest{?text}");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("GET");
            http.setDoOutput(true);

            byte[] out = """".getBytes(StandardCharsets.UTF_8);
            int length = out.length;

            http.setFixedLengthStreamingMode(length);
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/suggest{?text}";
  $content = json_encode(
      '""');
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER,
          array(
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/suggest{?text}");

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
{
    "items": [
        {
        "text": "نیم‌روز",
        "count": 2
        }
    ]
}


```

`GET /{index_name}/{types}/suggest{?text}`

# محتواهای مشابه

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسهٔ ایندکسی که می‌خواهید در آن جستجو شود.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr>
<tr>
<td>
انواعی که می‌خواهید در آن‌ها جستجو شود. بیشتر از یک نوع را با کاراکتر خط عمودی `|` از هم جدا کنید.
</td>
<td style="font-weight: bold">
types
</td>
</tr></table>

با دریافت اطلاعات مربوط به یک محتوا، شبیه‌ترین محتواها را به‌همراه میزان مشابهت هر یک از آن‌ها برمی‌گرداند. تنها وارد کردن فیلد `Title‌` در بدنهٔ این درخواست اجباری است. بقیهٔ فیلدها اختیاری است. هرچه فیلدهای بیشتری وارد کنید نتایج جستجو دقیق‌تر می‌شود. همچنین شما فقط می‌توانید فیلدهای دارای مقادیر متنی را وارد کنید.


## مثال

> Request

```plaintext
{
    "title": "پرویز"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "title": "پرویز"
} \
      http://api.sobhe.ir:7000/{index_name}/{types}/similars
```

```python
from urllib2 import Request, urlopen

values = """
{
    "title": "پرویز"
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/similars', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/similars");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "title": "پرویز"
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/similars";
  $content = json_encode(
      '{
    "title": "پرویز"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/similars");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "title": "پرویز"
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
    "items": [
        {
        "title": "پرویز",
        "similarity": 100,
        ...
        },
        ...
    ]
}


```

`POST /{index_name}/{types}/similars`

# محتواهای منبع

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسه ایندکس.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr>
<tr>
<td>
فهرست نوع محتواها که با کاراکتر خط عمودی | به هم متصل شده‌اند.
</td>
<td style="font-weight: bold">
types
</td>
</tr></table>

با دریافت اطلاعات مربوط به یک محتوا، منابعی را که این محتوا با استفاده از آنها درست شده یافته و میزان تشابه را برای هر بخش مشخص می‌کند.


## مثال

> Request

```plaintext
"       {\n         \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},              \n       }\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "       {\n         \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},              \n       }\n" \
      http://api.sobhe.ir:7000/{index_name}/{types}/sources
```

```python
from urllib2 import Request, urlopen

values = """
"       {\n         \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},              \n       }\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/sources', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/sources");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = ""       {\n         \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},              \n       }\n"".getBytes(StandardCharsets.UTF_8);
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/sources";
  $content = json_encode(
      '"       {\n         \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},              \n       }\n"');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/sources");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = ""       {\n         \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},              \n       }\n"";

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
    "items": [
        {
        "similarity": 100,
        "src_link": "/baaz/movie/view?id=3",
        "src_title": "شهر موشها",
        "susp_from": 0,
        "susp_to": 247,
        "src_from": 0,
        "src_to": 247,
        "src_text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند."
        }
    ]
}


```

`POST /{index_name}/{types}/sources`

# ‌عبارات کلیدی

<p style="font-size: 20px;font-family:IRANYekan;">پارامتر های آدرس</p>
<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>
<tr>
<td>
شناسهٔ ایندکسی که می‌خواهید در آن جستجو شود.
</td>
<td style="font-weight: bold">
index_name
</td>
</tr>
<tr>
<td>
انواعی که می‌خواهید در آن‌ها جستجو شود. بیشتر از یک نوع را با کاراکتر خط عمودی `|` از هم جدا کنید.
</td>
<td style="font-weight: bold">
types
</td>
</tr>
<tr>
<td>
عبارت جستجو
</td>
<td style="font-weight: bold">
text
</td>
</tr>
<tr>
<td>
فیلدی که محتوای متنی در آن ذخیره شده است.
</td>
<td style="font-weight: normal">
field
</td>
</tr></table>

عبارات کلیدیِ یک متن را استخراج می‌کند. این عبارات در هر ایندکس ممکن است متفاوت باشد. در واقع، برای یک متن واحد، بسته به اینکه در درخواست خود شناسهٔ کدام ایندکس را وارد کرده‌اید ممکن است نتایج متفاوتی دریافت کنید.


## مثال: درخواست با متنِ محتوا

> Request

```plaintext
"       {\n         \"text\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\",\n         \"topn\": 5            \n       }\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "       {\n         \"text\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\",\n         \"topn\": 5            \n       }\n" \
      http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms
```

```python
from urllib2 import Request, urlopen

values = """
"       {\n         \"text\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\",\n         \"topn\": 5            \n       }\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = ""       {\n         \"text\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\",\n         \"topn\": 5            \n       }\n"".getBytes(StandardCharsets.UTF_8);
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms";
  $content = json_encode(
      '"       {\n         \"text\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\",\n         \"topn\": 5            \n       }\n"');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = ""       {\n         \"text\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\",\n         \"topn\": 5            \n       }\n"";

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
  "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
  "items": [
    [
      "شهر موشها",
      0.02682
    ],
    [
      "سال ۱۳۶۴",
      0.03944
    ],
    [
      "محمدعلی طالبی",
      0.03944
    ],
    [
      "مرضیه برومند",
      0.03944
    ],
    [
      "فیلم سینمایی",
      0.07857
    ]
  ]
}


```

`POST /{index_name}/{types}/{field}/keyterms`

## مثال: درخواست با شناسهٔ محتوا

> Request

```plaintext
"       {\n         \"id\": 3,\n         \"topn\": 5            \n       }\n"
```

```shell
curl  --request GET \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "       {\n         \"id\": 3,\n         \"topn\": 5            \n       }\n" \
      http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms
```

```python
from urllib2 import Request, urlopen

values = """
"       {\n         \"id\": 3,\n         \"topn\": 5            \n       }\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("GET");
            http.setDoOutput(true);

            byte[] out = ""       {\n         \"id\": 3,\n         \"topn\": 5            \n       }\n"".getBytes(StandardCharsets.UTF_8);
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms";
  $content = json_encode(
      '"       {\n         \"id\": 3,\n         \"topn\": 5            \n       }\n"');
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "GET";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = ""       {\n         \"id\": 3,\n         \"topn\": 5            \n       }\n"";

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
  "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
  "items": [
    [
      "شهر موشها",
      0.02682
    ],
    [
      "سال ۱۳۶۴",
      0.03944
    ],
    [
      "محمدعلی طالبی",
      0.03944
    ],
    [
      "مرضیه برومند",
      0.03944
    ],
    [
      "فیلم سینمایی",
      0.07857
    ]
  ]
}


```

`GET /{index_name}/{types}/{field}/keyterms`

