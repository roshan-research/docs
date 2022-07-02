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
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

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
      http://harf.roshan-ai.ir/api/transcribe_files/
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
request = Request('http://harf.roshan-ai.ir/api/transcribe_files/', data=values, headers=headers)

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
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```shell
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

```python
from websocket import create_connection                                              
headers = {'Authorization' : 'Token ...'}
ws = create_connection("wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/", headers=headers)
with open('sample.wav' ,'rb') as f:
    bs=f.read()
window_size = 32000
number_of_window = (len(bs) + 1) // window_size
for i in range(number_of_window):
    ws.send_binary(bs[window_size*i:window_size*(i+1)])
    data = ws.recv()
ws.send("finalize")
data= ws.recv()
ws.close()

```

> Response 

```json
{"state":"PENDING"}


```

<dl style="background-color:transparent;"><code>POST /ws_api/transcribe_files/wav/sync/</code></dl>

