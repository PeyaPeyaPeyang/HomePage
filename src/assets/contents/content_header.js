window.addEventListener("load", () => {
    const header = "../assets/contents/content_header.htm";

    fetch(header)
        .then(response => response.text())
        .then(text => {
            document.getElementById("content_header").innerHTML = text
        })
        .catch(error => {
            console.log(error);
        })
})
