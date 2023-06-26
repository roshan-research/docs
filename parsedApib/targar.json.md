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
    content: Documentation for the ترگار API
---

# ترگار

ترگار ای پی ای ترجمه است انگلیسی به فارسی و فارسی به انگلیسی است.

# ترجمه متن


## مثال

> Request

```plaintext
{
    "text": "سلام",
    "translateFrom": "persian",
    "translateTo": "english"
}
```

```shell
curl  --request POST \ 
      --header "Content-Type: application/json" --header "Authorization: Token TOKEN_KEY" \
      --data-binary '{
    "text": "سلام",
    "translateFrom": "persian",
    "translateTo": "english"
}' \
      http://targar.ir/api/translate/
```

```python
try:
   from urllib2 import Request, urlopen
except ImportError:
   from urllib.request import urlopen, Request
from encodings import utf_8

values = bytes("""
{
    "text": "سلام",
    "translateFrom": "persian",
    "translateTo": "english"
}
"""
,'utf-8')
headers = {
  'Content-Type': 'application/json','Authorization': 'Token TOKEN_KEY',
}
request = Request('http://targar.ir/api/translate/', data=values, headers=headers)

response_body = urlopen(request).read()
print(utf_8.decode(response_body))
```

> Response 

```json
{
    "Translation":"Hi.",
}

```

ورودی این تابع متن مورد نظر جهت ترجمه، زبان مبدا و زبان مقصد است و خروجی آن متن ترجمه شده میباشد.

<dl style="background-color:transparent;"><code>POST /api/translate/</code></dl>

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
<img src="./images/vector.svg" alt="vector">  متن جهت ترجمه.</p>
<br><br>
<dl>
<strong>translateFrom(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  زبان مبدا.</p>
<br><br>
<dl>
<strong>translateTo(required)</strong>
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
<img src="./images/vector.svg" alt="vector">  زبان مقصد.</p>
<br><br>
