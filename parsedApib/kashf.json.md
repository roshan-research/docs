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
    content: Documentation for the کشف API
---

# کشف

<b>کشف</b>، مثال‌هایی از یک مفهوم را می‌گیرید و بعد همان مفهوم را در داده‌های جدید پیدا می‌کند. مثلاً به کشف یاد می‌دهید که جملات خیلی عالی بود، سه ماهه خریدم مشکلی نداشتم و این محصول را پیشنهاد می‌کنم، چند نمونه از مفهوم رضایت از خرید کالا است. یا عکس‌هایی از حرم رضوی یا آقای رئیسی را نشان می‌دهید و می‌گویید این‌ها تصویر حرم یا آقای رئیسی است.

با این آموزش‌ها، کشف به‌مرور بالغ‌تر می‌شود و می‌تواند مفاهیم پنهان در دل داده‌های متنی، تصویری یا حتی ویدیویی را کشف کند. کشف مثل یک کودک در‌حال‌رشد است. هرچقدر این کودک، بیشتر و متنوع‌تر بیاموزد، بهتر و دقیق‌تر به شما کمک می‌کند.

برای دسترسی به ای‌پی‌آی، به یک `TOKEN_KEY` نیاز دارید که می‌توانید از طریق ایمیلِ <a href="mailto:kashf@roshan-ai.ir">kashf@roshan-ai.ir</a> درخواست دهید.

## اصطلاحات

در این مستندات از اصطلاحات مختلفی استفاده می‌کنیم که در این بخش به شرح هر یک می‌پردازیم. پیشنهاد می‌کنیم قبل از مطالعهٔ مستندات این قسمت را به دقت مطالعه کنید.

### دیتاست (dataset)

دیتاست مجموعه‌ای از داده‌هاست که قرار است فرایند یادگیری ماشین روی آن انجام شود. کشف با سه نوع دیتاست سروکار دارد: اولی دیتاست متنی است که فقط حاوی داده‌های متنی است مثل نظرات دیجی‌کالا؛ دومی دیتاست تصویری است که حاوی تصاویر است مثل تصاویر امکان تاریخی ایران؛ سومی دیتاست چهره‌ها است که حاوی تصاویر چهره‌هاست مثل تصاویر سیاسیون.

## برچسب (tag)

برچسب نمایندهٔ یک مفهوم است. مثلاً در یک دیتاست متنی برای نوشتهٔ «بعد از یک هفته از کار افتاد.» می‌توان از دو برچسب «نارضایتی از خرید» و «کالای معیوب» استفاده کرد، یا در یک دیتاست تصویری برای تصویر حرم رضوی می‌توان از برچسب «حرم رضوی» استفاده کرد، یا در یک دیتاست چهره می‌توان برای عکس آقای رئیسی از برچسب «سیدابراهیم رئیسی» استفاده کرد.

در کشف، هر برچسب دارای یک پارامتر `positive` است که به معنی تعلق یک برچسب به یک داده است. مثلاً در جملهٔ «بعد از یک هفته از کار افتاد» برچسب «رضایت از خرید» صدق می‌کند (positive=true) ولی برچسب «نارضایتی از خرید» صدق نمی‌کند (positive=false).

## گزارش (report)

گزارش یک برچسب‌گذاری صریح از سوی ناظر انسانی است. شما صریحاً به ماشین گزارش می‌دهید که فلان داده با چه برچسب‌هایی در ارتباط هست یا با چه برچسب‌هایی در ارتباط نیست. با این کار ماشین بین گزارش شما و داده‌های نمونه، روابط پنهان را کشف می‌کند و در تشخیص‌های آتی استفاده می‌کند. در زندگی واقعی، پاسخ‌های ما به برخی از سوالات کودکان دقیقاً نقش همین گزارش را بازی می‌کند. به عنوان مثال، به کودک یاد می‌دهید که این دوچرخه است، آن ماشین است، این رنگ آبی است، آن رنگ آبی نیست و ... .

# ساخت برچسب

برچسب جدید می‌سازد.


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

> Response 

```json
    {
      "title": "New Place",
      "tag_id": 111111111,
      "active": true
    }


```

