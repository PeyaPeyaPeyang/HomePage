const password = {
    えきむっごきへで: "最強の私の名前。",
}

const generateRange = (startChar, endChar) => {
    let startCharIndex = startChar.charCodeAt(0)
    let endCharIndex = endChar.charCodeAt(0)

    if (startCharIndex > endCharIndex) {
        let temp = startCharIndex

        startCharIndex = endCharIndex
        endCharIndex = temp
    }

    let range = ""

    for (let i = startCharIndex; i <= endCharIndex; i++)
        range += String.fromCharCode(i)

    return range
}

const chars = generateRange("あ", "ん")

const hashLength = 8

const bakePassword = (password) => {
    if (password.length > 100) return "?"

    if (password.length < hashLength) {
        const insufficiency = hashLength - password.length
        let extendedPassword = password

        let current = 0
        for (let i = 0; i < insufficiency; i++) {
            if (current >= password.length) current = 0

            const charCode = password.charCodeAt(current)

            let selectChar
            if (charCode % 2 === 0) selectChar = charCode + insufficiency
            else selectChar = charCode - insufficiency

            extendedPassword += chars[selectChar / chars.length]
        }

        password = extendedPassword
    }

    let hash = 0
    let hashChar = "-".repeat(hashLength)
    for (let i = 0, j = password.length - 1; i < password.length; i++, j--) {
        const h1 = (hash << 2) - hash + password.charCodeAt(i)
        const h2 = (hash << 4) - hash + password.charCodeAt(j)
        const h3 = (hash << 6) - hash + chars.indexOf(password.charAt(i))
        hash = h1 ^ h2 ^ h3
        hash = hash & 0x7fffffff

        const calculatedHashChar = chars[Math.abs(hash) % chars.length]
        let putPos = hash % hashLength

        if (hashChar.charAt(putPos) !== "-") putPos = hashChar.indexOf("-")
        if (putPos === -1) putPos = hash % hashLength
        hashChar =
            hashChar.substring(0, putPos) +
            calculatedHashChar +
            hashChar.substring(putPos + 1)
    }

    return hashChar
}

const submit = (inputPassword) => {
    if (password === "") {
        alert("パスワードを入力してください！")
        return
    }

    const bakedPassword = bakePassword(inputPassword)

    if (password[bakedPassword] === undefined) {
        alert("パスワードが間違っています！")
        return
    }

    window.open(
        "frame.html?dist=" + bakedPassword + "&password=" + inputPassword,
        "_self",
    )
}

const getRandomHint = () => {
    const keys = Object.keys(password)
    const index = Math.floor(Math.random() * keys.length)
    const randomKey = keys[index]
    return index + 1 + "ページ目のヒント：" + password[randomKey]
}
