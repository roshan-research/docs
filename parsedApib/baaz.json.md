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

باز قرار است تجربه جستجوی هوشمند را برای خدمات وب فارسی فراهم کند تا مخاطب آسان‌تر به نتیجه مطلوب برسد.

برای دسترسی به واسط برنامه‌نویس باز، نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می‌شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای‌گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس baaz@sobhe.ir بنویسید.

# نمایه‌سازی

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr></table>

برای جستجوی اسناد ابتدا باید آنها را نمایه کنید. نمایه جستجو در واقع بخشی از پایگاه داده‌ها است که انتظار دارید، کاربر با نوشتن عبارت مورد نظر، نتیجه را از میان آنها پیدا کند.


## ثبت داده‌ها

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

این تابع امکان افزودن اسناد به  نمایه را فراهم می‌کند. ورودی items برای این تابع، شامل فهرستی از اسناد است که هر کدام از آنها باید در نمایه ثبت شوند.

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
<img src="./images/vector.svg" alt="vector">  این ویژگی نوع سند را مشخص می‌کند و برای محدود کردن دامنه جستجو استفاده می‌شود</p>
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
<img src="./images/vector.svg" alt="vector">  شناسه سند که در هر «نوع»، ویژگی یکتا محسوب می‌شود</p>
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
<img src="./images/vector.svg" alt="vector">  عنوان سند که مهم‌ترین ویژگی متنی در رتبه‌بندی نتایج است</p>
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
<img src="./images/vector.svg" alt="vector">  هر چه میزان اهمیت یک سند بالاتر باشد، رتبه آن در میان نتایج بالاتر است</p>
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
<img src="./images/vector.svg" alt="vector">  07-08 10:30:00 (string) - هر چه زمان ایجاد سند به زمان حال نزدیکتر باشد، رتبه آن در میان نتایج بالاتر است</p>
<br><br>
<dl>
<strong>labels</strong>
<br>
<br>
Value: [هیجانی, ماجراجویی, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  مجموعه برچسب‌های سند که جستجو نمی‌شوند و فقط برای محدود کردن نتایج مورد استفاده قرار می‌گیرند</p>
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
<img src="./images/vector.svg" alt="vector">  هر ویژگی دیگری در قالب «نوشته» یا «نوشته‌ها» می‌تواند برای سند ثبت شود و مورد جستجو قرار گیرد</p>
<br><br>
## ویرایش داده‌ها

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

این تابع امکان ویرایش اسناد ثبت‌شده را فراهم می‌کند. برای این منظور، کافیست داده‌های جدید به همراه type و id سند فرستاده شوند. توجه کنید که در هنگام به‌روزرسانی، فقط اطلاعات ارسال‌شده ذخیره می‌شوند و دیگر ویژگی‌های سند، تغییر نمی‌کنند.

`PUT /{index_name}/index`

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
<img src="./images/vector.svg" alt="vector">  این ویژگی نوع سند را مشخص می‌کند و برای محدود کردن دامنه جستجو استفاده می‌شود</p>
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
<img src="./images/vector.svg" alt="vector">  شناسه سند که در هر «نوع»، ویژگی یکتا محسوب می‌شود</p>
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
<img src="./images/vector.svg" alt="vector">  عنوان سند که مهم‌ترین ویژگی متنی در رتبه‌بندی نتایج است</p>
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
<img src="./images/vector.svg" alt="vector">  هر چه میزان اهمیت یک سند بالاتر باشد، رتبه آن در میان نتایج بالاتر است</p>
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
<img src="./images/vector.svg" alt="vector">  07-08 10:30:00 (string) - هر چه زمان ایجاد سند به زمان حال نزدیکتر باشد، رتبه آن در میان نتایج بالاتر است</p>
<br><br>
<dl>
<strong>labels</strong>
<br>
<br>
Value: [هیجانی, ماجراجویی, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  مجموعه برچسب‌های سند که جستجو نمی‌شوند و فقط برای محدود کردن نتایج مورد استفاده قرار می‌گیرند</p>
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
<img src="./images/vector.svg" alt="vector">  هر ویژگی دیگری در قالب «نوشته» یا «نوشته‌ها» می‌تواند برای سند ثبت شود و مورد جستجو قرار گیرد</p>
<br><br>
## حذف داده‌ها

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

این تابع امکان حذف مجموعه‌ای از اسناد را فراهم می‌کند. ویژگی type نمایش‌دهنده نوع اسناد است و ids شناسه آنها را مشخص می‌کند.
 **در صورتی که پارامتری همراه با این درخواست ارسال نشود. کل ایندکس پاک خواهد شد.**

`DELETE /{index_name}/index`

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
<img src="./images/vector.svg" alt="vector">  این ویژگی نوع سند را مشخص می‌کند و برای محدود کردن دامنه جستجو استفاده می‌شود</p>
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
<img src="./images/vector.svg" alt="vector">  شناسه سند که در هر «نوع»، ویژگی یکتا محسوب می‌شود</p>
<br><br>
# جستجوی اسناد

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست دسته‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
types
</td>
<td>
movie|person
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
عبارت مورد جستجو
</td>
<td>
text
</td>
<td>
نیم‌روز
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست ویژگی‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
fields
</td>
<td>
title|director
</td>
<td>
false
</td>
</tr>
<tr>
<td>
number
</td>
<td>
تعداد نتایج در پاسخ
</td>
<td>
size
</td>
<td>
10
</td>
<td>
false
</td>
</tr>
<tr>
<td>
number
</td>
<td>
نقطه شروع برای صفحه‌بندی نتایج
</td>
<td>
from
</td>
<td>
0
</td>
<td>
false
</td>
</tr></table>


## نمونه

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
  "didYouMean": "<em>نیمروز</em>",
  "items": [
    {
      "type": "movie",
      "id": "1",
      "item": {
        "title": "ماجرای نیمروز",
        "director": "محمدحسین مهدویان",
        "labels": ["هیجانی", "ماجراجویی"],
        "actors": ["جواد عزتی", "هادی حجازی‌فر"],
        "importance": 100,
        "data": {"url": "https://www.filimo.com/m/czWum"}
      },
      "highlight": {
        "title": ["ماجرای <em>نیمروز</em>"]
      },
      "_score": 7.0999684
    }
  ]
}

```

داده‌های نمایه‌شده با استفاده از این تابع قابل جستجو هستند. گاهی پیش می‌آید که کاربر عبارت مورد نظرش را اشتباه می‌نویسد؛ در این مواقع، پاسخ جستجو با ویژگی didYouMean همراه است که واژه‌های اصلاح‌شده، در آن با تگ‌های تاکید مشخص شده‌اند.

`GET /{index_name}/{types}/query{?fields,text,size,from}`

# جستجوی در لحظه‌

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست دسته‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
types
</td>
<td>
person
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
عبارت مورد جستجو
</td>
<td>
text
</td>
<td>
ابراهیم حا
</td>
<td>
true
</td>
</tr>
<tr>
<td>
number
</td>
<td>
تعداد نتایج در پاسخ
</td>
<td>
size
</td>
<td>
10
</td>
<td>
false
</td>
</tr>
<tr>
<td>
number
</td>
<td>
نقطه شروع برای صفحه‌بندی نتایج
</td>
<td>
from
</td>
<td>
0
</td>
<td>
false
</td>
</tr></table>


## نمونه

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
      "type": "person",
      "id": "1",
      "item": {
        "title": "ابراهیم حاتمی‌کیا",
        "importance": 1,
        "data": {"url": "https://www.filimo.com/crew/ابراهیم_حاتمی_کیا"}
      },
      "highlight": {
        "title": ["<em>ابراهیم حاتمی‌کیا</em>"]
      },
      "_score": 2.5382035
    }
  ]
}

```

تابع جستجوی در لحظه برای استفاده در مواقعی است که با هر بار فشار دادن کلید توسط مخاطب، جستجو انجام می‌شود. در واقع این تابع فرض می‌کند که آخرین کلمه عبارت، هنوز تکمیل نشده است. در این روش، کاربر سریع‌تر به نتیجه مطلوب دست می‌یابد.

`GET /{index_name}/{types}/complete{?text,size,from}`

# ‌پیشنهاد جستجو

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست دسته‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
types
</td>
<td>
movie
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
عبارت مورد جستجو
</td>
<td>
text
</td>
<td>
ن
</td>
<td>
true
</td>
</tr></table>


## نمونه

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

وقتی کاربر در حال نوشتن عبارت مورد نظر است، باز با استفاده از جستجوهای قبلی، تلاش می‌کند به کاربر عبارت مناسبی را برای جستجو پیشنهاد دهد.

`GET /{index_name}/{types}/suggest{?text}`

# ‌اسناد مشابه

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست دسته‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
types
</td>
<td>
movie
</td>
<td>
true
</td>
</tr></table>


## نمونه

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

تابع اسناد مشابه، با دریافت اطلاعات مربوط به یک سند، شبیه‌ترین گزینه‌ها را به سند مورد نظر پیدا کرده و میزان تشابه هر کدام را مشخص می‌کند.

`POST /{index_name}/{types}/similars`

# ‌اسناد منبع

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست دسته‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
types
</td>
<td>
movie
</td>
<td>
true
</td>
</tr></table>


## نمونه

> Request

```plaintext
"{\n  \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},            \n}\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "{\n  \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},            \n}\n" \
      http://api.sobhe.ir:7000/{index_name}/{types}/sources
```

```python
from urllib2 import Request, urlopen

values = """
"{\n  \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},            \n}\n"
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

            byte[] out = ""{\n  \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},            \n}\n"".getBytes(StandardCharsets.UTF_8);
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
      '"{\n  \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},            \n}\n"');
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
                string json = ""{\n  \"doc\": {\"description\": \"شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.\"},            \n}\n"";

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

تابع اسناد منبع، با دریافت اطلاعات مربوط به یک سند، منابعی را که این سند با استفاده از آنها درست شده است، پیدا کرده و میزان تشابه را برای هر بخش مشخص می‌کند.

`POST /{index_name}/{types}/sources`

# ‌عبارات کلیدی

<table>
    <tr>
        <th>
            title
        </th>
        <th>
            description
        </th>
        <th>
            key
        </th>
        <th>
            value
        </th>
        <th>
            required
        </th>
    </tr>
<tr>
<td>
string
</td>
<td>
شناسه نمایه
</td>
<td>
index_name
</td>
<td>
baaz
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فهرست دسته‌ها که با نویسه خط (|) به هم متصل شده‌اند
</td>
<td>
types
</td>
<td>
movie
</td>
<td>
true
</td>
</tr>
<tr>
<td>
string
</td>
<td>
فیلدی که محتوای متنی در آن ذخیره شده است
</td>
<td>
field
</td>
<td>
description
</td>
<td>
true
</td>
</tr></table>


## نمونه درخواست با متن سند

> Request

```plaintext
{
    "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
    "topn": 5
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
    "topn": 5
} \
      http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms
```

```python
from urllib2 import Request, urlopen

values = """
{
    "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
    "topn": 5
}
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

            byte[] out = "{
    "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
    "topn": 5
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms";
  $content = json_encode(
      '{
    "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
    "topn": 5
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "text": "شهر موشها فیلم سینمایی عروسکی تولیدی سال ۱۳۶۴ به کارگردانی سینمایی محمدعلی طالبی و کارگردانی عروسکی مرضیه برومند است. این فیلم سینمایی برای ردهٔ سنی کودکان ساخته شده و عروسک‌های بازیگر آن قبلاً در سریال تلویزیونی مدرسه موش‌ها ایفای نقش کرده بودند.",
    "topn": 5
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

این تابع عبارت‌های کلیدی را در متن مورد نظر استخراج می‌کند. فرآیند تشخیص و استخراج عبارات کلیدی بر مبنای ایندکسی انجام می‌شود که مشخص شده است. در واقع عبارت کلیدی در یک متن واحد ممکن است با تغییر ایندکس متفاوت باشد.

`POST /{index_name}/{types}/{field}/keyterms`

## نمونه درخواست با شناسه

> Request

```plaintext
{
    "id": 3,
    "topn": 5
}
```

```shell
curl  --request GET \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "id": 3,
    "topn": 5
} \
      http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms
```

```python
from urllib2 import Request, urlopen

values = """
{
    "id": 3,
    "topn": 5
}
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

            byte[] out = "{
    "id": 3,
    "topn": 5
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

  $url = "http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms";
  $content = json_encode(
      '{
    "id": 3,
    "topn": 5
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir:7000/{index_name}/{types}/{field}/keyterms");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "GET";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "id": 3,
    "topn": 5
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

این تابع عبارت‌های کلیدی را در یکی از اسناد ایندکس شده استخراج می‌کند. شناسه سند استخراج شده به عنوان پارامتر ارسال می‌شود.

`GET /{index_name}/{types}/{field}/keyterms`

