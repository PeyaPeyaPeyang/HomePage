import "@justinribeiro/lite-youtube"

window.addEventListener("load", () => {
    const table_of_contents = document.querySelectorAll(".artifact_list")

    for (const list of table_of_contents) {
        const listFor = list.attributes["data-list-for"].value

        const listArtifacts = document
            .querySelector(`#${listFor}`)
            .querySelectorAll("li")

        for (const artifact of listArtifacts) {
            const artifactTitle = artifact.querySelector(
                ".artifact_title > a > h2",
            ).innerHTML

            const li = document.createElement("li")
            const anchor = document.createElement("a")

            anchor.href = `#${artifact.attributes["id"].value}`
            anchor.innerHTML = artifactTitle
            li.append(anchor)
            list.append(li)
        }
    }

    const artifacts = document.querySelectorAll(".artifacts > li")

    for (const artifact of artifacts) {
        const artifactName = artifact.attributes["id"].value
        const imagesContainer = artifact.querySelector(".artifact_images")

        const imageCount =
            0 + imagesContainer.attributes["data-image-count"].value

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
