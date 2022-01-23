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

<div dir=rtl>
سامانه حرف با شنیدن هزاران ساعت گفتار با صدای افراد مختلف، زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
</div>

<blockquote dir=rtl>
برای دسترسی به واسط برنامه‌نویس حرف نیاز به یک TOKEN_KEY معتبر دارید که برای احراز هویت استفاده می‌شود. لطفا برای آزمایش سامانه، این متغیر را در تقاضاهای نمونه، جای‌گذاری کنید. سوال هم اگر دارید، لطفا برای آدرس harf@roshan-ai.ir بنویسید.
</blockquote>

# پیاده‌سازی متن فایل

<div dir=rtl>
این تابع، فایل‌های صدا یا ویدئو را دریافت می‌کند و متن آن‌ها را به صورت JSON باز می‌گرداند. خروجی ابزار تبدیل گفتار به متن، در قالب بازه‌های زمانی کوتاه ارائه می‌شود که متن هر کدام از این بازه‌ها مشخص شده است.
</div>

`/api/transcribe_files/`


## نمونه

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

> Content-Type: application/json

```json
"[\n  {\n    \"media_url\": \"https://i.ganjoor.net/a2/41417.mp3\",\n    \"duration\": \"0:00:44\",\n    \"segments\": [\n      {\n        \"start\": \"0:00:00\",\n        \"end\": \"0:00:02\",\n        \"text\": \"حکایت\"\n      },\n      {\n        \"start\": \"0:00:02\",\n        \"end\": \"0:00:06\",\n        \"text\": \"یکی را از حکما شنیدم که می گفت\"\n      },\n      {\n        \"start\": \"0:00:06\",\n        \"end\": \"0:00:11\",\n        \"text\": \"هرگز کسی به جهل خویش اقرار نکرده است\"\n      },\n      {\n        \"start\": \"0:00:11\",\n        \"end\": \"0:00:16\",\n        \"text\": \"مگر آن کس که چون دیگری در سخن باشد\"\n      },\n      {\n        \"start\": \"0:00:16\",\n        \"end\": \"0:00:21\",\n        \"text\": \"همچنان ناتمام گفته سخن آغاز کند\"\n      },\n      ...\n    ]\n  }\n]\n"
```

<div dir=rtl>
می‌توانید برای همین تابع، فایل ورودی را به طور مستقیم و در قالب تقاضای <code>multipart/form-data</code> ارسال نمایید:
</div>

> curl -X POST --header "Authorization: Token TOKEN_KEY" -F "media=@test.mp3" http://harf.roshan-ai.ir/api/transcribe_files/

`POST /api/transcribe_files/`

