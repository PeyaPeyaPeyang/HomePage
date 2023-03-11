import Swal from "sweetalert2"

import { onAdClose } from "./global"

const onDummyEnterClick = (e: Event) => {
    e.preventDefault()
    Swal.fire({
        title: "注意事項を読んでください！",
        text: "注意事項をしっかり読んでいないと、このサイトを利用できません！",
        icon: "error",
        confirmButtonText: "このページから退出する",
    }).finally(() => {
        window.location.href = "https://www.yahoo.co.jp/"
    })

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
