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
    content: Documentation for the الفبا API
---

# الفبا

الفبا، یک OCR API بسیار کم‌خطا برای استخراج متن‌های فارسی، عربی و انگلیسی از تصاویر است.

برای دسترسی به ای‌پی‌آی، به یک <code>TOKEN_KEY</code> نیاز دارید که می‌توانید از طریق ایمیلِ alefba@roshan-ai.ir درخواست دهید.

# استخراج متن یک فایل

این تابع، یک فایل تصویری (jpg, png, pdf و...) را به عنوان ورودی می‌گیرد و در پاسخ، متنِ آن را به تفکیک صفحات، پاراگراف‌ها و سطرها به‌همراه اندازه و موقعیت مکانی هریک، به شکل JSON تحویل می‌دهد. الفبا فرق بین جداول و تصاویر و متن‌ها را می‌فهمد و هر یک از این انواع را به شکل مناسب در خروجی ارائه می‌دهد.

در پاسخ دریافتی، <code>height</code> و <code>width</code> یعنی ارتفاع و عرض صفحه به پیکسل، <code>direction</code> یعنی جهت متن، <code>probability</code> یعنی دقت تشخیص ( مقدارش بین <code>۰</code> و <code>۱</code> است؛ ۱ یعنی دقت تشخیص ۱۰۰٪). <code>box</code> یعنی موقعیت مکانی و اندازهٔ محدودهٔ تشخیص؛ مثلاً "449   1711   305   209" یعنی ۲۰۹ پیکسل فاصله از چپ، ۳۰۵ پیکسل فاصله از بالا، ۱۷۱۱ عرض باکس و 449 ارتفاع باکس.


## مثال: ارسال لینک فایل به‌شکل همگام

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true,
    "priority": 3
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true,
    "priority": 3
}' \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": true,
    "priority": 3
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/read_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
{
  "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
  "pages": [{
    "page_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
    "width": 2125,
    "height": 2750,
    "angle": 0.0,
    "text": "بوته\n\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
    "parts": [
      {
        "type": "text",
        "direction": "rtl",
        "box": "209 305 1711 449",
        "text": "درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
        "lines": [
          {
            "label": 13,
            "is_bold": false,
            "probability": 1.0,
            "box": "211 305 1707 57",
            "text": "درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها"
          },
          ...
        ]
      },
      ...
    ]
  },{
    "page_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=2",
    "width": 2125,
    "height": 2750,
    "angle": 0.0,
    "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
    "parts": [
      {
        "type": "text",
        "direction": "rtl",
        "box": "210 110 1714 294",
        "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
        "lines": [
          {
            "probability": 1.0,
            "label": 12,
            "is_bold": false,
            "box": "210 110 1706 58",
            "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین"
          },
          ...
        ],
      },
      ...
    ]
  }]
}

