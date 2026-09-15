//======================================
// ELEMENT
//======================================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const vinyl = document.querySelector(".vinyl");
const cover = document.querySelector(".cover");

const particle = document.getElementById("music-particles");

let isPlay = false;


//======================================
// PLAY
//======================================

playBtn.addEventListener("click",()=>{

    if(isPlay){

        audio.pause();

        playBtn.innerHTML="▶";

        vinyl.style.animationPlayState="paused";

        cover.style.animationPlayState="paused";

    }else{

        audio.play();

        playBtn.innerHTML="⏸";

        vinyl.style.animationPlayState="running";

        cover.style.animationPlayState="running";

    }

    isPlay=!isPlay;

});


//======================================
// VOLUME
//======================================

volume.addEventListener("input",()=>{

    audio.volume=volume.value/100;

});


//======================================
// PROGRESS
//======================================

audio.addEventListener("timeupdate",()=>{

    const percent=(audio.currentTime/audio.duration)*100;

    progress.value=percent;

    currentTime.innerHTML=format(audio.currentTime);

    duration.innerHTML=format(audio.duration);

});

progress.addEventListener("input",()=>{

    audio.currentTime=(progress.value/100)*audio.duration;

});


//======================================
// FORMAT WAKTU
//======================================

function format(time){

    if(isNaN(time)) return "00:00";

    let minute=Math.floor(time/60);

    let second=Math.floor(time%60);

    if(minute<10) minute="0"+minute;

    if(second<10) second="0"+second;

    return minute+":"+second;

}


//======================================
// PREVIOUS & NEXT
//======================================

prevBtn.addEventListener("click",()=>{

    audio.currentTime=0;

});

nextBtn.addEventListener("click",()=>{

    audio.currentTime=audio.duration;

});


//======================================
// LOVE PARTICLE
//======================================

setInterval(()=>{

    if(!isPlay) return;

    createLove();

},250);


//======================================
// LOVE
//======================================

function createLove(){

    const love=document.createElement("div");

    love.innerHTML="💙";

    love.className="love";

    love.style.left=Math.random()*100+"vw";

    love.style.top="100vh";

    love.style.fontSize=(20+Math.random()*20)+"px";

    particle.appendChild(love);

    love.animate([

        {

            transform:"translateY(0) scale(.5)",

            opacity:0

        },

        {

            opacity:1

        },

        {

            transform:"translateY(-110vh) rotate(360deg)",

            opacity:0

        }

    ],{

        duration:4000,

        easing:"linear"

    });

    setTimeout(()=>{

        love.remove();

    },4000);

}


//======================================
// MUSIC NOTE
//======================================

setInterval(()=>{

    if(!isPlay) return;

    note();

},350);

function note(){

    const music=document.createElement("div");

    music.innerHTML="🎵";

    music.className="music";

    music.style.left=45+Math.random()*10+"%";

    music.style.top="45%";

    music.style.position="absolute";

    music.style.fontSize=(18+Math.random()*18)+"px";

    particle.appendChild(music);

    music.animate([

        {

            transform:"translate(0,0)",

            opacity:0

        },

        {

            opacity:1

        },

        {

            transform:`translate(${Math.random()*250-125}px,-300px)`,

            opacity:0

        }

    ],{

        duration:3000

    });

    setTimeout(()=>{

        music.remove();

    },3000);

}