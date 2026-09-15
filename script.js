
const page2= document.getElementById("page2");

page2.addEventListener("click", () => {

    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "page2.html";
    }, 1000);

});
const love= document.getElementById("love");

love.addEventListener("click", () => {

    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "love.html";
    }, 1000);

});
document.querySelector(".gallery")
.addEventListener("click",()=>{

window.location.href="gallery.html";

});
document.querySelector(".flowers")
.addEventListener("click",()=>{

window.location.href="flower.html";

});
document.querySelector(".music")
.addEventListener("click",()=>{

window.location.href="music.html";

});
document.querySelector(".letter")
.addEventListener("click",()=>{

window.location.href="letter.html";

});