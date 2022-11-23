/**
 * @type string
 */
const colour = "random" // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
const sparkles = 50
const mleft = 25
const mtop = 12
/****************************
 *  Tinkerbell Magic Sparkle *
 *(c)2005-13 mf2fm web-design*
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/
const d = document
const w = window
const al = w.addEventListener
const m = Math

let x = 400
let ox = 400
let y = 300
let oy = 300
let _swide = 800
let shigh = 600
let sleft = 0
let sdown = 0

const tiny = new Array<HTMLSpanElement>()
const star = new Array<HTMLSpanElement>()
const starv = new Array<number>()
const starx = new Array<number>()
const stary = new Array<number>()
const tinyx = new Array<number>()
const tinyy = new Array<number>()
const tinyv = new Array<number>()

const setWidth = () => {
    _swide = d.documentElement.clientWidth
    shigh = d.documentElement.clientHeight
}

al("load", () => {
    for (let i = 0; i < sparkles; i++) {
        let rats = createSpan(3, 3)

        rats.style.visibility = "hidden"
        rats.style.zIndex = "999"
        d.body.append((tiny[i] = rats))
        starv[i] = 0
        tinyv[i] = 0
        rats = createSpan(5, 5)
        rats.style.backgroundColor = "transparent"
        rats.style.visibility = "hidden"
        rats.style.zIndex = "999"
        const rlef = createSpan(1, 5)
        const rdow = createSpan(5, 1)

        rats.append(rlef)
        rats.append(rdow)
        rlef.style.top = "2px"
        rlef.style.left = "0px"
        rdow.style.top = "0px"
        rdow.style.left = "2px"
        d.body.append((star[i] = rats))
    }

    setWidth()
    sparkle()
})

const sparkle = () => {
    let c

    if (m.abs(x - ox) > 1 || m.abs(y - oy) > 1) {
        ox = x
        oy = y

        for (c = 0; c < sparkles; c++)
            if (!starv[c]) {
                if (x < w.innerWidth + sleft - mleft)
                    star[c].style.left = `${(starx[c] = x)}px`
                else {
                    x = w.innerWidth + sleft - mleft

                    star[c].style.left = `${(starx[c] = x)}px`
                }

                if (y < w.innerHeight + sdown - mtop)
                    star[c].style.top = `${(stary[c] = y)}px`
                else {
                    y = w.innerHeight + sdown - mtop

                    star[c].style.top = `${(stary[c] = y)}px`
                }

                star[c].style.clipRule = "rect(0px, 5px, 5px, 0px)"

                const child1 = star[c].childNodes[0] as HTMLSpanElement

                child1.style.backgroundColor =
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    colour === "random" ? newColour() : colour

                const child2 = star[c].childNodes[1] as HTMLSpanElement

                child2.style.backgroundColor = child1.style.backgroundColor

                if (
                    x < w.innerWidth + sleft - mleft &&
                    y < w.innerHeight + sdown - mtop
                )
                    star[c].style.visibility = "visible"
                else {
                    star[c].style.top = `${w.innerHeight + sdown - mtop}px`
                    star[c].style.left = `${w.innerWidth + sleft - mleft}px`
                }

                starv[c] = 50

                break
            }
    }

    for (c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c)
        if (tinyv[c]) update_tiny(c)
    }

    setTimeout(() => {
        sparkle()
    }, 40)
}

const update_star = (i: number) => {
    if (--starv[i] === 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)"
    if (starv[i]) {
        stary[i] += 1 + m.random() * 3
        starx[i] += ((i % 5) - 2) / 5
        if (stary[i] < shigh + sdown) {
            if (stary[i] < w.innerHeight + sdown - mtop)
                star[i].style.top = `${stary[i]}px`
            else star[i].style.top = `${w.innerHeight + sdown - mtop}px`
            if (starx[i] < w.innerWidth + sleft - mleft)
                star[i].style.left = `${starx[i]}px`
            else star[i].style.left = `${w.innerWidth + sleft - mleft}px`
        } else {
            star[i].style.visibility = "hidden"
            starv[i] = 0
        }
    } else {
        tinyv[i] = 50
        tiny[i].style.top = `${(tinyy[i] = stary[i])}px`
        tiny[i].style.left = `${(tinyx[i] = starx[i])}px`
        tiny[i].style.width = "2px"
        tiny[i].style.height = "2px"

        const starChild = star[i].childNodes[0] as HTMLSpanElement

        tiny[i].style.backgroundColor = starChild.style.backgroundColor
        star[i].style.visibility = "hidden"
        if (
            stary[i] < w.innerHeight + sdown - mtop &&
            starx[i] < w.innerWidth + sleft - mleft
        )
            tiny[i].style.visibility = "visible"
        else {
            tiny[i].style.top = `${w.innerHeight + sdown - mtop}px`
            tiny[i].style.left = `${w.innerWidth + sleft - mleft}px`
        }
    }
}

const update_tiny = (i: number) => {
    if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px"
        tiny[i].style.height = "1px"
    }

    if (tinyv[i]) {
        tinyy[i] += 1 + m.random() * 3
        tinyx[i] += ((i % 5) - 2) / 5
        if (tinyy[i] < shigh + sdown) {
            if (tinyy[i] < w.innerHeight + sdown - mtop)
                tiny[i].style.top = `${tinyy[i]}px`
            else tiny[i].style.top = `${w.innerHeight + sdown - mtop}px`
            if (tinyx[i] < w.innerWidth + sleft - mleft)
                tiny[i].style.left = `${tinyx[i]}px`
            else tiny[i].style.left = `${w.innerWidth + sleft - mleft}px`
        } else {
            tiny[i].style.visibility = "hidden"
            tinyv[i] = 0
        }
    } else tiny[i].style.visibility = "hidden"
}

const setScroll = () => {
    sdown = self.pageYOffset
    sleft = self.pageXOffset
}

al("mousemove", (e) => {
    if (e.pageX < w.innerWidth + sleft) x = e.pageX
    if (e.pageY < w.innerHeight + sdown) y = e.pageY
})
al("scroll", setScroll)
al("resize", setWidth)

const createSpan = (height: number, width: number): HTMLSpanElement => {
    const div = d.createElement("span")

    div.style.position = "absolute"
    div.style.height = `${height}px`
    div.style.width = `${width}px`
    div.style.overflow = "hidden"

    return div
}

const newColour = () => {
    const c = []

    c[0] = 255
    c[1] = m.floor(m.random() * 256)
    c[2] = m.floor(m.random() * (256 - c[1] / 2))
    c.sort(() => {
        return 0.5 - m.random()
    })

    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}
