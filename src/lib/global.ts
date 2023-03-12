import Swal from "sweetalert2"

const closeKohkokuListeners = new Array<() => void>()

const onAdClose = (func: () => void) => {
    closeKohkokuListeners.push(func)
}

const kohkokus = [
    ["Lorem_ipsum_cloud.svg", "https://cloud.lorem.ipsum/"],
    ["Bermuda_phone.svg", "https://camp-fill.co.jpn/projects/bermuda-2022/"],
    ["ThroughputBuildings.jpg", "http://throughput-building.chn/"],
    ["Gaming_pail.svg", "https://dotbeans.tool/pail/"],
]

const kohkokuHTML = (kohkokuName: string, url: string) => `
    <div id="kohkoku" style="z-index: 1000; cursor: default; user-select: all;">
        <a aria-label="Kohkoku" href="${url}" target="_blank"><img decoding="async" loading="lazy" style="cursor: pointer" id="kohkoku-image" src="/images/kohkokus/${kohkokuName}" alt="Kohkoku画像"></a>
        <span class="button" onclick="closeKohkoku()"><a href="#隠しページパスワードは「広告」">➕</a></span>
        <span id="kohkoku-information" style="cursor: text; user-select: text;">この広告は1分以上更新がない場合に表示されます。このページの更新/GitHub経由での更新後、24時間以内に表示されなくなるはずです。</span>
    </div>
`

const genKohkokuElement = () => {
    const kohkokuFooter = document.createElement("footer")
    const kohkoku = kohkokus[Math.floor(Math.random() * kohkokus.length)]

    kohkokuFooter.innerHTML = kohkokuHTML(kohkoku[0], kohkoku[1])

    return kohkokuFooter
}

const genKohkokuMerginElement = () => {
    const kohkokuMergin = document.createElement("div")

    kohkokuMergin.id = "kohkoku-margin"
    kohkokuMergin.style.minHeight = "120px"
    kohkokuMergin.style.width = "1px"

    return kohkokuMergin
}

const closeKohkoku = () => {
    const kohkoku = document.querySelector<HTMLElement>("#kohkoku")
    const kohKokuMergin = document.querySelector("#kohkoku-margin")

    if (kohkoku) {
        kohkoku.style.display = "none"
    }

    if (kohKokuMergin) {
        kohKokuMergin.remove()
    }

    for (const func of closeKohkokuListeners) func()
}

const notifyKohkokuBlocker = () => {
    const lastAdBlockWarn = window.localStorage.getItem("adblock-warn")
    const time = Date.now()

    if (lastAdBlockWarn && time - Number.parseInt(lastAdBlockWarn, 10) < 1000 * 60 * 60) {
        // an hour
        return
    }

    // eslint-disable-next-line no-void
    void Swal.fire({
        title: "AdBlockが検出されました。",
        text: "ユーザエクスペリエンスを向上させるために、AdBlockを解除してください。\n(アクセスカウンターが動きません！)\nキリ番が踏めなくなります！！！",
        icon: "warning",
        confirmButtonText: "OK",
    }).finally(() => {
        window.localStorage.setItem("adblock-warn", String(time))
    })
}

window.closeKohkoku = closeKohkoku

window.addEventListener("load", () => {
    document.body.append(genKohkokuMerginElement())
    document.body.append(genKohkokuElement())

    setTimeout(() => {
        const counter = document.querySelector<HTMLImageElement>("#counter")!

        if (!(counter.complete && counter.naturalHeight !== 0)) {
            notifyKohkokuBlocker()
        }
    }, 1000)
})

document.addEventListener("contextmenu", (e: Event) => {
    e.preventDefault()

    // eslint-disable-next-line no-void
    void Swal.fire({
        title: "右クリックは禁止です！",
        icon: "error",
        confirmButtonText: "OK",
    })

    window.location.hash = "隠しページパスワードは「右クリック禁止」"

    return false
})

export { onAdClose, closeKohkoku }
