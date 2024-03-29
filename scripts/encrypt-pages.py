import glob
from Naked.toolshed.shell import muterun_js
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from base64 import b64encode
from hashlib import md5

src = 'private-pages/pages/'
dest = 'src/public/private/pages/'
encrypter = "scripts/encrypter.js"


def encryptPassword(raw):
    with open(encrypter, 'r', encoding="utf-8") as f:
        data = f.read()
        data += "process.stdout.write(bakePassword('" + raw + "'))"
        with open(encrypter + ".tmp.js", 'w', encoding="utf-8") as f:
            f.write(data)

    result = muterun_js(encrypter + ".tmp.js")

    result = result.stdout.decode('utf-8').replace('\x00', '')

    os.remove(encrypter + ".tmp.js")
    return result


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
        password = encryptPassword(page[page.rfind('\\') + 1:page.rfind('.')])
        print('Password is ' + password)

        name = page[page.rfind('\\') + 1:-5]
        with open(dest + password + '.asc', 'w', encoding="utf-8") as f:
            encryptedData = encryptData(data.encode('utf-8'), name + "|" + password)
            f.write(encryptedData)
            print('Encrypted data written to ' + dest + password + '.asc')


if __name__ == '__main__':
    target_pages = glob.glob(src + '**/*.html', recursive=True)
    for page in target_pages:
        encryptPage(page)
