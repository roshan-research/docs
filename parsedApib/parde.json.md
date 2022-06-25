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
    content: Documentation for the پرده API
---

# پرده

پرده یک ای‌پی‌آی بومی برای تشخیص تصاویر نامناسب است. از دید پرده، تصویر نامناسب در یکی از این چهار دسته قرار می‌گیرد:

* غیراخلاقی: حاوی تصاویر اعضای جنسی.

* دل‌خراش: حاوی تصاویر دلخراش و مشمئزکننده.

* حزن‌آلود: حاوی تصاویر غم‌بار و ناراحت‌کننده.

* خلاف شئون اسلامی: حاوی تصاویری خلاف معیارهای صداوسیمای ایران

دو دستهٔ اول حتی برای افراد بزرگسال نیز نامناسب است و دو دستهٔ آخر بیشتر برای کودکان نامناسب است.

برای دسترسی به این ای‌پی‌آی به یک `TOKEN_KEY` نیاز دارید که می‌توانید از طریق ایمیلِ [parde@roshan-ai.ir](mailto:parde@roshan-ai.ir) درخواست دهید

# برچسب‌گذاری تصاویر


## مثال

> Request

```plaintext
{
    "image_urls": [
        "sample.com/1.jpg"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "image_urls": [
        "sample.com/1.jpg"
    ]
} \
      http://api.sobhe.ir/parde/api/tag_images
```

```python
from urllib2 import Request, urlopen

values = """
{
    "image_urls": [
        "sample.com/1.jpg"
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
        "sample.com/1.jpg"
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
        "sample.com/1.jpg"
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
        "sample.com/1.jpg"
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
        "image_url":"sample.com/1.jpg",
        "tags": 
        [
            {
                "id": 82311,
                "probability": 0.9,
                "title": "خلاف شئون اسلامی"
            },
            {
                "id": 82312,
                "probability": 0.67,
                "title": "حزن‌آلود"
            }
        ]
    }
]


```

ورودی این تابع لیستی از آدرس تصاویر است و خروجی آن برچسب‌های هر تصویر. آنچه در پاسخ برگردانده می‌شود آرایه‌ای از آیتم‌هاست. هر آیتم متشکل از فیلد `image_url` حاوی لینک تصویر و آرایهٔ `tags` حاوی برچسب‌های تصویر است. شناسهٔ هر برچسب در فیلد `id`، عنوان برچسب در فیلد `title`و میزان اطمینان به آن برچسب در فیلد `probability`قرار می‌گیرد.

`POST /parde/api/tag_images`

<dl>
<strong>image_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لیست آدرس تصاویر.</p>
<br><br>
# برچسب‌گذاری فریم‌های ویدیو

ورودی این تابع لیستی از آدرس ویدیوها است و خروجی آن برچسب‌های هر ویدیو. آنچه در پاسخ برگردانده می‌شود آرایه‌ای از آیتم‌هاست. هر آیتم متشکل از یک فیلد `video_url` حاوی لینک تصویر و آرایهٔ `frames` حاوی فریم‌های پردازش‌شده است. در هر فریم، شمارهٔ آن در فیلد `frame`، موقعیت زمانی آن در فیلد `time` و برچسب‌های شناسایی‌شده برای آن در فیلد `tags` قرار می‌گیرد.


## مثال

> Request

```plaintext
{
    "video_urls": [
        "sample.com/1.mp4"
    ],
    "every_ms": 200,
    "duration": 36000,
    "min_frame_diff": 0.5
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "video_urls": [
        "sample.com/1.mp4"
    ],
    "every_ms": 200,
    "duration": 36000,
    "min_frame_diff": 0.5
} \
      http://api.sobhe.ir/parde/api/tag_video_frames
```

```python
from urllib2 import Request, urlopen

values = """
{
    "video_urls": [
        "sample.com/1.mp4"
    ],
    "every_ms": 200,
    "duration": 36000,
    "min_frame_diff": 0.5
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
        "sample.com/1.mp4"
    ],
    "every_ms": 200,
    "duration": 36000,
    "min_frame_diff": 0.5
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
        "sample.com/1.mp4"
    ],
    "every_ms": 200,
    "duration": 36000,
    "min_frame_diff": 0.5
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
        "sample.com/1.mp4"
    ],
    "every_ms": 200,
    "duration": 36000,
    "min_frame_diff": 0.5
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
        "video_url": "sample.com/1.mp4",
        "frames": 
        [
            {
                "frame": 6,
                "time": "0:00:00",
                "tags": []
            },
            {
                "frame": 31,
                "time": "0:00:01",
                "tags": []
            },
            {
                "frame": 36,
                "time": "0:00:01",
                "tags": []
            },
            {
                "frame": 475,
                "time": "0:00:18",
                "tags": 
                [
                    {
                        "id": 86141,
                        "probability": 0.32,
                        "title": "دل‌خراش"
                    },
                    {
                        "id": 86142,
                        "probability": 0.49,
                        "title": "غیراخلاقی"
                    }
                ]
            },
            {
                "frame": 560,
                "time": "0:00:22",
                "tags": []
            }
        ]
    }
]


```

`POST /parde/api/tag_video_frames`

<dl>
<strong>video_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس ویدیوهایی که می‌خواهید فریم‌های آن برچسب‌گذاری شود.</p>
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
<img src="./images/vector.svg" alt="vector">  هر چند میلی‌ثانیه یک فریم استخراج شود؟</p>
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
<img src="./images/vector.svg" alt="vector">  کمترین تفاوتِ دو فریم که از آن به بعد یک فریم را متفاوت از قبلی بداند. عددی بین ۰ تا ۱.</p>
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
<img src="./images/vector.svg" alt="vector">  چندثانیه از ابتدای ویدیو پردازش شود؟ اگر `null` باشد کل ویدیو پردازش می‌شود.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `pending` یا `started` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `pending` خواهد بود.</p>
<br><br>
