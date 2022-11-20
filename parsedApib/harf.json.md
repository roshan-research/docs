---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell: CURL
  - plaintext: RAW
  - python: PYTHON

includes:
  - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: Documentation for the حرف API
---

# حرف

حرف، یک ای‌پی‌آیِ بومی برای تبدیل گفتار به نوشتارِ فارسی است.

این ای‌پی‌آی با شنیدن هزاران ساعت گفتار در لحن‌ها، سبک‌ها، سرعت‌ها و رده‌های سنی مختلف، به‌خوبی آموزش دیده و با دقت بالایی می‌تواند **صوت**، **ویدیو** یا حتی **پخش زنده** را به متن فارسی تبدیل کند.

برای دسترسی به ای‌پی‌آی به یک `TOKEN_KEY` نیاز دارید که می‌توانید از طریق ایمیلِ <a href="mailto:harf@roshan-ai.ir">harf@roshan-ai.ir</a> درخواست دهید.

# تبدیل صدا به متن

این تابع، بسته‌ به تنظیم پارامترهای ورودی، می‌تواند کارهای مختلفی انجام می‌دهد که در ادامه برای هر یک مثالی آورده‌ایم.

بعد از تکمیل پردازش، پاسخی دریافت می‌کنید که حاوی آرایه‌ای از نتایج است. هر یک از عناصر این آرایه مربوط به نتایج یک فایل است.

در هر عنصر آرایه، آدرس فایل در پارامتر `media_url`، مدت‌زمان فایل در پارامتر `duration` و متن‌های استخراج‌شده در آرایهٔ `segments` قرار می‌گیرد.

هر سگمنت شامل سه پارامتر `start` زمان شروع بازه، `end` زمان پایان بازه و `text` متن بازه است. همچنین به ازای هر فایل، وضعیت شناسایی در پارامتر `stats` قرار می‌گیرد که خودش شامل دو زیرپارامتر است. اولی `words` است که حاوی کل تعداد کلمات فایل است و دومی `known_words` است که حاوی کلماتی است که بدون تردید تشخیص داده شده است.

حرف هرجایی که به تشخیص خود تردید می‌کند آن کلمه یا عبارت را درون قلاب (کروشه) می‌گذارد.


## مثال: ارسال آدرس فایل‌ها

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
      https://harf.roshan-ai.ir/api/transcribe_files/
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
request = Request('https://harf.roshan-ai.ir/api/transcribe_files/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
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
                "text": "[حکایت]"
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
            {
                "start": "0:00:21",
                "end": "0:00:26",
                "text": "سخن را سر از [ای] خردمند و بن"
            },
            {
                "start": "0:00:26",
                "end": "0:00:30",
                "text": "میا بر سخن در میان سخن"
            },
            {
                "start": "0:00:30",
                "end": "0:00:37",
                "text": "خداوند تدبیر و فرهنگ و [روش] نگوید سخن"
            },
            {
                "start": "0:00:37",
                "end": "0:00:39",
                "text": "تا نبیند خموش"
            }
    ],
        "stats": {
            "words": 57,
            "known_words": 54
        }
    }
]


