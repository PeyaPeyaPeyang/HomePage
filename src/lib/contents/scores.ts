interface Score {
    title: string
    composer: string
    lyricist?: string
    genres: Genre[]
    url: string
    embedUrl: string

    isGood: boolean
    arrangeComment: string
}

interface Genre {
    displayName: string
    id: string
    genreDOM?: Element
}

const genres: { [key: string]: Genre } = {
    anime: {
        displayName: "アニソン",
        id: "anime",
    },
    game: {
        displayName: "ゲーム",
        id: "game",
    },
    vocaloid: {
        displayName: "VOCALOID(ボカロ)",
        id: "vocaloid",
    },
    touhou: {
        displayName: "東方Project",
        id: "touhou",
    },
    movie_and_drama: {
        displayName: "映画とドラマ",
        id: "movie_and_drama",
    },
    soundtrack: {
        displayName: "サウンドトラック",
        id: "soundtrack",
    },
    starred: {
        displayName: "スター付き",
        id: "starred",
    },
}

const scores: Score[] = [
    {
        title: "地球最後の告白を",
        composer: "kemu",
        genres: [genres["vocaloid"]],
        url: "https://musescore.com/user/31876905/scores/7939085",
        embedUrl: "https://musescore.com/user/31876905/scores/7939085/embed",
        isGood: true,
        arrangeComment:
            "超上級者向けです。容赦ない10度のオクターブとアルペジオ、跳躍がふんだんに使用されています。一応人間向け。",
    },
    {
        title: "Fell",
        composer: "Persune",
        genres: [genres["game"], genres["soundtrack"]],
        url: "https://musescore.com/user/31876905/scores/10053400",
        embedUrl: "https://musescore.com/user/31876905/scores/10053400/embed",
        isGood: false,
        arrangeComment: "NESの重低音のアレンジ失敗しました。ハープシコードとかが映えるかも。",
    },
    {
        title: "Inner Universe",
        composer: "Origa",
        genres: [genres["game"], genres["anime"]],
        url: "https://musescore.com/user/31876905/scores/10083898",
        embedUrl: "https://musescore.com/user/31876905/scores/10083898/embed",
        isGood: false,
        arrangeComment: "攻殻機動隊のアレです。最初はよかったと思う。真ん中のアレンジが難しい。",
    },
    {
        title: "Summer Pockets BGM 1",
        composer: "水月陵",
        genres: [genres["game"], genres["anime"], genres["soundtrack"]],
        url: "https://musescore.com/user/31876905/scores/10109962",
        embedUrl: "https://musescore.com/user/31876905/scores/10109962/embed",
        isGood: true,
        arrangeComment:
            "みんな大好きサマポケのタイトルです。2番目くらいによくアレンジできました。比較的人間用です。最初の64分は音聞きながら感覚で弾いてください。",
    },
    {
        title: "芥川龍之介の河童 ～ Candid Friend",
        composer: "ZUN",
        genres: [genres["touhou"], genres["game"], genres["soundtrack"]],
        url: "https://musescore.com/user/31876905/scores/8602988",
        embedUrl: "https://musescore.com/user/31876905/scores/8602988/embed",
        isGood: true,
        arrangeComment: "東方のアレンジです。比較的簡単にむずそうな曲を引けます。初心者用。",
    },
    {
        title: "コウを追いかけて",
        composer: "坂本秀一",
        genres: [genres["movie_and_drama"], genres["soundtrack"]],
        url: "https://musescore.com/user/31876905/scores/9981193",
        embedUrl: "https://musescore.com/user/31876905/scores/9981193/embed",
        isGood: true,
        arrangeComment: "映画「溺れるナイフ」のサントラです。低音重視。",
    },
    {
        title: "君の知らない物語",
        composer: "ryo(supercell)",
        genres: [genres["anime"]],
        url: "https://musescore.com/user/31876905/scores/8604026",
        embedUrl: "https://musescore.com/user/31876905/scores/8604026/embed",
        isGood: true,
        arrangeComment: "アニメ「化物語」の一期のEDです。ちょっと難しいので、中級者向けだと思います。",
    },
]

const maxPopularity = Math.max(
    ...Object.values(genres).map(
        (genre) => scores.filter((score) => score.genres.some((g) => g.id === genre.id)).length,
    ),
)

