import type { Book } from "@/types/books"

const BOOKS_API_ENDPOINT = "/api/contents/books.json"

const getBooks = async () => {
    const response = await fetch(BOOKS_API_ENDPOINT)

    return (await response.json()) as Book[]
}

const projectile = (i: number, book: Book): HTMLElement => {
    const li = document.createElement("li")

    li.classList.add("book_info_container")

    const bookAuthorDetail = document.createElement("div")

    bookAuthorDetail.classList.add("book_detail")
    bookAuthorDetail.classList.add("book_info")

    const p = document.createElement("p")
    const bookIdx = document.createElement("span")

    bookIdx.classList.add("book_detail")
    bookIdx.classList.add("book_idx")
    bookIdx.textContent = `${i + 1}. `

    const bookTitle = document.createElement("span")

    bookTitle.classList.add("book_detail")
    bookTitle.classList.add("book_title")

    const bookTitleLink = document.createElement("a")

    bookTitleLink.href = book.link
    bookTitleLink.target = "_blank"
    bookTitleLink.textContent = book.title.original

    bookTitle.append("『")
    bookTitle.append(bookTitleLink)
    bookTitle.append("』")

    p.append(bookIdx)
    p.append(bookTitle)

    const bookAuthor = document.createElement("p")

    bookAuthor.classList.add("book_detail")
    bookAuthor.classList.add("book_author")
    bookAuthor.textContent = book.author.main.name

    const bookPublisher = document.createElement("span")

    bookPublisher.classList.add("book_detail")
    bookPublisher.classList.add("book_publisher")
    bookPublisher.textContent = book.publisher.name

    bookAuthor.append(" - ")
    bookAuthor.append(bookPublisher)
    bookAuthorDetail.append(p)

    if (book.image) {
        const bookThumbnailLink = document.createElement("a")
        const bookThumbnail = document.createElement("img")

        bookThumbnail.classList.add("book_detail")
        bookThumbnail.classList.add("book_thumbnail")
        bookThumbnail.width = 100
        bookThumbnail.height = 136
        bookThumbnail.src = book.image
        bookThumbnail.alt = `${book.title.original} のサムネイル`
        bookThumbnail.loading = "lazy"
        bookThumbnail.decoding = "async"

        bookThumbnailLink.href = book.link
        bookThumbnailLink.target = "_blank"
        bookThumbnailLink.append(bookThumbnail)
        bookAuthorDetail.append(bookThumbnailLink)
    }

    bookAuthorDetail.append(bookAuthor)

    const bookMetaInfo = document.createElement("p")

    bookMetaInfo.classList.add("book_detail")
    bookMetaInfo.classList.add("book_meta_info")

    const bookPageCount = book.page
    const bookCategory = `C${book.kind.code}`
    const bookPrice = book.purchase.price

    bookMetaInfo.textContent = `${bookCategory}, ${bookPageCount}ページ`

    if (bookPrice) {
        bookMetaInfo.textContent += ` / ￥${bookPrice.original.price}E`
    }

    bookAuthorDetail.append(bookMetaInfo)

    const bookDetail = document.createElement("div")

    bookDetail.classList.add("book_detail")
    bookDetail.classList.add("book_info")

    const bookDescription = document.createElement("span")

    bookDescription.classList.add("book_detail")
    bookDescription.classList.add("book_description")

    if (book.memo) {
        bookDescription.innerHTML = book.memo
    }

    const bookPublishedAt = document.createElement("span")
    const publishedAt = book.publish.first

    bookPublishedAt.classList.add("book_detail")
    bookPublishedAt.classList.add("book_published_at")
    bookPublishedAt.textContent = `(${publishedAt.year}/${publishedAt.month}/${publishedAt.day})`

    bookDetail.append(bookDescription)
    bookDetail.append(bookPublishedAt)

    li.append(bookAuthorDetail)
    li.append(bookDetail)

    return li
}

const render = (books: Book[]) => {
    const booksContainer = document.querySelector("#books-container")

    if (!booksContainer) {
        return
    }

    for (const [i, book] of books.entries()) {
        const li = projectile(i, book)

        booksContainer.append(li)
    }

    const booksCount = document.querySelector("#book-count")

    if (!booksCount) {
        return
    }

    booksCount.textContent = books.length.toString()
}

window.addEventListener("load", () => {
    getBooks()
        .then(render)
        .catch((error) => {
            console.error(error)
        })
})
