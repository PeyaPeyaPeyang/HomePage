const colour = "random"; // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
const sparkles = 50;
const mleft = 25;
const mtop = 12;

/****************************
 *  Tinkerbell Magic Sparkle *
 *(c)2005-13 mf2fm web-design*
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/
const d = document;
const w = window;
const al = w.addEventListener;
const m = Math;

let x = 400;
let ox = 400;
let y = 300;
let oy = 300;
let swide = 800;
let shigh = 600;
let sleft = 0;
let sdown = 0;

const tiny = [];
const star = [];
const starv = [];
const starx = [];
const stary = [];
const tinyx = [];
const tinyy = [];
const tinyv = [];

const set_width = () => {
    swide = d.documentElement.clientWidth;
    shigh = d.documentElement.clientHeight;
};

al("load", () => {
    for (let i = 0; i < sparkles; i++) {
        let rats = createDiv(3, 3);
        rats.style.visibility = "hidden";
        rats.style.zIndex = "999";
        d.body.appendChild(tiny[i] = rats);
        starv[i] = 0;
        tinyv[i] = 0;
        rats = createDiv(5, 5);
        rats.style.backgroundColor = "transparent";
        rats.style.visibility = "hidden";
        rats.style.zIndex = "999";
        let rlef = createDiv(1, 5);
        let rdow = createDiv(5, 1);
        rats.appendChild(rlef);
        rats.appendChild(rdow);
        rlef.style.top = "2px";
        rlef.style.left = "0px";
        rdow.style.top = "0px";
        rdow.style.left = "2px";
        d.body.appendChild(star[i] = rats);
    }
    set_width();
    sparkle();
});

const sparkle = () => {
    let c;
    if (m.abs(x - ox) > 1 || m.abs(y - oy) > 1) {
        ox = x;
        oy = y;

        for (c = 0; c < sparkles; c++)
            if (!starv[c]) {
                if (x < w.innerWidth + sleft - mleft)
                    star[c].style.left = (starx[c] = x) + "px";
                else
                    star[c].style.left = (starx[c] = x = w.innerWidth + sleft - mleft) + "px";
                if (y < w.innerHeight + sdown - mtop)
                    star[c].style.top = (stary[c] = y) + "px";
                else
                    star[c].style.top = (stary[c] = y = w.innerHeight + sdown - mtop) + "px";

                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (colour === "random") ? newColour() : colour;
                if (x < w.innerWidth + sleft - mleft && y < w.innerHeight + sdown - mtop)
                    star[c].style.visibility = "visible";
                else {
                    star[c].style.top = w.innerHeight + sdown - mtop + "px";
                    star[c].style.left = w.innerWidth + sleft - mleft + "px";

                }
                starv[c] = 50;
                break;
            }
    }
    for (c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout(() => { sparkle() }, 40);
}

const update_star = (i) => {
    if (--starv[i] === 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    if (starv[i]) {
        stary[i] += 1 + m.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
            if (stary[i] < w.innerHeight + sdown - mtop)
                star[i].style.top = stary[i] + "px";
            else
                star[i].style.top = w.innerHeight + sdown - mtop + "px";
            if (starx[i] < w.innerWidth + sleft - mleft)
                star[i].style.left = starx[i] + "px";
            else
                star[i].style.left = w.innerWidth + sleft - mleft + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;

        }
    } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        if (stary[i] < w.innerHeight + sdown - mtop && starx[i] < w.innerWidth + sleft - mleft)
            tiny[i].style.visibility = "visible"
        else {
            tiny[i].style.top = w.innerHeight + sdown - mtop + "px";
            tiny[i].style.left = w.innerWidth + sleft - mleft + "px";
        }
    }
}

const update_tiny = (i) => {
    if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + m.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
            if (tinyy[i] < w.innerHeight + sdown - mtop)
                tiny[i].style.top = tinyy[i] + "px";
            else
                tiny[i].style.top = w.innerHeight + sdown - mtop + "px";
            if (tinyx[i] < w.innerWidth + sleft - mleft)
                tiny[i].style.left = tinyx[i] + "px";
            else
                tiny[i].style.left = w.innerWidth + sleft - mleft + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else tiny[i].style.visibility = "hidden";
}

const set_scroll = () => {
    if (typeof (self.pageYOffset) == 'number') {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset;
    } else if (d.body && (d.body.scrollTop || d.body.scrollLeft)) {
        sdown = d.body.scrollTop;
        sleft = d.body.scrollLeft;
    } else if (d.documentElement && (d.documentElement.scrollTop || d.documentElement.scrollLeft)) {
        sleft = d.documentElement.scrollLeft;
        sdown = d.documentElement.scrollTop;
    } else {
        sdown = 0;
        sleft = 0;
    }
};

al("mousemove", (e) => {
        if (e) {
            if (e.pageX < w.innerWidth + sleft)
                x = e.pageX - 10;
            if (e.pageY < w.innerHeight + sdown)
                y = e.pageY - 10;
        } else {
            set_scroll();
            y = event.y + sdown;
            x = event.x + sleft;
        }
    }
);
al("scroll", set_scroll);
al("resize", set_width);

const createDiv = (height, width) => {
    const div = d.createElement("span");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return (div);
}

const newColour = () => {
    const c = [];
    c[0] = 255;
    c[1] = m.floor(m.random() * 256);
    c[2] = m.floor(m.random() * (256 - c[1] / 2));
    c.sort(function () {
        return (0.5 - m.random());
    });
    return ("rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")");
}