<dl style="background-color:transparent;"><code>POST /api/create_tag/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید برچسب در آن ساخته شود.</p>
<br><br>
<dl>
<strong>title(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عنوان برچسب</p>
<br><br>
<dl>
<strong>active</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `false` باشد گزارش‌های مربوط به این برچسب در فرایند یادگیری ماشین به‌کار گرفته نمی‌شود. مقدار پیش‌فرض: `true`.</p>
<br><br>
# ویرایش برچسب

اطلاعات یک برچسب را ویرایش می‌کند.


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

> Response 

```json
    {
      "title": "Old Place",
      "tag_id": 111111111,
      "active": true
    }


```

<dl style="background-color:transparent;"><code>POST /api/update_tag/</code></dl>

<dl>
<strong>tag_"id"(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسبی که می‌خواهید اطلاعات آن را ویرایش کنید. شناسهٔ برچسب‌ها را می‌توانید از طریق تابع <a href="#d447349868">وضعیت دیتاست</a> پیدا کنید.</p>
<br><br>
<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که برچسب در آن تعریف شده است.</p>
<br><br>
<dl>
<strong>title(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عنوان برچسب.</p>
<br><br>
<dl>
<strong>active</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `false` باشد گزارش‌های مربوط به این برچسب در فرایند یادگیری ماشین به‌کار گرفته نمی‌شود. مقدار پیش‌فرض: `true`.</p>
<br><br>
# حذف برچسب

یک برچسب را حذف می‌کند. در پاسخ برگشتی، پارامتر `deleted_reports` بیانگر تعداد گزارش‌های است که با حذف برچسب، از بین رفته‌اند.


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

> Response 

```json
          {
          "dataset": "iran",
          "deleted_reports": 0
        }


```

<dl style="background-color:transparent;"><code>POST /api/delete_tag/</code></dl>

<dl>
<strong>tag_"id"(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسبی که می‌خواهید حذف کنید. شناسهٔ برچسب‌ها را می‌توانید از طریق تابع <a href="#d447349868">وضعیت دیتاست</a> پیدا کنید.</p>
<br><br>
# ثبت گزارش متنی

برای یک برچسب متنی، گزارش جدیدی ثبت می‌کند. مثلاً به ماشین می‌گویید نمونهٔ متنی «بسته‌بندی عالی بود.» مرتبط با برچسب «رضایت از خرید» و نامرتبط با برچسب «نارضایتی از خرید» است. مرتبط یا نامرتبط بودن برچسب را با تنظیم پارامتر `positive` اعلام می‌کنیم. بعداً ماشین از روی این گزارش‌ها درس می‌گیرید. پارامتر `id` در پاسخ برگشتی، شناسهٔ یکتای متنی است که گزارش داده‌اید. بعداً می‌توانید با تابع <a href="#8577413627">حذف گزارش</a> و ارائهٔ این شناسه، آن را از فهرست گزارش‌ها حذف کنید.


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

> Response 

```json
    [
      {
        "report": "[[39,true]]",
        "id": 1211592
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/report_text_tags/</code></dl>

<dl>
<strong>content(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  متنی که می‌خواهید گزارش دهید.</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسبی که می‌خواهید به متن بزنید. شناسهٔ برچسب‌ها را می‌توانید از طریق تابع <a href="#d447349868">وضعیت دیتاست</a> پیدا کنید.</p>
<br><br>
<dl>
<strong>positive</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` (مقدار پیش‌فرض) باشد این برچسب را به عنوان یک برچسب مرتبط با متن گزارش می‌دهد و اگر `false` باشد این برچسب را به عنوان یک برچسب نامرتبط با متن گزارش می‌دهد. گاهی لازم است برای یادگیری بهتر ماشین اعلام کنید که فلان متن با چه برچسب‌هایی در ارتباط نیست.</p>
<br><br>
# ثبت گزارش تصویری

همانند <a href="#ee264f8d93">ثبت گزارش متنی</a> است با این تفاوت که اینجا به جای متن، تصویر گزارش می‌دهید.


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

> Response 

```json
    [
      {
        "report": "[[3,true]]",
        "id": 1211593
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/report_image_tags/</code></dl>

<dl>
<strong>image_url(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  آدرس تصویری که می‌خواهید گزارش دهید.</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسبی که می‌خواهید به تصویر بزنید. شناسهٔ برچسب‌ها را می‌توانید از طریق تابع <a href="#d447349868">وضعیت دیتاست</a> پیدا کنید.</p>
<br><br>
<dl>
<strong>positive</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` (مقدار پیش‌فرض) باشد این برچسب را به عنوان یک برچسب مرتبط با متن گزارش می‌دهد و اگر `false` باشد این برچسب را به عنوان یک برچسب نامرتبط با متن گزارش می‌دهد. گاهی لازم است برای یادگیری بهتر ماشین اعلام کنید که فلان متن با چه برچسب‌هایی در ارتباط نیست.</p>
<br><br>
# حذف گزارش

یک گزارش را حذف می‌کند.


## نمونه

> Request

```plaintext
"{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n" \
      https://kashf.roshan-ai.ir/api/remove_tag_report/
```

```python
from urllib2 import Request, urlopen

values = """
"{\n  \"image_id\": 1211593,\n  \"tag_id\": 3,\n}\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/remove_tag_report/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "image_id": 1211593,
      "tag_id": 3,
    }


```

<dl style="background-color:transparent;"><code>POST /api/remove_tag_report/</code></dl>

<dl>
<strong>text_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسهٔ متن گزارش‌شده که می‌خواهید حذف کنید. این شناسه را می‌توانید از طریق تابع <a href="#d447349868">فهرست گزارش‌های برچسب</a> پیدا کنید.</p>
<br><br>
<dl>
<strong>image_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسهٔ تصویر گزارش‌شده که می‌خواهید حذف کنید. این شناسه را می‌توانید از طریق تابع <a href="#d447349868">فهرست گزارش‌های برچسب</a> پیدا کنید.</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  یک متن یا تصویر می‌تواند چندین برچسب بخورد. با کمک این پارامتر اعلام می‌کنید که متن یا تصویری که می‌خواهید حذف کنید مربوط به کدام برچسب است.</p>
<br><br>
# برچسب‌گذاری متون

بعد از اینکه ماشین با کمک گزارش‌های ورودی به سطح قابل قبولی از آگاهی رسید می‌تواند به پشتوانهٔ این آگاهی، به داده‌های جدید برچسب بزند. این تابع، یک دیتاست و تعدادی متن را به‌عنوان ورودی می‌گیرد و در پاسخ، برچسب‌های پیشنهادی را به‌همراه دقت تشخیص (`probability`) برای هر متن برمی‌گرداند.


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

> Response 

```json
    [
      {
        "content": "ارزش خریدنش رو بی شک داره",
        "tags": [
          {
            "id": 39,
            "probability": 1.0,
            "title": "توصیه خرید"
          }
        ]
      },
      {
        "content": "اصلا اصلا کیفیت نداره رنگش بااین عکس زمین تاآسمون فرق داره",
        "tags": [
          {
            "id": 56,
            "probability": 1.0,
            "title": "عدم رضایت بعد خرید"
          }
        ]
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/tag_texts/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
<dl>
<strong>contents(required)</strong>
<br>
<br>
Value: [content, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  متن‌هایی که می‌خواهید برچسب‌گذاری شود.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `processing` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `processing` خواهد بود.</p>
<br><br>
<dl>
<strong>tree_based</strong>
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
<img src="./images/vector.svg" alt="vector">  برچسب‌گذاری به روش درختی.</p>
<br><br>
# برچسب‌گذاری تصاویر

همانند تابع <a href="#ee264f8d93">برچسب‌گذاری متون</a> است با این تفاوت که اینجا به جای مجموعه‌ای از متن‌ها، مجموعه‌ای از تصاویر می‌دهید. در پاسخ، برای هر تصویر، برچسب یا برچسب‌هایی تولید می‌شود. برای این تابع می‌توانید به جای آدرس تصویر، فایل تصویر را به‌طورمستقیم و در قالب تقاضای multipart/form-data ارسال نمایید.


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

> Response 

```json
    [
      {
        "image_url": "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "tags": [
          {
            "id": 1,
            "probability": 1.0,
            "title": "حرم رضوی"
          }
        ]
      },
      {
        "image_url": "http://teatreshahr.com/cache/51/attach/201806/254582_2927092954_1000_667.jpg",
        "tags": [
          {
            "id": 36,
            "probability": 1.0,
            "title": "تئاتر شهر"
          }
        ]
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/tag_images/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
<dl>
<strong>image_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  تصاویری که می‌خواهید برچسب‌گذاری شود.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `processing` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `processing` خواهد بود.</p>
<br><br>
# برچسب‌گذاری تصاویر چهره

این تابع نیز همانند تابع <a href="#d03b0a053a">برچسب‌گذاری تصاویر</a> است منتهی اینجا تصاویری از چهره‌ها به آن می‌دهید. اینجا نیز می‌توانید به جای آدرس تصویر، فایل تصویر را به‌طورمستقیم و در قالب تقاضای multipart/form-data ارسال نمایید.


## نمونه

> Request

```plaintext
{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_faces/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "faces",
    "image_urls": [
        "https://media.mehrnews.com/d/2021/12/26/3/4002104.jpg"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_faces/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    [
      {
        "image_url": "https://media.mehrnews.com/d/2016/08/13/4/2171627.jpg",
        "tags": [
          {
            "id": 328742,
            "probability": 1.0,
            "title": "حسین امیرعبداللهیان (سیاسی)"
          }
        ]
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/tag_faces/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
<dl>
<strong>image_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  تصاویری که می‌خواهید چهره‌های داخلِ آن‌ها شناسایی شود.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `processing` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `processing` خواهد بود.</p>
<br><br>
# برچسب‌گذاری فریم‌های ویدئو

یک ویدیو را با تنظیمات دلخواه، به فریم‌های مختلف می‌شکند و هر فریم را همانند تابع <a href="#d03b0a053a">برچسب‌گذاری تصویر</a> برچسب‌گذاری می‌کند.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
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
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
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
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
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

> Response 

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
                "probability": 1.0,
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
                "probability": 1.0,
                "title": "میدان آزادی"
              }
            ]
          }
        ]
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/tag_video_frames/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
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
                    0
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `processing` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `processing` خواهد بود.</p>
<br><br>
# برچسب‌گذاری چهره‌های ویدئو

همانند تابع <a href="#9ec794253b">برچسب‌گذاری فریم‌های ویدیو</a> است، با این تفاوت که اینجا مجموعه‌ای از ویدیوها می‌دهید که حاوی تصاویر چهره‌هاست.


## نمونه

> Request

```plaintext
{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_video_faces/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "faces",
    "every_ms": 50,
    "duration": 25,
    "min_frame_diff": 0.4,
    "video_urls": [
        "https://hajifirouz6.cdn.asset.aparat.com/aparat-video/00f33274de87f86afa23a330880e25f042720646-240p.mp4"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_video_faces/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

<dl style="background-color:transparent;"><code>POST /api/tag_video_faces/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
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
<img src="./images/vector.svg" alt="vector">  هرچند میلی‌ثانیه یک فریم استخراج شود؟</p>
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
<img src="./images/vector.svg" alt="vector">  چندثانیه از ابتدای ویدیو پردازش شود؟ اگر `null` باشد همهٔ ویدیو پردازش می‌شود.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `processing` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `processing` خواهد بود.</p>
<br><br>
# برچسب‌گذاری کل ویدئو

به جای برچسب‌گذاری تک‌تک فریم‌ها، کل ویدیو را پردازش می‌کند و برای آن فهرستی از برچسب‌ها تولید می‌کند.


## نمونه

> Request

```plaintext
{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
    ]
} \
      https://kashf.roshan-ai.ir/api/tag_videos/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "aparat",
    "video_urls": [
        "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4"
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/tag_videos/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    [
      {
        "image_url": "https://hajifirouz2.cdn.asset.aparat.cloud/aparat-video/ecf1d6ea175858e4c3bf54585c583e2342171585-240p.mp4",
        "tags": [
          {
            "id": 77,
            "probability": 1.0,
            "title": "بسکتبال"
          }
        ]
      }
    ]


```

<dl style="background-color:transparent;"><code>POST /api/tag_videos/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
<dl>
<strong>video_urls(required)</strong>
<br>
<br>
Value: [URL, ]
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس ویدیوهایی که می‌خواهید برچسب‌گذاری کنید.</p>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، تا پایان فرایند پردازش باید منتظر بمانید. اگر `false` باشد، بلافاصله بعد از ارسال درخواست، پاسخی با اعلام وضعیتِ `processing` ارسال می‌شود و در درخواست‌های بعدی اگر نتیجه آماده بود برگردانده می‌شود و اگر نه همچنان روی `processing` خواهد بود.</p>
<br><br>
# آموزش مدل

با فرخوانی این تابع، یادگیری ماشین روی دیتاست آغاز می‌شود. در خروجی، وضعیت آموزش برگردانده می‌شود. این وضعیت در ابتدا روی `waiting` است که به معنی انتظار برای تخصیص منابع برای شروع پردازش و آموزش است و اندکی بعد به `training` تغییر می‌کند که به معنی شروع فرایند آموزش است و بعد از پایان آموزش به `trained` تغییر می‌کند.

در آموزش مدل، گزارش‌ها و برچسب‌های اعلامی از سوی ما تحت بررسی قرار گرفته و با مقایسه و تشخیص روابط بین داده‌ها، به دانش ماشین اضافه می‌شود. این دانش بعداً به ماشین کمک می‌کند تا برای داده‌های جدید اظهار نظر کند و بگوید مثلاً فلان جمله یا تصویر با کدام برچسب‌ها در ارتباط است.

وقتی شما به یک کودک، چند تصویرِ مختلف از یک خودرو را نشان می‌دهید و به این طریق، مفهوم «خودرو» را به او آموزش می‌دهید، آن کودک بعداً می‌تواند با مشاهدهٔ هر خودرویی مفهوم خودرو را تشخیص داده و این مفهوم را از مفاهیم دیگری مثل «دوچرخه»  و «موتورسیکلت» تمیز دهد. سامانه‌های یادگیری ماشینی از جمله کشف نیز کم‌وبیش به‌همین‌شیوه عمل می‌کنند. این الگوریتم‌ها با دریافت مجموعه‌ای از داده‌ها و آموزش‌های ابتدایی، روابط بین پارامترها و مقادیر را تشخیص داده و می‌توانند برای داده‌های جدید اظهار نظر کنند.


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

> Response 

```json
    {
        "dataset": "iran",
        "state": "waiting"
    }


```

<dl style="background-color:transparent;"><code>POST /api/train_dataset/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که فرایند آموزش روی آن صورت می‌گیرد.</p>
<br><br>
# بازبینی مدل

با فراخوانی این تابع، فرآیند بازبینی داده‌های موجود در مجموعه داده آغاز می‌شود. در فرآیند بازبینی، سامانه با استفاده از مدل یادگیری ماشین، مجدداً تعدادی از داده‌ها را برچسب‌گذاری می‌کند. این تابع معمولا بعد از آموزش مدل جدید به کار می‌رود. با بازبینی داده‌ها، شاید برچسب برخی از نمونه‌ها تغییر کند.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "max_predictions": 100
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "max_predictions": 100
} \
      https://kashf.roshan-ai.ir/api/retag_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "max_predictions": 100
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/retag_dataset/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
        "dataset": "iran",
        "state": "waiting"
    }


```

<dl style="background-color:transparent;"><code>POST /api/retag_dataset/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید بازبینی مدل روی آن انجام شود.</p>
<br><br>
<dl>
<strong>max_predictions(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  حداکثر تعداد داده‌هایی که می‌خواهید بازبینی شود.</p>
<br><br>
# دریافت دیتاست

دیتاست موردنظر را در قالب یک فایل csv برمی‌گرداند.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
} \
      https://kashf.roshan-ai.ir/api/export_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "original_urls": true,
    "tag_names": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/export_dataset/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
        "dataset": "iran",
        "state": "waiting"
    }


```

<dl style="background-color:transparent;"><code>POST /api/export_dataset/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست که می‌خواهید دریافت کنید.</p>
<br><br>
<dl>
<strong>original_urls</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد (مقدار پیش‌فرض)، آدرس اصلی تصاویر و ویدیوها را در فایل خروجی قرار می‌دهد.</p>
<br><br>
<dl>
<strong>tag_names</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد، به‌جای شناسهٔ برچسب، عنوان برچسب در خروجی ظاهر می‌شود. مقدار پیش‌فرض:`false`.</p>
<br><br>
# اضافه‌کردن داده به دیتاست

مجموعه‌ای از داده‌های جدید را در قالب یک فایل csv به دیتاست موردنظر اضافه می‌کند. به جای آدرس فایل csv می‌توانید فایل را به طور مستقیم و در قالب یک تقاضای multipart/form-data ارسال کنید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
} \
      https://kashf.roshan-ai.ir/api/import_dataset/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "report_items": true,
    "tag_names": true
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/import_dataset/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
        "dataset": "iran",
        "state": "waiting"
    }


```

<dl style="background-color:transparent;"><code>POST /api/import_dataset/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید به داده‌های آن بیفزایید.</p>
<br><br>
<dl>
<strong>csv_url(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    imported file URL
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  آدرس فایل csv.</p>
<br><br>
<dl>
<strong>report_items</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد تمام داده‌های ورودی را به عنوان گزارش ثبت می‌کند.</p>
<br><br>
# وضعیت دیتاست

خلاصه‌وضعیتی از داده‌ها و روند آموزش و ارزیابی‌های انجام‌شده را در یک دیتاست برمی‌گرداند. در پاسخ برگشتی پارامتر `title` نام دیتاست را نشان می‌دهد، data_count تعداد داده‌های دیتاست است، `report_count` تعداد گزارش‌ها را اعلام می‌کند، `evaluation` وضعیت ارزیابی را مشخص می‌کند که خود شامل دو زیرپارامتر `precision` دقت و `recall` فراخوانی است. همچنین پارامتر `state` وضعیت پردازش فعلی روی دیتاست را نشان می‌دهد که از یکی از این مقادیر خارج نیست: `waiting` در انتظار تخصیص منابع، `training` در حال آموزش، `trained` پایان آموزش، `retagging` درحال بازبینی مدل و برچسب‌گذاری مجدد، `retagged` پایان بازبینی. 
در نهایت پارامتر tags را داریم که فهرستی از برچسب‌های تعریف شده را روی دیتاست نشان می‌دهد. هر یک از tagها شامل `id` شناسهٔ برچسب، `title` عنوان برچسب، `active` فعال یا غیرفعال بودن برچسب، `reports` تعداد گزارش‌های برچسب، `predictions` تعداد پیش‌بینی‌های برچسب و `evaluation` وضعیت ارزیابی برچسب است.


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
      https://kashf.roshan-ai.ir/dataset_info/
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
request = Request('https://kashf.roshan-ai.ir/dataset_info/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "title": "لحظه",
      "state": "trained",
      "report_count": 935,
      "data_count": 2404,
      "evaluation": {
        "recall": 87,
        "precision": 91
      },
      "tags": [
        {
          "title": "برج میلاد"
          "id": 3,
          "reports": 116,
          "predictions": 156,
          "evaluation": {
            "recall": 80.3,
            "precision": 91.4,
            "f1": 86.0
          },
        },
        ...
      ]
    }       


```

<dl style="background-color:transparent;"><code>POST /dataset_info/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید خلاصه وضعیت آن را دریافت کنید.</p>
<br><br>
<dl>
<strong>tags</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true‍` باشد فهرست برچسب‌ها و وضعیت هر یک از آن‌ها را نیز نشان می‌دهد.</p>
<br><br>
# فهرست تشخیص‌ها

کشف در فرایند آموزش و بازبینی، برخی از داده‌های دیتاست را به تشخیص خود برچسب‌گذاری می‌کند. این تابع، داده‌هایی را که برچسبِ ورودی به آن الصاق شده برمی‌گرداند. نتایج این تابع صفحه‌بندی‌شده است و در هر صفحه نهایتاً ۵۰ نتیجه وجود دارد. با افزودن پارامتر `page`به انتهای آدرس می‌توانید به نتایج صفحات بعدی دسترسی پیدا کنید. در پاسخ برگشتی، تعداد کل نتایج در پارامتر `count`، آدرس صفحهٔ بعد در پارامتر `next` و آدرس صفحهٔ بعد در پارامتر `previous` قرار گرفته است.


## نمونه

> Request

```plaintext
"    {\n      \"dataset\": \"iran\"\n      \"tag_id\": 2\n    }\n"
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "    {\n      \"dataset\": \"iran\"\n      \"tag_id\": 2\n    }\n" \
      https://kashf.roshan-ai.ir/api/list_tag_predictions/
```

```python
from urllib2 import Request, urlopen

values = """
"    {\n      \"dataset\": \"iran\"\n      \"tag_id\": 2\n    }\n"
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_tag_predictions/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "count": 111,
      "next": "[base_url]/api/list_tag_predictions/?page=2",
      "previous": null,
      "results": [{"id": 1385,…}, {"id": 1873984,…},…]
    }


```

<dl style="background-color:transparent;"><code>POST /api/list_tag_predictions/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاست.</p>
<br><br>
<dl>
<strong>tag_"id"(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسب.</p>
<br><br>
# فهرست گزارش‌ها

با دریافت شناسهٔ یک برچسب، فهرستی از گزارش‌های حاوی این برچسب را برمی‌گرداند. نتایج این تابع همانند تابع <a href="#4cca5c6c3c">فهرست تشخیص‌ها</a> صفحه‌بندی شده و پاسخ برگشتی نیز همانند آن است.


## نمونه

> Request

```plaintext
{
    "tag_id": 2
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "tag_id": 2
} \
      https://kashf.roshan-ai.ir/api/list_tag_reports/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "tag_id": 2
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_tag_reports/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "count": 201,
      "next": "[base_url]/api/list_tag_reports/?page=2",
      "previous": null,
      "results": [{"image": {"id": 1832, "url": "http://cdn-tehran.wisgoon.com/dlir-s3/10531458126211291615.jpg",…},…},…]
    }


```

<dl style="background-color:transparent;"><code>POST /api/list_tag_reports/</code></dl>

<dl>
<strong>tag_"id"(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسبی که می‌خواهید گزارش‌های مربوط به آن برگردانده شود.</p>
<br><br>
<dl>
<strong>reported_positive</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد فقط گزارش‌هایی را برمی‌گرداند که مقدار `positive` آن برابر `true` است. اگر `false` باشد فقط گزارش‌هایی را برمی‌گرداند که مقدار `positive` آن برابر `false` است. اگر این پارامتر ارسال نشود همهٔ گزارش‌ها را صرفنظر از مقدار `positive` برمی‌گرداند.</p>
<br><br>
# فهرست گزارش‌های مشکوک

گزارش مشکوک، گزارشی است که برچسبی که مدل برای آن تشخیص داده با برچسبی که ما گزارش داده‌ایم متفاوت است. نتایج این تابع نیز صفحه‌بندی شده و پاسخ برگشتی آن مشابه تابع <a href="#4cf309cf19">فهرست گزارش‌ها</a> است.


## نمونه

> Request

```plaintext
{
    "tag_id": 2
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "tag_id": 2
} \
      https://kashf.roshan-ai.ir/api/list_tag_notsure_reports/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "tag_id": 2
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_tag_notsure_reports/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "count": 201,
      "next": "[base_url]/api/list_tag_reports/?page=2",
      "previous": null,
      "results": [{"image": {"id": 1832, "url": "http://cdn-tehran.wisgoon.com/dlir-s3/10531458126211291615.jpg",…},…},…]
    }


```

<dl style="background-color:transparent;"><code>POST /api/list_tag_notsure_reports/</code></dl>

<dl>
<strong>tag_"id"(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسبی که می‌خواهید گزارش‌های مشکوکِ حاوی این برچسب را دریافت کنید.</p>
<br><br>
<dl>
<strong>reported_positive</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد فقط گزارش‌هایی را برمی‌گرداند که مقدار `positive` آن برابر `true` است. اگر `false` باشد فقط گزارش‌هایی را برمی‌گرداند که مقدار `positive` آن برابر `false` است. اگر این پارامتر ارسال نشود همهٔ گزارش‌ها را صرفنظر از مقدار `positive` برمی‌گرداند.</p>
<br><br>
# فهرست دیتاست‌ها

فهرست تمام دیتاست‌ها را برمی‌گرداند. در پاسخ برگشتی، برای هر دیتاست، نام آن در پارامتر `title`، نوع آن در پارامتر `type`، نام انگلیسی آن در پارامتر `slug`، تعداد برچسب‌ها در پارامتر `tag_count`، تعداد گزارش‌ها در پارامتر `reported_count`، وضعیت آموزش یا بازبینی مدل در پارامتر `state` و وضیت ارزیابی مدل در پارامتر `evaluation` قرار می‌گیرد.


## نمونه

> Request

```plaintext
""
```

```shell
curl  --request GET \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary "" \
      https://kashf.roshan-ai.ir/api/list_datasets/
```

```python
from urllib2 import Request, urlopen

values = """
""
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_datasets/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    [{
        "title": "ایران",
        "type": "image-tag",
        "slug": "iran",
        "tag_count": 21,
        "report_count": 2526,
        "state": "trained",
        "evaluation": {"precision": 0.94 , "recall": 0.87},
        "trained_at": ""
      }, ...]


```

<dl style="background-color:transparent;"><code>GET /api/list_datasets/</code></dl>

# فهرست داده‌های متنی

شناسهٔ داده‌ها را دریافت می‌کند و برای هر شناسه، محتوای آن را در پارامتر `content`، برچسب‌های آن را در پارامتر `data` و آخرین تاریخ و زمان پردازش داده را در پارامتر `processed` برمی‌گرداند.


## نمونه

> Request

```plaintext
{
    "dataset": "persica",
    "text_ids": [
        11462988
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "persica",
    "text_ids": [
        11462988
    ]
} \
      https://kashf.roshan-ai.ir/api/list_texts/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "persica",
    "text_ids": [
        11462988
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_texts/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    [{
        "count": 234,
        "results": [{"text": {"id": 11462988,…},…}] 
      }, ...]


```

<dl style="background-color:transparent;"><code>POST /api/list_texts/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید داده‌های متنی آن را دریافت کنید.</p>
<br><br>
<dl>
<strong>text_ids(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  فهرست شناسهٔ داده‌ها.</p>
<br><br>
# فهرست داده‌های تصویری

همانند تابع <a href="#ca2d5ce011">فهرست داده‌های متنی</a> است با این تفاوت که اینجا به جای شناسهٔ متن‌ها، شناسهٔ تصاویر را می‌دهید و در پاسخ به‌جای متن‌ها، آدرس تصاویر را دریافت می‌کنید.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "text_ids": [
        1832
    ]
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "text_ids": [
        1832
    ]
} \
      https://kashf.roshan-ai.ir/api/list_images/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "text_ids": [
        1832
    ]
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/list_images/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "count": 201,
      "results": [{"image": {"id": 1832, "url": "http://cdn-tehran.wisgoon.com/dlir-s3/10531458126211291615.jpg",…}]
    }


```

<dl style="background-color:transparent;"><code>POST /api/list_images/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید فهرست داده‌های تصویری آن را دریافت کنید.</p>
<br><br>
<dl>
<strong>images_ids(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  فهرست شناسهٔ تصاویر.</p>
<br><br>
# جستجو در داده‌های متنی

متنی را می‌گیرد و فهرستی از داده‌های حاوی آن متن را برمی‌گرداند. نتایج این تابع همانند تابع <a href="#4cca5c6c3c">فهرست تشخیص‌ها</a> صفحه‌بندی‌شده و همراه با آدرس صفحات بعدی و قبلی در پارامترهای `next` و `previous` بازگردانده می‌شود.


## نمونه

> Request

```plaintext
{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
} \
      https://kashf.roshan-ai.ir/api/search_candidate_texts/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "persica",
    "query": "اقتصاد مثاومتی",
    "tag_id": 1482,
    "reported": false
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/search_candidate_texts/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "count": 10,
      "next": null,
      "previous": null,
      "results": [{"id": 11462939,…}, {"id": 4446967,…}, {"id": 4444533,…}, {"id": 4444455,…}, {"id": 4444260,…}, {"id": 4444137,…},…]
    }


```

<dl style="background-color:transparent;"><code>POST /api/search_candidate_texts/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید جستجو در آن صورت گیرد.</p>
<br><br>
<dl>
<strong>query(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    None
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عبارت جستجو.</p>
<br><br>
<dl>
<strong>reported</strong>
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
<img src="./images/vector.svg" alt="vector">  اگر `true` باشد فقط در نمونه‌های گزارش‌شده جستجو می‌کند. اگر`false` باشد فقط در نمونه‌های گزارش‌نشده جستجو می‌کند.</p>
<br><br>
<dl>
<strong>tag_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  تنها در صورتی مقدار این پارامتر در نتایج اثرگذار است که پارامتر `reported` را برابر `true` قرار داده باشید. اگر اینطور باشد، تنها در گزارش‌هایی جستجو می‌شود که برچسبی با این شناسه به آن الصاق شده باشد.</p>
<br><br>
# جستجو در داده‌های تصویری

عبارتی را در داده‌های تصویری یک دیتاست جستجو می‌کند. نتایج این تابع همانند تابع <a href="#1161e5e4c1">جستجو در داده‌های متنی</a> صفحه‌بندی‌شده و همراه با آدرس صفحات بعدی و قبلی در پاسخ برگشتی است.


## نمونه

> Request

```plaintext
{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
} \
      https://kashf.roshan-ai.ir/api/search_candidate_images/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "iran",
    "query": "برج آزادی",
    "tag_id": 2
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/search_candidate_images/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
    {
      "count": 10,
      "next": null,
      "previous": null,
      "results": [{"id": 11462939,…}, {"id": 4446967,…}, {"id": 4444533,…}, {"id": 4444455,…}, {"id": 4444260,…}, {"id": 4444137,…},…]
    }


```

<dl style="background-color:transparent;"><code>POST /api/search_candidate_images/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید در آن جستجو کنید.</p>
<br><br>
<dl>
<strong>query(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    None
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عبارت جستجو.</p>
<br><br>
<dl>
<strong>tag_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسب.</p>
<br><br>
# جستجو در چهره‌ها

در تصاویر چهره‌ها جستجو می‌کند.


## نمونه

> Request

```plaintext
{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary {
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
} \
      https://kashf.roshan-ai.ir/api/search_candidate_faces/
```

```python
from urllib2 import Request, urlopen

values = """
{
    "dataset": "faces",
    "query": " احسان کرمی",
    "tag_id": 213243
}
"""

headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('https://kashf.roshan-ai.ir/api/search_candidate_faces/', data=values, headers=headers)

response_body = urlopen(request).read()
print(response_body)
```

> Response 

```json
   {"items":[{"url":"https://static1.neshanonline.com/thumbnail/yVTNvWR9IHxN/gK8fHXfDXrqfbFZCqByYQnf9bgWP7DnqxIBUmuF8jDF1YIE8vRbA5t0DEhHhnmOX/Untitled.jpg","width":null,"height":null,"data":{},"processed":null}, ...],"count":76}


```

<dl style="background-color:transparent;"><code>POST /api/search_candidate_faces/</code></dl>

<dl>
<strong>dataset(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    dataset slug
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  نام دیتاستی که می‌خواهید جستجو در آن صورت گیرد.</p>
<br><br>
<dl>
<strong>query(required)</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    None
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  عبارت جستجو.</p>
<br><br>
<dl>
<strong>tag_"id"</strong>
<br>
<br>
Value: <span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    undefined
                    </span>
</dl>

<p style="direction:rtl;font-weight:300;">
<img src="./images/vector.svg" alt="vector">  شناسهٔ برچسب.</p>
<br><br>
