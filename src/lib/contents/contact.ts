const emailRegex =
    /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)+$/

const validateEmail = () => {
    const submitButton: HTMLButtonElement = document.querySelector("#submit_btn")!
    const username: HTMLInputElement = document.querySelector("#name")!
    const email: HTMLInputElement = document.querySelector("#email")!
    const title: HTMLInputElement = document.querySelector("#f_title")!
    const body: HTMLTextAreaElement = document.querySelector("#body")!

    const disabled =
        username.value.length === 0 ||
        email.value.length === 0 ||
        !emailRegex.test(email.value) ||
        title.value.length === 0 ||
        body.value.length === 0

    submitButton.disabled = disabled

    return disabled
}

const submitContactForm = () => {
    const [form] = document.querySelectorAll("form")
    const action = form.getAttribute("action")!

    const options: RequestInit = {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
    }

    fetch(action, options)
        .then(() => {
            window.location.href = "contact_got.htm"
        })
        .catch(() => {
            alert("送信に失敗しました！しばらくしてからためしてください！")
        })
}

window.addEventListener("load", () => {
    const inputs = document.querySelectorAll(".form-input")
    const submitButton: HTMLButtonElement = document.querySelector("#submit_btn")!

    for (const input of inputs) {
        input.addEventListener("change", validateEmail)
        input.addEventListener("focus", validateEmail)
        input.addEventListener("keydown", validateEmail)
    }

    submitButton.addEventListener("click", submitContactForm)
})
