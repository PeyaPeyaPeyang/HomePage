import glob
from Naked.toolshed.shell import muterun_js
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from base64 import b64encode
from hashlib import md5

dir = '../www/private/pages/pages'
encrypter = "./encrypter.js"


def encryptPassword(raw):
    with open(encrypter, 'r', encoding="utf-8") as f:
        data = f.read()
        data += "process.stdout.write(bakePassword('" + raw + "'))"
        with open(encrypter + ".tmp", 'w', encoding="utf-8") as f:
            f.write(data)

    result = muterun_js(encrypter + ".tmp")

    result = result.stdout.decode('utf-8').replace('\x00', '')

    os.remove(encrypter + ".tmp")
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
        with open(dir + "/../" + password + '.asc', 'w', encoding="utf-8") as f:
            print("name: " + str(password == "えきむっごきへで"))
            encryptedData = encryptData(data.encode('utf-8'), name + "|" + password)
            f.write(encryptedData)
            print('Encrypted data written to ' + dir + "/../" + name + '.asc')


if __name__ == '__main__':
    target_pages = glob.glob(dir + '**/*.html', recursive=True)
    for page in target_pages:
        encryptPage(page)
