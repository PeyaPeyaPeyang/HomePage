import os
import glob
import html.parser as hp
from hashlib import md5
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from base64 import b64encode

dir = '../www/private/pages/'


class PasswordParser(hp.HTMLParser):
    def __init__(self):
        hp.HTMLParser.__init__(self)
        self.password = None

    def handle_starttag(self, tag, attrs):
        if tag != 'meta':
            return

        isPasswordTag = False
        for attr in attrs:
            if attr[0] == 'name' and attr[1] == 'password':
                isPasswordTag = True
            if isPasswordTag and attr[0] == 'content':
                self.password = attr[1]


def encryptData(rawData, password):
    rawData = pad(rawData, AES.block_size)

    password = md5(password.encode('utf-8')).hexdigest()[0:16]
    cipher = AES.new(password.encode("utf-8"), AES.MODE_ECB)
    return b64encode(cipher.encrypt(rawData)).decode('utf-8')


def encryptPage(page):
    # Encrypt the page
    print('Encrypting ' + page)

    with open(page, 'r', encoding="utf-8") as f:
        data = f.read()
        parser = PasswordParser()
        parser.feed(data)
        if parser.password is None:
            print('No password found for ' + page)
            return
        password = parser.password
        print('Password is ' + password)

        data = data.replace('<meta name="password" content="' + password + '">', '')
        with open(page[:-9] + '.asc', 'w', encoding="utf-8") as f:
            name = page[page.rfind('\\')+1:-9]
            encryptedData = encryptData(data.encode('utf-8'), password + "|" + name)
            f.write(encryptedData)


if __name__ == '__main__':
    target_pages = glob.glob(dir + '**/*.raw.html', recursive=True)
    for page in target_pages:
        encryptPage(page)