```

منظور از ارسال همگام این است که تا آماده‌شدن نتیجه منتظر بمانید. برای این منظور باید مقدار پارامتر <code>wait</code> در درخواست ارسالی برابر <code>true‌</code> قرار گیرد که البته مقدار پیش‌فرض نیز همین است. در پاسخ ارسالی، نتیجهٔ پردازش ارائه می‌شود.

<dl style="background-color:transparent;"><code>POST /api/read_document/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
<dl>
<strong>type</strong>
<br>
<br>
Value: 
<span className="enum-container">
<span>
general
</span>
<span style="font-family:VazirCode;">
عمومی
</span>
<span>
ID-card
</span>
<span style="font-family:VazirCode;">
کارت‌های شناسایی
</span>
<span>
excel
</span>
<span style="font-family:VazirCode;">
جداول
</span>

</span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نوع فایل ورودی. مقدار پیش‌فرض: <code>general</code>.</p>
<br><br>
<dl>
<strong>fix_orientation</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، اعوجاج و کجی تصاویر اصلاح می‌شود. مقدار پیش‌فرض: <code>false</code>.</p>
<br><br>
<dl>
<strong>word_positions</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، استخراج به شکل کلمه‌به‌کلمه و به همراه موقعیت مکانی هر کلمه صورت می‌گیرد. مقدار پیش‌فرض: <code>false</code>.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، تا زمانی که پردازشِ فایل کامل نشده باید منتظرِ پاسخ بمانید. اگر نمی‌خواهید معطل بمانید این پارامتر را <code>false</code> کنید و هر از گاهی با فرخوانی تابع «بررسی وضعیت پردازش»، میزان پیشرفتِ کار را چک کنید. خوب که پردازش تمام شد، مجدداً درخواست بدهید تا نتیجهٔ پردازش را ببینید. مقدار پیش‌فرض: <code>true</code>.</p>
<br><br>
<dl>
<strong>priority</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    3
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اولویت پردازش را مشخص می‌کند. <code>1</code> یعنی خیلی زیاد، <code>2</code> یعنی زیاد، <code>3</code> یعنی معمولی، <code>4</code> یعنی  کم. فقط همین چهار مقدار. مقدار پیش‌فرض: <code>1</code>.</p>
<br><br>
## مثال: ارسال لینک فایل به‌شکل ناهمگام

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": false,
    "priority": 3
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": false,
    "priority": 3
}' \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "fix_orientation": true,
    "word_positions": false,
    "type": "general",
    "wait": false,
    "priority": 3
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/read_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
  {
    "state":"PENDING",
    "task_ids": "..."
  }


```

منظور از ارسال ناهمگام این است که منتظر نتیجه نمانید. درعوض خودتان با تابع «بررسی وضعیت پردازش» میزان پیشرفت را چک کنید و بعد از کامل‌شدن نتیجه، درخواست مجدد بدهید و نتیجه را ببینید. برای این منظور باید مقدار پارامتر <code>wait</code> در درخواست ارسالی برابر <code>false</code> قرار گیرد. با این کار، بلافاصله بعد از ارسال درخواست، پاسخی با دو پارامتر <code>state</code> (وضعیت پردازش) و <code>task_ids</code> (شناسهٔ پردازش) دریافت می‌کنید که بعداً می‌توانید با تابع «دریافت نتیجهٔ به‌شکل ناهمگام»، خروجی نهایی را با ارائهٔ این شناسه دریافت کنید.

<dl style="background-color:transparent;"><code>POST /api/read_document/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
<dl>
<strong>type</strong>
<br>
<br>
Value: 
<span className="enum-container">
<span>
general
</span>
<span style="font-family:VazirCode;">
عمومی
</span>
<span>
ID-card
</span>
<span style="font-family:VazirCode;">
کارت‌های شناسایی
</span>
<span>
excel
</span>
<span style="font-family:VazirCode;">
جداول
</span>

</span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نوع فایل ورودی. مقدار پیش‌فرض: <code>general</code></p>
<br><br>
<dl>
<strong>fix_orientation</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، اعوجاج و کجی تصاویر، اصلاح می‌شود. مقدار پیش‌فرض: <code>false</code>.</p>
<br><br>
<dl>
<strong>word_positions</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، استخراج به شکل کلمه‌به‌کلمه و به همراه موقعیت مکانی هر کلمه صورت می‌گیرد. مقدار پیش‌فرض: <code>false</code>.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، تا زمانی که پردازشِ فایل کامل نشده باید منتظرِ پاسخ بمانید. اگر نمی‌خواهید معطل بمانید این پارامتر را <code>false</code> کنید و هر از گاهی با فرخوانی تابع «بررسی وضعیت پردازش»، میزان پیشرفتِ کار را چک کنید. خوب که پردازش تمام شد، مجدداً درخواست پردازش فایل بدهید تا نتیجهٔ پردازش را ببینید. مقدار پیش‌فرض: <code>true</code>.</p>
<br><br>
<dl>
<strong>priority</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    3
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اولویت پردازش را مشخص می‌کند. <code>1</code> یعنی خیلی زیاد، <code>2</code> یعنی زیاد، <code>3</code> یعنی معمولی، <code>4</code> یعنی  کم. فقط همین چهار مقدار. مقدار پیش‌فرض: <code>1</code>.</p>
<br><br>
## مثال: دریافت نتیجه با دادن شناسهٔ پردازش