```

روش اول برای تبدیل فایل‌های صوتی یا ویدیویی به متن، ارسال آدرس فایل‌ها در پارامتر `media_urls` است.

<dl style="background-color:transparent;"><code>POST /api/transcribe_files/</code></dl>

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
<img src="./images/vector.svg" alt="vector">  آدرس فایل‌های صوتی یا ویدیویی یا ترکیبی از این دو</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند تبدیل فایل‌ها به متن باید منتظر بمانید اما اگر `false` باشد بلافاصله بعد از ارسال درخواست، پاسخی با ارسال وضعیت پردازش در پارامتر `state` و فهرستی از شناسه‌های پردازش در پارامتر `task_ids` (برای هر فایل یک شناسه) بازگردانده می‌شود که بعداً می‌توانید وضعیت پردازش این شناسه‌ها را جویا شوید.</p>
<br><br>
## مثال: آپلود فایل

> Request

```plaintext
"    --{boundary value}\n    Content-Disposition: form-data; name='41417'; filename='FILE NAME'\n    Content-Type: audio/mpeg (according to the type of the uploaded file)\n    {file content}\n    --{boundary value}\n"
```

```shell
curl -X
POST --header "Authorization: Token TOKEN_KEY"
-F "media=@example.mp3"
http://harf.roshan-ai.ir/api/transcribe_files/
```

```python
import requests
headers = {'Authorization': 'Token TOKEN_KEY',}
files = {'document': ('FILE NAME', open('YOUR FILE PATH', 'rb')),}
response = requests.post('https://harf.roshan-ai.ir/api/transcribe_files//', headers=headers, files=files)
print(response)
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
                "text": "[حکایت]"
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
            {
                "start": "0:00:21",
                "end": "0:00:26",
                "text": "سخن را سر از [ای] خردمند و بن"
            },
            {
                "start": "0:00:26",
                "end": "0:00:30",
                "text": "میا بر سخن در میان سخن"
            },
            {
                "start": "0:00:30",
                "end": "0:00:37",
                "text": "خداوند تدبیر و فرهنگ و [روش] نگوید سخن"
            },
            {
                "start": "0:00:37",
                "end": "0:00:39",
                "text": "تا نبیند خموش"
            }
    ],
        "stats": {
            "words": 57,
            "known_words": 54
        }
    }
]


```

<dl style="background-color:transparent;"><code>POST /api/transcribe_files/</code></dl>

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
## مثال: بررسی وضعیت پردازش

> Request

```plaintext
{
    "media_urls": "List of URLs",
    "wait": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "media_urls": "List of URLs",
    "wait": true
} \
      https://harf.roshan-ai.ir/api/transcribe_files/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "media_urls": "List of URLs",
    "wait": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://harf.roshan-ai.ir/api/transcribe_files/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
{"state":"PENDING"}


