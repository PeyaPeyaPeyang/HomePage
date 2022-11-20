const password = {
    えきむっごきへで: "最強の私の名前。",
}

const generateRange = (startChar, endChar) => {
    let startCharIndex = startChar.codePointAt(0)
    let endCharIndex = endChar.codePointAt(0)

    if (startCharIndex > endCharIndex) {
        const temp = startCharIndex

        startCharIndex = endCharIndex
        endCharIndex = temp
    }

    let range = ""

    for (let i = startCharIndex; i <= endCharIndex; i++)
        range += String.fromCodePoint(i)

    return range
}

const chars = generateRange("あ", "ん")
const hashLength = 8

const bakePassword = (rawPassword) => {
    let inputPassword = rawPassword

    if (inputPassword.length > 100) return "?"

    if (inputPassword.length < hashLength) {
        const insufficiency = hashLength - inputPassword.length

        let extendedPassword = inputPassword
        let current = 0

        for (let i = 0; i < insufficiency; i++) {
            if (current >= inputPassword.length) current = 0

            const charCode = inputPassword.codePointAt(current)

            const selectChar =
                charCode % 2 === 0
                    ? charCode + insufficiency
                    : charCode - insufficiency

            extendedPassword += chars[selectChar / chars.length]
        }

        inputPassword = extendedPassword
    }

    let hash = 0
    let hashChar = "-".repeat(hashLength)

    for (
        let i = 0, j = inputPassword.length - 1;
        i < inputPassword.length;
        i++, j--
    ) {
        const h1 = (hash << 2) - hash + inputPassword.codePointAt(i)
        const h2 = (hash << 4) - hash + inputPassword.codePointAt(j)
        const h3 = (hash << 6) - hash + chars.indexOf(inputPassword.charAt(i))

        hash = h1 ^ h2 ^ h3
        hash &= 0x7f_ff_ff_ff

        const calculatedHashChar = chars[Math.abs(hash) % chars.length]

        let putPos = hash % hashLength

        if (hashChar.charAt(putPos) !== "-") putPos = hashChar.indexOf("-")
        if (putPos === -1) putPos = hash % hashLength
        hashChar =
            hashChar.slice(0, Math.max(0, putPos)) +
            calculatedHashChar +
            hashChar.slice(Math.max(0, putPos + 1))
    }

    return hashChar
}

window.submit = (inputPassword) => {
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
        `frame.html?dist=${bakedPassword}&password=${inputPassword}`,
        "_self",
    )
}

window.getRandomHint = () => {
    const keys = Object.keys(password)
    const index = Math.floor(Math.random() * keys.length)
    const randomKey = keys[index]

    return `${index + 1}ページ目のヒント：${password[randomKey]}`
}
