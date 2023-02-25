import { onAdClose } from "./global"

const onDummyEnterClick = (e: Event) => {
    e.preventDefault()
    alert("注意事項 を読みましたか？しっかり読んでください！")
    window.location.href = "https://www.yahoo.co.jp/"

    return false
}

// onload event
window.addEventListener("load", () => {
    document.querySelector("#dummy-enter")!.addEventListener("click", onDummyEnterClick)

    const sayonara = document.querySelector("#sayonara-lines")!

    for (let i = 0; i < 100; i++) {
        sayonara.append("↲\n")
    }

    onAdClose(() => {
        document.querySelector("#kohkoku-margin")!.remove()
    })
})
