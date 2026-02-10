let fristName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let email = document.querySelector("#email")
let password = document.querySelector("#password")

let sign_up = document.querySelector("#sign_up")

let changeWord = document.querySelector("#welcomeWord")

let arrow =document.querySelector("#arrow")

sign_up.addEventListener("click", (e) => {
    e.preventDefault()
    if (fristName.value === '' || lastName.value === '' || email.value === '' || password.value === '') {
        alert("Please fill in all fields")
    } else {
        localStorage.setItem("fristName", fristName.value)
        localStorage.setItem("lastName", lastName.value)
        localStorage.setItem("email", email.value)
        localStorage.setItem("password", password.value)

        changeWord.innerHTML = fristName.value

        arrow.classList.add("move")
        setTimeout(() => {
            window.location = "login.html"
        }, 2000)
    }
})
