// log in by in our website 
let userInfo = document.querySelector('#user_info')
let userName = document.querySelector('#user');

let links = document.querySelector('#links')

if (localStorage.getItem('fristName') && localStorage.getItem('lastName')) {
    userName.innerHTML = `${localStorage.getItem('fristName')} ${localStorage.getItem('lastName')}`;
    userInfo.style.display = "flex";
    links.style.display = "none";
} else {
    userInfo.style.display = "none";
    links.style.display = "flex";
}
// Log Out 
let logout = document.querySelector('#logout')
logout.addEventListener("click" , () =>{
    localStorage.clear()
    setTimeout( () => {
        alert("Log out successfully")
        window.location = "index.html"
    } ,2000)
})