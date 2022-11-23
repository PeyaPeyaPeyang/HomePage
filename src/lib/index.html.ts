import { onAdClose } from "./global"

setTimeout(() => {
    const sayonara = document.querySelector("#sayonara-lines")!

    for (let i = 0; i < 100; i++) {
        sayonara.append("↲\n")
    }

    onAdClose(() => {
        document.querySelector("#kohkoku-margin")!.remove()
    })
}, 1000)
