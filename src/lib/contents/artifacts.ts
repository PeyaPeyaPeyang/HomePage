import "@justinribeiro/lite-youtube"

window.addEventListener("load", () => {
    for (const element of document.querySelectorAll<HTMLUListElement>(".artifact_list")) {
        if ("listFor" in element.dataset) continue

        const listFor = element.dataset.listFor!.valueOf()
        const listArtifacts = document.querySelector(`#${listFor}`)!.querySelectorAll("li")

        for (const artifact of listArtifacts) {
            const artifactTitle = artifact.querySelector(".artifact_title > a > h2")!.innerHTML
            const li = document.createElement("li")
            const anchor = document.createElement("a")

            anchor.href = `#${artifact.getAttribute("id")!.valueOf()}`
            anchor.innerHTML = artifactTitle
            li.append(anchor)
            element.append(li)
        }
    }

    for (const artifact of document.querySelectorAll<HTMLLIElement>(".artifacts > li")) {
        const artifactName = artifact.getAttribute("id")!.valueOf()
        const imagesContainer = artifact.querySelector<HTMLDivElement>(".artifact_images")!
        const imageCount = Number(imagesContainer.dataset.imageCount!.valueOf())

        for (let i = 0; i < imageCount; i++) {
            const image = document.createElement("img")

            image.src = `/images/contents/artifacts/${artifactName}/${i}.min.png`
            image.alt = `${artifactName}-${i}`
            image.title = `${artifactName}-${i}`
            image.className = "artifact_image"
            image.loading = "lazy"
            image.decoding = "async"
            imagesContainer.append(image)
        }
    }
})
