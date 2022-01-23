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

<div dir=rtl>
کشف با دیدن نمونه‌هایی از یک مفهوم در متن، تصویر و یا ویدئو، آن را یاد می‌گیرد و می تواند در داده‌های جدید آن مفهوم را پیدا کند.
</div>

<blockquote dir=rtl>
برای دسترسی به واسط برنامه‌نویس کشف نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می‌شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای‌گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس kashf@roshan-ai.ir بنویسید.
</blockquote>

# تحلیل متن

`/api/tag_texts/`


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

> Content-Type: application/json

```json
[
    {
        "content": "ارزش خریدنش رو بی شک داره",
        "tags": [
            {
                "id": 39,
                "probability": 1,
                "title": "توصیه خرید"
            }
        ]
    },
    {
        "content": "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره",
        "tags": [
            {
                "id": 56,
                "probability": 1,
                "title": "عدم رضایت بعد خرید"
            }
        ]
    }
]
```

`POST /api/tag_texts/`

# تحلیل تصویر

`/api/tag_images/`


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

> Content-Type: application/json

```json
[
    {
        "image_url": "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "tags": [
            {
                "id": 1,
                "probability": 1,
                "title": "حرم رضوی"
            }
        ]
    },
    {
        "image_url": "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg",
        "tags": [
            {
                "id": 36,
                "probability": 1,
                "title": "تئاتر شهر"
            }
        ]
    }
]
```

<div dir=rtl>
می‌توانید برای همین تابع، فایل تصویر را به طور مستقیم و در قالب تقاضای <code>multipart/form-data</code> ارسال نمایید:
</div>

> curl -X POST --header "Authorization: Token TOKEN_KEY" -F "image_file=@example.jpg" -F "dataset=iran" http://kashf.roshan-ai.ir/api/tag_images

`POST /api/tag_images/`

# تحلیل فریم‌های ویدئو

`/api/tag_video_frames/`


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "every_ms": 100,
    "duration": 25,
    "min_frame_diff": 50,
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
    "every_ms": 100,
    "duration": 25,
    "min_frame_diff": 50,
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
    "every_ms": 100,
    "duration": 25,
    "min_frame_diff": 50,
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
    "every_ms": 100,
    "duration": 25,
    "min_frame_diff": 50,
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
    "every_ms": 100,
    "duration": 25,
    "min_frame_diff": 50,
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
    "every_ms": 100,
    "duration": 25,
    "min_frame_diff": 50,
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

> Content-Type: application/json

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
                        "probability": 1,
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
                        "probability": 1,
                        "title": "میدان آزادی"
                    }
                ]
            }
        ]
    }
]
```

`POST /api/tag_video_frames/`

# آموزش مدل

`/api/train_dataset/`


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

> Content-Type: application/json

```json
{
    "dataset": "iran",
    "state": "waiting"
}
```

`POST /api/train_dataset/`

# وضعیت داده‌ها

`/api/dataset_info/`


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

> Content-Type: application/json

```json
"{\n  \"title\": \"لحظه\",\n  \"state\": \"trained\",\n  \"report_count\": 935,\n  \"data_count\": 2404,\n  \"evaluation\": {\n    \"recall\": 87,\n    \"precision\": 91\n  },\n  \"tags\": [\n    {\n      \"title\": \"برج میلاد\"\n      \"id\": 3,\n      \"reports\": 116,\n      \"predictions\": 156,\n      \"evaluation\": {\n        \"recall\": 80.3,\n        \"precision\": 91.4,\n        \"f1\": 86.0\n      },\n    },\n    ...\n  ]\n}\n"
```

`POST /api/dataset_info/`

# گزارش برچسب متن

`/api/report_text_tags/`


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

> Content-Type: application/json

```json
[
    {
        "report": "[[39,true]]",
        "id": 1211592
    }
]
```

`POST /api/report_text_tags/`

# گزارش برچسب تصویر

`/api/report_image_tags/`


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

> Content-Type: application/json

```json
[
    {
        "report": "[[3,true]]",
        "id": 1211593
    }
]
```

`POST /api/report_image_tags/`

# ایجاد برچسب

`/api/create_tag/`


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

> Content-Type: application/json

```json
{
    "title": "New Place",
    "tag_id": 111111111,
    "active": true
}
```

`POST /api/create_tag/`

# ویرایش برچسب

`/api/update_tag/`


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

> Content-Type: application/json

```json
{
    "title": "Old Place",
    "tag_id": 111111111,
    "active": true
}
```

`POST /api/update_tag/`

# حذف برچسب

`/api/delete_tag/`


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

> Content-Type: application/json

```json
{
    "dataset": "iran",
    "deleted_reports": 0
}
```

`POST /api/delete_tag/`

