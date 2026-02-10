let email = document.querySelector("#email")
let password = document.querySelector("#password")

let sign_in = document.querySelector("#sign_in")

let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

let changeWord = document.querySelector("#welcomeWord")

changeWord.innerHTML = localStorage.getItem("fristName") || "Welcome Back"

sign_in.addEventListener("click", (e) => {
    e.preventDefault()
    if (email.value === '' || password.value === '') {
        alert("Please fill in all fields")
    } else {
        if (getEmail === email.value && getPassword  === password.value) {
            changeWord.innerHTML = localStorage.getItem("fristName") || "Welcome Back"
            
            setTimeout(() =>{
                window.location = "index.html"
            } , 2000)
        }else if (getEmail != email.value && getPassword != password.value){
            alert("Register your account")
            window.location = "Register.html"
        }else {
            alert("Invalid email or password")
        }
    }
})