> Request

```plaintext
{
    "task_id": "...",
    "wait": false
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "task_id": "...",
    "wait": false
}' \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "task_id": "...",
    "wait": false
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/read_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
  {
    "state":"started",
    "task_id": "..."
  }


```

در درخواست به‌شکل ناهمگام (یعنی <code>wait</code>=<code>false</code>)، به شما یک <code>task_id</code> داده می‌شود که شناسهٔ پردازش است. برای دریافت نتیجهٔ پردازش، این شناسه را در پارامتر <code>task_id</code> قرار دهید و درخواست خود را ارسال کنید. اینجا نیز می‌توانید در درخواست خود، پارامتر <code>wait</code> را مقداردهی کنید. اگر <code>wait</code> برابر <code>true</code> باشد (مقدار پیش‌فرض) دوحالت پیش می‌آید. یا پردازش کامل شده که نتیجه برمی‌گردد، یا تمام نشده که باید منتظر بمانید. اگر <code>wait</code> را برابر <code>false</code> قرار دهید دوحالت پیش می‌آید. یا پردازش کامل شده که نتیجه برمی‌گردد یا کامل نیست که پاسخی با پارامتر <code>state</code> برمی‌گردد. <code>state</code> بیانگر وضعیت پردازش است.

<dl style="background-color:transparent;"><code>POST /api/read_document/</code></dl>

