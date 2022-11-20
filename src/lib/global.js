const closeKohkokuListeners = []

window.onAdClose = (func) => {
    closeKohkokuListeners.push(func)
}

const kohkokus = [
    ["Lorem_ipsum_cloud.svg", "https://cloud.lorem.ipsum/"],
    ["Bermuda_phone.svg", "https://camp-fill.co.jpn/projects/bermuda-2022/"],
    ["ThroughputBuildings.jpg", "http://throughput-building.chn/"],
    ["Gaming_pail.svg", "https://dotbeans.tool/pail/"],
]

const kohkokuHTML = (kohkokuName, url) => `
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

window.closeKohkoku = () => {
    document.querySelector("#kohkoku").style = "display: none"
    for (const func of closeKohkokuListeners) func()
}

window.addEventListener("load", () => {
    const [body] = document.querySelectorAll("body")

    body.append(genKohkokuElement())

    setTimeout(() => {
        const counter = document.querySelector("#counter")

        // if counter is loaded, adblock is not detected.
        if (!(counter.complete && counter.naturalHeight !== 0)) {
            alert(
                "AdBlockが検出されました。\n" +
                    "ユーザエクスペリエンスを向上させるために、AdBlockを解除してください。\n" +
                    "(アクセスカウンターが動きません！)\nキリ番が踏めなくなります！！！",
            )
        }
    }, 1000)
})

document.addEventListener("contextmenu", () => {
    alert("右クリックは禁止です！")

    return false
})
