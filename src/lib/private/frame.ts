import CryptoJS from "crypto-js"

import { bakePassword } from "./login"

const mainframe: HTMLIFrameElement = document.querySelector("#mainframe")!

const onLoad = () => {
    const params = new URLSearchParams(window.location.search)

    if (!params.has("password") || !params.has("dist")) {
        window.location.href = "https://peya.tokyo"

        return
    }

    const passwordStr = params.get("password") || ""
    const dist = params.get("dist")

    if (bakePassword(passwordStr) !== dist) {
        window.location.href = "https://peya.tokyo"

        return
    }

    decryptPage(passwordStr, dist)
}

const decryptPage = (passwordStr: string, dist: string) => {
    const url = `pages/${dist}.asc`

    fetch(url)
        .then(async (response) => response.text())
        .then((text) => {
            mainframe.srcdoc = decrypt(text, passwordStr, dist)
        })
        .catch((error) => {
            console.error(error)
        })
}

const decrypt = (encrypted: string, password: string, dist: string) => {
    const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(`${password}|${dist}`).toString().slice(0, 16))

    return CryptoJS.AES.decrypt(encrypted, key, {
        mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Utf8)
}

const frameLoad = () =>
    setTimeout(() => {
        const b: NodeListOf<HTMLAnchorElement> = mainframe.contentDocument!.querySelectorAll("a")!

        for (const element of b) {
            element.setAttribute("target", "_top")
        }
    }, 100)

window.addEventListener("load", onLoad)
mainframe.addEventListener("load", frameLoad)