const genScoreDOM = (score: Score) => {
    const composerAndLyricist = score.lyricist
        ? `<div class="score_lyricist"><p>作詞：${score.lyricist}</p></div><div class="score_composer"><p>作曲：${score.composer}</p></div>`
        : `<div class="score_composer"><p>作曲：${score.composer}</p></div>`

    const star = score.isGood ? `<span class="score_star">★</span>` : ""

    const genresDOM = score.genres
        .map((genre) => `<a class="genre_link" href="#genre_${genre.id}">${genre.displayName}</a>`)
        .join(" / ")

    return `
        <div class="score">
            <div class="score_title"><h3>${star}<a href="${score.url}" target="_blank">${score.title}</a></h3></div>
            <div class="score_embed_wrapper">
                <iframe class="score_embed" src="${score.embedUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
            ${composerAndLyricist}
            <div class="score_genres"><p>ジャンル：${genresDOM}</p></div>
            <div class="score_arrange_comment"><p>${score.arrangeComment}</p></div>
        </div>
    `
}

const genGenreDOM = (genre: Genre) => {
    return `
        <div class="genre" id="genre_${genre.id}">
            <h2 class="genre_title"><a href="#genre_${genre.id}" data-genre-id="${genre.id}">${genre.displayName}▼</a></h2>
            <div class="genre_scores"></div>
        </div>
    `
}

const genGenreListElementDom = (genre: Genre) => {
    const popularity = scores.filter((score) => score.genres.some((g) => g.id === genre.id)).length
    const popularityRate = popularity / maxPopularity
    const width = 100 + popularityRate * 100

    return `
        <li>
            <a href="#genre_${genre.id}" style="font-size: ${width}%" data-genre-id="${genre.id}">${genre.displayName}</a>
        </li>
    `
}

const genGenreListDOM = () => {
    return `
        <div class="genre_list">
            <h2>ジャンル一覧</h2>
            <span style="font-size: 0.7rem; font-weight: normal">（一部重複している楽譜があります）</span>
            <ul>
                ${Object.values(genres)
                    .map((element) => genGenreListElementDom(element))
                    .join("")}
            </ul>
        </div>
    `
}

const wipeScores = (genre: Genre) => {
    const container = document.querySelector(`#genre_${genre.id} .genre_scores`)!

    container.innerHTML = ""
}

const collapseGenre = (genre: Genre) => {
    const genreDOM = genre.genreDOM!

    genreDOM.classList.remove("genre_open")
    wipeScores(genre)
}

const openGenre = (genre: Genre) => {
    const genreDOM = genre.genreDOM!
    const container = document.querySelector(`#genre_${genre.id} .genre_scores`)!

    genreDOM.classList.add("genre_open")

    container.innerHTML = scores
        .filter((score) => score.genres.some((g) => g.id === genre.id))
        .map((element) => genScoreDOM(element))
        .join("")

    for (const unneededGenre of Object.values(genres)) {
        if (unneededGenre.id !== genre.id) {
            collapseGenre(unneededGenre)
        }
    }

    for (const element of container.querySelectorAll("a.genre_link")!) {
        element.addEventListener("click", (e) => {
            const target = e.target as HTMLAnchorElement

            openGenre(genres[target.dataset.genreId!])
        })
    }
}

const isGenreOpen = (genre: Genre) => {
    return genre.genreDOM!.classList.contains("genre_open")
}

const onGenreClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    const genre = genres[target.dataset.genreId!]

    if (isGenreOpen(genre)) {
        collapseGenre(genre)
    } else {
        openGenre(genre)
    }
}

const initGenreSet = () => {
    for (const genre of Object.values(genres)) {
        genre.genreDOM = document.querySelector(`#genre_${genre.id}`)!

        const genreButton = document.querySelector(`#genre_${genre.id} .genre_title`)!
        const genreListButton = document.querySelector(`.genre_list a[data-genre-id="${genre.id}"]`)!

        genreButton.addEventListener("click", onGenreClick)
        genreListButton.addEventListener("click", onGenreClick)
    }
}

const initScoreSet = () => {
    for (const score of scores) {
        if (score.isGood) {
            score.genres.push(genres["starred"])
        }
    }
}

const onWindowLoad = () => {
    const container = document.querySelector("#scores_container")!

    container.innerHTML = `${genGenreListDOM()}<hr>${Object.values(genres)
        .map((element) => genGenreDOM(element))
        .join("<hr>")}`

    initGenreSet()
    initScoreSet()
}

window.addEventListener("load", onWindowLoad)

export { onGenreClick }
