import requests

headers = {
    'Authorization': 'Token TOKEN_KEY',
}

files = {
    'document': ('FILE NAME', open('YOUR FILE PATH', 'rb')),
}

response = requests.post('https://alefba.roshan-ai.ir/api/read_document/', headers=headers, files=files)