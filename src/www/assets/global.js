const headerLoadListeners = [];
const closeKohkokuListeners = [];

window.onHeaderLoad = (func) => {
    headerLoadListeners.push(func);
};

window.onAdClose = (func) => {
    closeKohkokuListeners.push(func);
}

const kohkokus = [
    [
        "Lorem_ipsum_cloud.svg", "https://cloud.lorem.ipsum/"
    ],
    [
        "Bermuda_phone.svg", "https://camp-fill.co.jpn/projects/bermuda-2022/"
    ],
    [
        "ThroughputBuildings.jpg", "http://throughput-building.chn/"
    ],
    [
        "Gaming_pail.svg", "https://dotbeans.tool/pail/"
    ]
];

const kohkokuHTML = (name, url) => `
    <div id="kohkoku" style="z-index: 1000; cursor: default; user-select: all;">
        <a aria-label="Kohkoku" href="${url}" target="_blank"><img decoding="async" loading="lazy" style="cursor: pointer" id="kohkoku-image" src="/assets/kohkokus/${name}" alt="Kohkoku画像"></a>
        <span class="button" onclick="closeKohkoku()"><a href="#隠しページパスワードはad">➕</a></span>
        <span id="kohkoku-information" style="cursor: text; user-select: text;">この広告は1分以上更新がない場合に表示されます。このページの更新/GitHub経由での更新後、24時間以内に表示されなくなるはずです。</span>
    </div>
`;

const genKohkokuElement = () => {
    const kohkokuFooter = document.createElement('footer');
    const kohkoku = kohkokus[Math.floor(Math.random() * kohkokus.length)];

    kohkokuFooter.innerHTML = kohkokuHTML(kohkoku[0], kohkoku[1]);
    return kohkokuFooter;
}


const closeKohkoku = () => {
    document.getElementById('kohkoku').style = 'display: none';
    closeKohkokuListeners.forEach(func => func());
};


window.addEventListener("load", () => {
    const header = "/assets/header.htm";

    const header_container = document.getElementsByTagName("header");
    const header_container_0 = header_container[0];

    const body = document.getElementsByTagName("body")[0];
    body.appendChild(genKohkokuElement());

    fetch(header)
        .then(response => response.text())
        .then(text => {
            header_container_0.innerHTML = text;
            setTimeout(() => {
                const counter = document.getElementById('counter');

                // if counter is loaded, adblock is not detected.

                if (counter.complete && counter.naturalHeight !== 0) {
                } else {
                    alert('AdBlockが検出されました。\n' +
                        'ユーザエクスペリエンスを向上させるために、AdBlockを解除してください。\n' +
                        '(アクセスカウンターが動きません！)\nキリ番が踏めなくなります！！！');
                }
            }, 1000);

            headerLoadListeners.forEach(func => func());
        })
        .catch(error => {
            console.log(error);
        })

})

document.oncontextmenu = () => {
    alert("右クリックは禁止です！");
    return false;
}