```

اگر در <a href="#c15d6ded38">تبدیل صدا به متن</a> ، درخواست خود را با پارامتر `wait=false` ارسال کرده باشید، فهرستی از شناسه‌های پردازش در پارامتر `task_ids` دریافت می‌کنید که برای بررسی وضعیت پردازش آن‌ها می‌توانید همانند مثال زیر عمل کنید.

در پاسخ، وضعیت پردازش در پارامتر `state` برگردانده می‌شود: `PENDING` یعنی در حال پردازش، `FAILURE` یعنی بروز خطا، `TIMEOUT` یعنی زمان پردازش فایل بیش از زمان تنظیم شده برای انتظار سامانه بوده و از دور پردازش خارج شده است.

<dl style="background-color:transparent;"><code>POST /api/transcribe_files/</code></dl>

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
<img src="./images/vector.svg" alt="vector">  آدرس فایل‌های ورودی</p>
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
<img src="./images/vector.svg" alt="vector">  <a href="#c15d6ded38">توضیحات این پارامتر</a>، پیشتر آمده است.</p>
<br><br>
# هم ترازی متن و گفتار

این تابع با دریافت یک فایل صوتی یا ویدیویی به همراه متنِ آن نشان می‌دهد که هر کلمه در کدام بخش از صدا ادا شده است. در پاسخ ارسالی `media_url`همان آدرس فایل ورودی است. `duration` طول فایل است و `segments` لیست کلماتِ موجود در پارامتر `text` است که زمان تشخیص شروع و پایان هر کدام از آن‌ها مشخص شده است. متن کلمه در پارامتر `text`، زمان شروع در پارامتر `start` و زمان پایان در پارمتر `end` قرار می‌گیرد.


## مثال: آپلود فایل

> Request

```plaintext
{
    "media_url": "https://i.ganjoor.net/a2/41417.mp3",
    "text": "حکایت یکی را از حکما شنیدم که می گفت: هرگز کسی به جهل خویش اقرار نکرده است، مگر آن کس که چون دیگری در سخن باشد همچنان  تمام ناگفته، سخن آغاز کند."
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "media_url": "https://i.ganjoor.net/a2/41417.mp3",
    "text": "حکایت یکی را از حکما شنیدم که می گفت: هرگز کسی به جهل خویش اقرار نکرده است، مگر آن کس که چون دیگری در سخن باشد همچنان  تمام ناگفته، سخن آغاز کند."
} \
      https://harf.roshan-ai.ir/api/alignment/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "media_url": "https://i.ganjoor.net/a2/41417.mp3",
    "text": "حکایت یکی را از حکما شنیدم که می گفت: هرگز کسی به جهل خویش اقرار نکرده است، مگر آن کس که چون دیگری در سخن باشد همچنان  تمام ناگفته، سخن آغاز کند."
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://harf.roshan-ai.ir/api/alignment/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
{
    "media_url": "https://i.ganjoor.net/a2/41417.mp3",
    "text": "حکایت یکی را از حکما شنیدم که می گفت: هرگز کسی به جهل خویش اقرار نکرده است، مگر آن کس که چون دیگری در سخن باشد همچنان  تمام ناگفته، سخن آغاز کند.",
    "segments": [
        {
            "start": "0:00:00.240000",
            "end": "0:00:00.800000",
            "text": "حکایت"
        },
        {
            "start": "0:00:02.550000",
            "end": "0:00:02.830000",
            "text": "یکی"
        },
        {
            "start": "0:00:02.930000",
            "end": "0:00:03.010000",
            "text": "را"
        },
        {
            "start": "0:00:03.330000",
            "end": "0:00:03.490000",
            "text": "از"
        },
        {
            "start": "0:00:03.610000",
            "end": "0:00:04.090000",
            "text": "حکما"
        },
        {
            "start": "0:00:04.510000",
            "end": "0:00:04.970000",
            "text": "شنیدم"
        },
        {
            "start": "0:00:05.090000",
            "end": "0:00:05.130000",
            "text": "که"
        },
        {
            "start": "0:00:05.230000",
            "end": "0:00:05.290000",
            "text": "می"
        },
        {
            "start": "0:00:05.410000",
            "end": "0:00:05.850000",
            "text": "گفت:"
        },
        {
            "start": "0:00:06.850000",
            "end": "0:00:07.250000",
            "text": "هرگز"
        },
        {
            "start": "0:00:07.410000",
            "end": "0:00:07.770000",
            "text": "کسی"
        },
        {
            "start": "0:00:08.110000",
            "end": "0:00:08.170000",
            "text": "به"
        },
        {
            "start": "0:00:08.370000",
            "end": "0:00:08.670000",
            "text": "جهل"
        },
        {
            "start": "0:00:08.890000",
            "end": "0:00:09.250000",
            "text": "خویش"
        },
        {
            "start": "0:00:09.430000",
            "end": "0:00:09.950000",
            "text": "اقرار"
        },
        {
            "start": "0:00:10.190000",
            "end": "0:00:10.690000",
            "text": "نکرده"
        },
        {
            "start": "0:00:10.770000",
            "end": "0:00:11.150000",
            "text": "است،"
        },
        {
            "start": "0:00:12.040000",
            "end": "0:00:12.360000",
            "text": "مگر"
        },
        {
            "start": "0:00:12.580000",
            "end": "0:00:12.740000",
            "text": "آن"
        },
        {
            "start": "0:00:12.920000",
            "end": "0:00:13.140000",
            "text": "کس"
        },
        {
            "start": "0:00:13.300000",
            "end": "0:00:13.360000",
            "text": "که"
        },
        {
            "start": "0:00:13.520000",
            "end": "0:00:13.680000",
            "text": "چون"
        },
        {
            "start": "0:00:13.920000",
            "end": "0:00:14.480000",
            "text": "دیگری"
        },
        {
            "start": "0:00:14.620000",
            "end": "0:00:14.720000",
            "text": "در"
        },
        {
            "start": "0:00:14.860000",
            "end": "0:00:15.180000",
            "text": "سخن"
        },
        {
            "start": "0:00:15.340000",
            "end": "0:00:15.840000",
            "text": "باشد"
        },
        {
            "start": "0:00:16.460000",
            "end": "0:00:19.500000",
            "text": "همچنان تمام ناگفته،"
        },
        {
            "start": "0:00:19.500000",
            "end": "0:00:19.840000",
            "text": "سخن"
        },
        {
            "start": "0:00:19.940000",
            "end": "0:00:20.360000",
            "text": "آغاز"
        },
        {
            "start": "0:00:20.500000",
            "end": "0:00:20.780000",
            "text": "کند."
        }
    ]
}