<dl>
<strong>task_id(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ پردازش</p>
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
<img src="./images/vector.svg" alt="vector">  توضیح این پارامتر در شرح این متد آمده است</p>
<br><br>
## مثال: ارسال مستقیم فایل

> Request

```plaintext
"--{boundary value}\nContent-Disposition: form-data; name='document'; filename='FILE NAME'\nContent-Type: text/plain (according to the type of the uploaded file)\n\n{file content}\n--{boundary value}\n"
```

```shell
curl -X
        POST --header "Authorization: Token TOKEN_KEY"
        -F "document=@example.pdf"
        http://alefba.roshan-ai.ir/api/read_document
```

```python
import requests

headers = {'Authorization': 'Token TOKEN_KEY',}
files = {'document': ('FILE NAME', open('YOUR FILE PATH', 'rb')),}
response = requests.post('https://alefba.roshan-ai.ir/api/read_document/', headers=headers, files=files)
print(response)
```

> Response 

```json
    {
      "pages": [{
        "page_url": "http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf@page=1",
        "width": 2125,
        "height": 2750,
        "text": "بوته\n\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
        "parts": [
          {
            "type": "text",
            "direction": "rtl",
            "box": "209 305 1711 449",
            "text": "درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
            "lines": [
              {
                "probability": 1.0,
                "box": "211 305 1707 57",
                "text": "درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها"
              },
              ...
            ]
          },
          ...
        ]
      },{
        "page_url":"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf@page=2",
        "width": 2125,
        "height": 2750,
        "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
        "parts": [
          {
            "type": "text",
            "direction": "rtl",
            "box": "210 110 1714 294",
            "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین\n...",
            "lines": [
              {
                "probability": 1.0,
                "box": "210 110 1706 58",
                "text": "انجام این کار البته چندان هم آسان نیست؛ نه برای دانشجوها و نه برای کمک‌استادها، اما حاصل بسیار شیرین"
              },
              ...
            ],
          },
          ...
        ]
      }],
      "document_url":"http://alefba.roshan-ai.ir/media/files/96/84/859267728361-boute.pdf"
    }


```

<dl style="background-color:transparent;"><code>POST /api/read_document/</code></dl>

<dl>
<strong>document(required)</strong>
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
<dl>
<strong>type</strong>
<br>
<br>
Value: 
<span className="enum-container">
<span>
general
</span>
<span style="font-family:VazirCode;">
عمومی
</span>
<span>
ID-card
</span>
<span style="font-family:VazirCode;">
کارت‌های شناسایی
</span>
<span>
excel
</span>
<span style="font-family:VazirCode;">
جداول
</span>

</span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نوع فایل ورودی. مقدار پیش‌فرض: <code>general</code></p>
<br><br>
<dl>
<strong>fix_orientation</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، اعوجاج و کجی تصاویر، اصلاح می‌شود. مقدار پیش‌فرض: <code>false</code>.</p>
<br><br>
<dl>
<strong>word_positions</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، استخراج به شکل کلمه‌به‌کلمه و به همراه موقعیت مکانی هر کلمه صورت می‌گیرد. مقدار پیش‌فرض: <code>false</code>.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، تا زمانی که پردازشِ فایل کامل نشده باید منتظرِ پاسخ بمانید. اگر نمی‌خواهید معطل بمانید این پارامتر را <code>false</code> کنید و هر از گاهی با فرخوانی تابع «بررسی وضعیت پردازش»، میزان پیشرفتِ کار را چک کنید. خوب که پردازش تمام شد، مجدداً درخواست پردازش فایل بدهید تا نتیجهٔ پردازش را ببینید. مقدار پیش‌فرض: <code>true</code>.</p>
<br><br>
<dl>
<strong>priority</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    3
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اولویت پردازش را مشخص می‌کند. <code>1</code> یعنی خیلی زیاد، <code>2</code> یعنی زیاد، <code>3</code> یعنی معمولی، <code>4</code> یعنی  کم. فقط همین چهار مقدار. مقدار پیش‌فرض: <code>1</code>.</p>
<br><br>
# استخراج متن صفحات مشخصی از یک فایل

درست همانند تابع «ارسال لینک مستقیم فایل» است با این تفاوت که اینجا به جای لینک کاملِ فایل، لینک صفحات مشخصی از فایل را می‌دهید. برای این منظور به انتهای لینک فایل، شمارهٔ صفحه را اضافه کنید. برای مثال وقتی آرایهٔ <code>page_urls</code> برابر "dl.com/book.pdf@page=1‌ و dl.com/book.pdf@page=5" است، صفحات ۱ و ۵ از book.pdf پردازش شده و متنِ آن تحویل داده می‌شود.


## مثال

> Request

```plaintext
{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true,
    "priority": 3
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true,
    "priority": 3
}' \
      https://alefba.roshan-ai.ir/api/read_pages/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "page_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1"
    ],
    "fix_orientation": true,
    "word_positions": false,
    "wait": true,
    "priority": 3
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/read_pages/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
[{
  "page_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
  "width": 2125,
  "height": 2750,
  "angle": 0.0,
  "text": "بوته\n\nدرس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
  "parts": [
    {
      "type": "text",
      "direction": "rtl",
      "box": "209 305 1711 449",
      "text": "درس‌های دانشگاهی معمولا با پروژه‌هابی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها\n...",
      "lines": [
        {
          "label": 12,
          "is_bold": false,
          "probability": 1.0,
          "box": "211 305 1707 57",
          "text": "درس‌های دانشگاهی معمولا با پروژه‌هایی همراه هستند که سهم قابل‌توجهی از آموزش را بر عهده دارند. این پروژه‌ها"
        },
        ...
      ]
    },
    ...
  ]
}]

```

<dl style="background-color:transparent;"><code>POST /api/read_pages/</code></dl>

<dl>
<strong>page_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لینک صفحات.</p>
<br><br>
<dl>
<strong>type</strong>
<br>
<br>
Value: 
<span className="enum-container">
<span>
general
</span>
<span style="font-family:VazirCode;">
عمومی
</span>
<span>
ID-card
</span>
<span style="font-family:VazirCode;">
کارت‌های شناسایی
</span>
<span>
excel
</span>
<span style="font-family:VazirCode;">
جداول
</span>

</span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نوع فایل ورودی. مقدار پیش‌فرض: <code>general</code></p>
<br><br>
<dl>
<strong>fix_orientation</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، اعوجاج و کجی تصاویر، اصلاح می‌شود. مقدار پیش‌فرض: <code>false</code>.</p>
<br><br>
<dl>
<strong>word_positions</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، استخراج به شکل کلمه‌به‌کلمه و به همراه موقعیت مکانی هر کلمه صورت می‌گیرد. مقدار پیش‌فرض: <code>false</code>.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، تا زمانی که پردازشِ فایل کامل نشده باید منتظرِ پاسخ بمانید. اگر نمی‌خواهید معطل بمانید این پارامتر را <code>false</code> کنید و هر از گاهی با فرخوانی تابع «بررسی وضعیت پردازش»، میزان پیشرفتِ کار را چک کنید. خوب که پردازش تمام شد، مجدداً درخواست پردازش فایل بدهید تا نتیجهٔ پردازش را ببینید. مقدار پیش‌فرض: <code>true</code>.</p>
<br><br>
<dl>
<strong>priority</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    3
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  اولویت پردازش را مشخص می‌کند. <code>1</code> یعنی خیلی زیاد، <code>2</code> یعنی زیاد، <code>3</code> یعنی معمولی، <code>4</code> یعنی  کم. فقط همین چهار مقدار. مقدار پیش‌فرض: <code>1</code>.</p>
<br><br>
# بررسی وضعیت پردازش

این تابع برای هریک از لینک‌های ورودی مشخص می‌کند که چه تعداد از صفحات آن‌ها پردازش شده است. در پاسخ ارسالی، برای هر لینک، سه پارامتر <code>processed_pages</code> به معنی تعداد صفحات پردازش‌شده، <code>all_pages</code> تعداد کل صفحات و <code>analyzed</code> ارائه می‌شود که پارامتر آخر تنها زمانی <code>true</code> می‌شود که پردازش همهٔ صفحات تمام شده باشد.


## مثال

> Request

```plaintext
{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}' \
      https://alefba.roshan-ai.ir/api/document_status/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_urls": [
        "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
    ]
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/document_status/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
{
  "http://bayanbox.ir/view/5067853395275628881/boute.pdf": {
    "analyzed": true,
    "processed_pages": 2,
    "all_pages": 2
  }
}

```

<dl style="background-color:transparent;"><code>POST /api/document_status/</code></dl>

<dl>
<strong>document_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  لینک فایل‌ها</p>
<br><br>
# دریافت لینک صفحات سند

پیش از پردازش فایل ابتدا تمام صفحات آن استخراج می‌شود. این تابع با دریافت لینک فایل، لینک صفحات آن را به شما تحویل می‌دهد.


## مثال

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}' \
      https://alefba.roshan-ai.ir/api/document_pages/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/document_pages/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
{
  "document_url":"http://bayanbox.ir/view/5067853395275628881/boute.pdf",
  "pages": [
    "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=1",
    "http://bayanbox.ir/view/5067853395275628881/boute.pdf@page=2"
  ]
}

