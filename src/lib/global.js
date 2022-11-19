const closeKohkokuListeners = [];

window.onAdClose = (func) => {
    closeKohkokuListeners.push(func);
};

const kohkokus = [
    ["Lorem_ipsum_cloud.svg", "https://cloud.lorem.ipsum/"],
    ["Bermuda_phone.svg", "https://camp-fill.co.jpn/projects/bermuda-2022/"],
    ["ThroughputBuildings.jpg", "http://throughput-building.chn/"],
    ["Gaming_pail.svg", "https://dotbeans.tool/pail/"],
];

const kohkokuHTML = (name, url) => `
    <div id="kohkoku" style="z-index: 1000; cursor: default; user-select: all;">
        <a aria-label="Kohkoku" href="${url}" target="_blank"><img decoding="async" loading="lazy" style="cursor: pointer" id="kohkoku-image" src="/images/kohkokus/${name}" alt="Kohkoku画像"></a>
        <span class="button" onclick="closeKohkoku()"><a href="#隠しページパスワードは「広告」">➕</a></span>
        <span id="kohkoku-information" style="cursor: text; user-select: text;">この広告は1分以上更新がない場合に表示されます。このページの更新/GitHub経由での更新後、24時間以内に表示されなくなるはずです。</span>
    </div>
`;

const genKohkokuElement = () => {
    const kohkokuFooter = document.createElement("footer");
    const kohkoku = kohkokus[Math.floor(Math.random() * kohkokus.length)];

    kohkokuFooter.innerHTML = kohkokuHTML(kohkoku[0], kohkoku[1]);
    return kohkokuFooter;
};

const closeKohkoku = () => {
    document.getElementById("kohkoku").style = "display: none";
    closeKohkokuListeners.forEach((func) => func());
};

window.addEventListener("load", () => {
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(genKohkokuElement());

    setTimeout(() => {
        const counter = document.getElementById("counter");

        // if counter is loaded, adblock is not detected.
        if (counter.complete && counter.naturalHeight !== 0) {
        } else {
            alert(
                "AdBlockが検出されました。\n" +
                    "ユーザエクスペリエンスを向上させるために、AdBlockを解除してください。\n" +
                    "(アクセスカウンターが動きません！)\nキリ番が踏めなくなります！！！"
            );
        }
    }, 1000);
});

document.oncontextmenu = () => {
    alert("右クリックは禁止です！");
    return false;
};
