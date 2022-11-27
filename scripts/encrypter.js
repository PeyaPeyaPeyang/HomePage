const generateRange = (startChar, endChar) => {
    let startCharIndex = startChar.codePointAt(0)
    let endCharIndex = endChar.codePointAt(0)

    if (startCharIndex > endCharIndex) {
        const temp = startCharIndex

        startCharIndex = endCharIndex
        endCharIndex = temp
    }

    let range = ""

    for (let i = startCharIndex; i <= endCharIndex; i++) range += String.fromCodePoint(i)

    return range
}

const chars = generateRange("あ", "ん")
const hashLength = 8

// eslint-disable-next-line unused-imports/no-unused-vars
const bakePassword = (input) => {
    if (input.length > 100) return "?"

    let password

    if (input.length < hashLength) {
        const insufficiency = hashLength - input.length

        let extendedPassword = input
        let current = 0

        for (let i = 0; i < insufficiency; i++) {
            if (current >= input.length) current = 0

            const charCode = input.codePointAt(current)
            const selectChar = charCode % 2 === 0 ? charCode + insufficiency : charCode - insufficiency

            extendedPassword += chars[selectChar / chars.length]
        }

        password = extendedPassword
    }

    let hash = 0
    let hashChar = "-".repeat(hashLength)

    for (let i = 0, j = password.length - 1; i < password.length; i++, j--) {
        const h1 = (hash << 2) - hash + password.codePointAt(i)
        const h2 = (hash << 4) - hash + password.codePointAt(j)
        const h3 = (hash << 6) - hash + chars.indexOf(password.charAt(i))

        hash = h1 ^ h2 ^ h3
        hash &= 0x7f_ff_ff_ff

        const calculatedHashChar = chars[Math.abs(hash) % chars.length]

        let putPos = hash % hashLength

        if (hashChar.charAt(putPos) !== "-") putPos = hashChar.indexOf("-")
        if (putPos === -1) putPos = hash % hashLength
        hashChar = hashChar.slice(0, Math.max(0, putPos)) + calculatedHashChar + hashChar.slice(Math.max(0, putPos + 1))
    }

    return hashChar
}