```

<dl style="background-color:transparent;"><code>POST /api/document_pages/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
# دریافت فایل ورد

این تابع، نتیجهٔ پردازش را در قالب یک فایل ورد به شما تحویل می‌دهد. در این فایل، قالب سند حفظ شده است و اجزایی چون خطوط، پاراگراف‌ها و جداول به‌شکل صحیح درج می‌شود. دقت داشته باشید فایلی که می‌خواهید نسخهٔ وردِ آن را دریافت کنید ابتدا باید با <a href="https://www.roshan-ai.ir/docs/alefba/#eeb4e6bbff">
تابع «ارسال لینک مستقیم فایل»
</a> پردازش شده باشد. شما نمی‌توانید فایلی که قبلاً پردازش نشده را به ورد تبدیل کنید.


## مثال

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}' \
      https://alefba.roshan-ai.ir/api/download_word/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/download_word/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
boute.docx file

```

<dl style="background-color:transparent;"><code>POST /api/download_word/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
# دریافت فایل اکسل

این تابع، نتیجهٔ پردازش را در قالب یک فایل اکسل به شما تحویل می‌دهد. دقت داشته باشید فایلی که می‌خواهید نسخهٔ اکسلِ آن را دریافت کنید ابتدا باید با تابع «ارسال لینک مستقیم فایل» پردازش شده باشد و حتماً پارامتر <code>type</code> آن برابر مقدار <code>excel</code> باشد.


