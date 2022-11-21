const emailRegex =
    /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)+$/

window.validation = () => {
    const submitButton = document.querySelector("#submit_btn")
    const username = document.querySelector("#name")
    const email = document.querySelector("#email")
    const title = document.querySelector("#f_title")
    const body = document.querySelector("#body")

    let disabled

    if (username.value.length === 0) disabled = true
    else if (email.value.length === 0) disabled = true
    else if (!emailRegex.test(email.value)) disabled = true
    else if (title.value.length === 0) disabled = true
    else disabled = body.value.length === 0

    submitButton.disabled = disabled

    return disabled
}

window.doSubmit = () => {
    const [form] = document.querySelectorAll("form")
    const action = form.getAttribute("action")

    const options = {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
    }

    fetch(action, options)
        .then(() => {
            window.location = "contact_got.htm"
        })
        .catch(() => {
            alert("送信に失敗しました！しばらくしてからためしてください！")
        })
}
