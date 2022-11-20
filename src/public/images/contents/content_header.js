/* eslint-disable unicorn/filename-case */

window.addEventListener("load", () => {
    const header = "../assets/contents/content_header.htm"

    fetch(header)
        .then((response) => response.text())
        .then((text) => {
            document.querySelector("#content_header").innerHTML = text
        })
        .catch((error) => {
            console.log(error)
        })
})

/* eslint-enable unicorn/filename-case */