## مثال

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}' \
      https://alefba.roshan-ai.ir/api/download_excel/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/download_excel/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
boute.xlsx file

```

<dl style="background-color:transparent;"><code>POST /api/download_excel/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
# دریافت PDF قابل جستجو

در حالت عادی بسیاری از فایل‌های پی‌دی‌افِ فارسی قابل جستجو نیستند. این تابع نتیجهٔ فایل پردازش‌شده را در قالب یک پی‌دی‌افِ قابل جستجو تحویل می دهد. به این ترتیب با هر یک از نرم‌افزارهای پی‌دی‌اف‌خوانِ رایج می‌توانید کلمات موردنظر را در متن پی‌دی‌اف جستجو کنید. دقت داشته باشید قبل از استفاده از این تابع ابتدا باید با تابع «ارسال لینک مستقیم فایل»، فایل موردنظر را پردازش کرده باشید.


## مثال

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png",
    "color": false
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png",
    "color": false
}' \
      https://alefba.roshan-ai.ir/api/download_pdf/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf",
    "quality": 100,
    "img_format": "png",
    "color": false
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/download_pdf/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
boute.pdf file

```

<dl style="background-color:transparent;"><code>POST /api/download_pdf/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
<dl>
<strong>quality</strong>
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
<img src="./images/vector.svg" alt="vector">  مقدار dpi فایل خروجی. بین <code>0</code> تا <code>100</code>. مقدار پیش‌فرض: <code>100</code>.</p>
<br><br>
<dl>
<strong>color</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر <code>true</code> باشد، فایل خروجی رنگی خواهد بود. مقدار پیش‌فرض: <code>true</code>.</p>
<br><br>
# حذف فایل

با این تابع می‌توانید فایلی را که قبلاً از طریق تابع «ارسال لینک مستقیم فایل» ارسال کرده‌اید حذف کنید. کافی است دوباره همان لینک را از طریق این تابع ارسال کنید.


## مثال

> Request

```plaintext
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}' \
      https://alefba.roshan-ai.ir/api/delete_document/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://bayanbox.ir/view/5067853395275628881/boute.pdf"
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://alefba.roshan-ai.ir/api/delete_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
{
  "message":"Document deleted successfully."
}

```

<dl style="background-color:transparent;"><code>POST /api/delete_document/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
# دریافت نتیجهٔ پردازش از طریق کال‌بک

به کمک این تابع می‌توانید فایل موردنظر را به‌همراه یک کال‌بک ارسال کنید تا هروقت پردازش کامل شد نتیجه به آن کال‌بک ارسال شود. با این روش دیگر نیازی نیست منتظر پردازش فایل بمانید یا دیگر لازم نیست از طریق تابع «بررسی وضعیت پردازش»، میزان پیشرفت پردازش را چک کنید.


## مثال

> Request

```plaintext
{
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" --header "Content-Type: application/json" \
      --data-binary '{
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}' \
      https://alefba.roshan-ai.ir/api/read_document/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "document_url": "http://alefba.roshan-ai.ir/media/files/46/00/166072370361-internship.pdf",
    "callback_url": "http://192.168.254.3:5013/alefba_post"
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY','Content-Type': 'application/json',
}
request = Request('https://alefba.roshan-ai.ir/api/read_document/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
{
  "state":"processing",
  "document_url":"http://192.168.254.3:5013/static/2021-10-12%20%281%29.png"
}

```

<dl style="background-color:transparent;"><code>POST /api/read_document/</code></dl>

<dl>
<strong>document_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک فایل ورودی</p>
<br><br>
<dl>
<strong>callback_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  لینک کال‌بک برای ارسال نتیجه</p>
<br><br>
