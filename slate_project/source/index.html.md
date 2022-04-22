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
    content: Documentation for the Parde API
---

# Parde

پرده تصاویر نامناسب را تشخیص می‌دهد.

برای دسترسی به واسط برنامه‌نویس پرده نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می‌شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای‌گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس parde@roshan-ai.ir بنویسید.

# تحلیل تصاویر

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
    </tr></table>


## Request

> Request

```plaintext
{
    "image_urls": [
        "http://www.sobhe.ir/baaz/img/goshawk.jpg"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "image_urls": [
        "http://www.sobhe.ir/baaz/img/goshawk.jpg"
    ]
} \
      http://api.sobhe.ir/parde/api/tag_images
```

```python
from urllib2 import Request, urlopen

values = """
{
    "image_urls": [
        "http://www.sobhe.ir/baaz/img/goshawk.jpg"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir/parde/api/tag_images', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir/parde/api/tag_images");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "image_urls": [
        "http://www.sobhe.ir/baaz/img/goshawk.jpg"
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

  $url = "http://api.sobhe.ir/parde/api/tag_images";
  $content = json_encode(
      '{
    "image_urls": [
        "http://www.sobhe.ir/baaz/img/goshawk.jpg"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir/parde/api/tag_images");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "image_urls": [
        "http://www.sobhe.ir/baaz/img/goshawk.jpg"
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
[{"image_url":"http://www.sobhe.ir/baaz/img/goshawk.jpg","tags":[]}]

```

با استفاده از این تابع می‌توانید برای برچسب‌های مربوط به تصاویر مورد نظر خود را از پرده بپرسید. برچسب‌های تصاویر شامل لیستی آیتم‌هاست که هر آیتم شامل آدرس تصویر، و لیستی از برچسب‌هاست که هر برچسب شامل نام برچسب و عددی بین ۰ و ۱ به عنوان میزان اطمینان از برچسب، می‌باشد.
برای بازدهی بهتر می‌توانید برچسب چند تصویر را در یک درخواست از پرده بپرسید.

`POST /parde/api/tag_images`

<dl>
<strong>image_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس تصاویر</p>
<br><br>
# فریم‌های کلیدی ویدئو

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
    </tr></table>

با استفاده از این تابع می‌توانید برچسب مربوط به فریم‌های کلیدی یک ویدئو را از پرده بپرسید. پاسخ سرور لیستی از فریم‌ها به همراه برچسب مربوط به آن‌ها می‌باشد.


## Request

> Request

```plaintext
{
    "video_urls": [
        "URL"
    ],
    "every_ms": 100,
    "min_frame_diff": 0.4,
    "duration": 25,
    "wait": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "video_urls": [
        "URL"
    ],
    "every_ms": 100,
    "min_frame_diff": 0.4,
    "duration": 25,
    "wait": true
} \
      http://api.sobhe.ir/parde/api/tag_video_frames
```

```python
from urllib2 import Request, urlopen

values = """
{
    "video_urls": [
        "URL"
    ],
    "every_ms": 100,
    "min_frame_diff": 0.4,
    "duration": 25,
    "wait": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir/parde/api/tag_video_frames', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir/parde/api/tag_video_frames");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "video_urls": [
        "URL"
    ],
    "every_ms": 100,
    "min_frame_diff": 0.4,
    "duration": 25,
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

  $url = "http://api.sobhe.ir/parde/api/tag_video_frames";
  $content = json_encode(
      '{
    "video_urls": [
        "URL"
    ],
    "every_ms": 100,
    "min_frame_diff": 0.4,
    "duration": 25,
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir/parde/api/tag_video_frames");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "video_urls": [
        "URL"
    ],
    "every_ms": 100,
    "min_frame_diff": 0.4,
    "duration": 25,
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

```json
[{"video_url":"https://hajifirouz6.cdn.asset.aparat.cloud/aparat-video/2a6a6ecede3579f0f58bd99d37cfa9ef42917772-240p.mp4","frames":[{"frame":6,"time":"0:00:00","tags":[]},{"frame":31,"time":"0:00:01","tags":[]},{"frame":36,"time":"0:00:01","tags":[]},...,{"frame":475,"time":"0:00:18","tags":[{"id":86141,"probability":0.32,"title":"خشونت"}]},{"frame":560,"time":"0:00:22","tags":[]},...]}]

```

`POST /parde/api/tag_video_frames`

<dl>
<strong>video_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس ویدئو‌ها</p>
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
<img src="./images/vector.svg" alt="vector">  فاصله بین دو فریم استخراج شده به میلی ثانیه</p>
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
<img src="./images/vector.svg" alt="vector">  حداقل تفاوت میان دو فریم که به عنوان فریم مستقل در نظر گرفته شوند.</p>
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
<img src="./images/vector.svg" alt="vector">  مقدار زمان به ثانیه از ابتدا ویدئو که پردازش روی آن انجام می‌شود. اگر Null باشد کل ویدئو پردازش خواهد شد.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر این پارامتر فعال باشد، درخواست به صورت غیرهم‌گام ارسال شده و در حین پردازش ویدئو سرور با عبارت 'pending' یا 'started' پاسخ می‌دهد. در اولین درخواست پس از پایان فرآیند پردازش ویدئو، سرور نتیجه پردازش را ارسال می‌کند.

{
    video_urls: ["https://hajifirouz6.cdn.asset.aparat.cloud/aparat-video/2a6a6ecede3579f0f58bd99d37cfa9ef42917772-240p.mp4"],
    every_ms: 200, 
    duration: 36000, 
    min_frame_diff: 0.5
}</p>
<br><br>