```

<dl style="background-color:transparent;"><code>POST /api/alignment/</code></dl>

<dl>
<strong>media_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  آدرس فایل‌ ورودی</p>
<br><br>
<dl>
<strong>text(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    Text
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  متن فایل‌ ورودی.</p>
<br><br>
# تبدیل پخش زندهٔ صدا به متن

برای تبدیل صدای درحال‌پخش (زنده، لایو، استریم) باید از طریق وب‌سوکت به سامانه متصل شوید. در این حالت، پس از برقراری ارتباط با سرور باید فایل خود را در قالب wav به‌شکل باینری ارسال کنید.

`{"segment_id": 1, "text": "سازمان بهداشت جهانی", "start": "0:00:00", "end": "0:00:05"}`

اگر پردازش کامل نشده باشد، پاسخی به‌شکل زیر دریافت می‌کنید:

`{"state": "PENDING"}`

در انتها، برای اعلام پایان فرایند پردازش، باید متن `finalize` را به سرور ارسال کنید.


## مثال

> Request

```plaintext
from websocket import create_connection 

def make_socket_connection(url, header):
    socket = create_connection(url, header=header)
    return socket

def read_wave_file_as_binary(wave_file):
    with open(wave_file ,'rb') as f:
        binary=f.read()
        return binary

def convert_wave_to_text(binary, socket, window_size=32000):
    number_of_window = (len(binary) + 1) // window_size
    for i in range(number_of_window):
        socket.send_binary(binary[window_size*i:window_size*(i+1)])
        data = socket.recv()
    socket.send("finalize")
    data= socket.recv()
    socket.close()

def main():
    header = {'Authorization' : 'Token ...'}
    url = "wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/"
    wave_file = "Your wave file path"
    binary = read_wave_file_as_binary(wave_file)
    socket = make_socket_connection(url, header)
    convert_wave_to_text(binary, socket)
main()

```

```shell
from websocket import create_connection 

def make_socket_connection(url, header):
    socket = create_connection(url, header=header)
    return socket

def read_wave_file_as_binary(wave_file):
    with open(wave_file ,'rb') as f:
        binary=f.read()
        return binary

def convert_wave_to_text(binary, socket, window_size=32000):
    number_of_window = (len(binary) + 1) // window_size
    for i in range(number_of_window):
        socket.send_binary(binary[window_size*i:window_size*(i+1)])
        data = socket.recv()
    socket.send("finalize")
    data= socket.recv()
    socket.close()

def main():
    header = {'Authorization' : 'Token ...'}
    url = "wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/"
    wave_file = "Your wave file path"
    binary = read_wave_file_as_binary(wave_file)
    socket = make_socket_connection(url, header)
    convert_wave_to_text(binary, socket)
main()

```

```python
from websocket import create_connection 

def make_socket_connection(url, header):
    socket = create_connection(url, header=header)
    return socket

def read_wave_file_as_binary(wave_file):
    with open(wave_file ,'rb') as f:
        binary=f.read()
        return binary

def convert_wave_to_text(binary, socket, window_size=32000):
    number_of_window = (len(binary) + 1) // window_size
    for i in range(number_of_window):
        socket.send_binary(binary[window_size*i:window_size*(i+1)])
        data = socket.recv()
    socket.send("finalize")
    data= socket.recv()
    socket.close()

def main():
    header = {'Authorization' : 'Token ...'}
    url = "wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/"
    wave_file = "Your wave file path"
    binary = read_wave_file_as_binary(wave_file)
    socket = make_socket_connection(url, header)
    convert_wave_to_text(binary, socket)
main()

```

> Response 

```json
{"state":"PENDING"}


```

<dl style="background-color:transparent;"><code>POST /ws_api/transcribe_files/wav/sync/</code></dl>

