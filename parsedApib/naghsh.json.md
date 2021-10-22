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
    content: Documentation for the Naghsh API
---

# Naghsh

> Host: http://api.sobhe.ir/naghsh/api/

For using Naghsh API you need a TOKEN_KEY, if you don't have one,
please contact naghsh@sobhe.ir.

# Request

> Request

```plaintext
{
    "image_urls": [
        "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "image_urls": [
        "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg"
    ]
} \
      http://api.sobhe.ir/naghsh/api/tag_images
```

```python
from urllib2 import Request, urlopen

values = """
{
    "image_urls": [
        "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://api.sobhe.ir/naghsh/api/tag_images', data=values, headers=headers)

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
            URL url = new URL("http://api.sobhe.ir/naghsh/api/tag_images");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            byte[] out = "{
    "image_urls": [
        "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg"
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

  $url = "http://api.sobhe.ir/naghsh/api/tag_images";
  $content = json_encode(
      '{
    "image_urls": [
        "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg"
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
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://api.sobhe.ir/naghsh/api/tag_images");
            httpWebRequest.Headers["Content-Type"]= "application/json";
            httpWebRequest.Headers["Authorization"]= "Token TOKEN_KEY";

            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{
    "image_urls": [
        "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg"
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

> Response 200

> Content-Type: application/json

```json
{
    "http://tetonraptorcenter.org/assets/media/images/raptor-profiles/Northern%20Goshawk.jpg": {
        "شاهین": 0.71,
        "جنگل": 0.22,
        "باغ": 0.14
    }
}
```

`POST /tag_images`

**Request Header**

Content-Type | Authorization
------------ | -------------
application/json | Token TOKEN_KEY

