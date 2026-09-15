/* =========================================
   FLOWER PAGE JAVASCRIPT
========================================= */


/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer = document.getElementById("hearts");


function createHeart() {

    if (!heartsContainer) return;


    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = Math.random() > 0.5 ? "💙" : "♡";


    /* RANDOM POSITION */

    heart.style.left =
        Math.random() * 100 + "%";


    /* RANDOM SIZE */

    const size =
        Math.random() * 14 + 10;

    heart.style.fontSize =
        size + "px";


    /* RANDOM SPEED */

    const duration =
        Math.random() * 5 + 5;

    heart.style.animationDuration =
        duration + "s";


    /* RANDOM DELAY */

    heart.style.animationDelay =
        Math.random() * 1 + "s";


    heartsContainer.appendChild(heart);


    /* DELETE AFTER ANIMATION */

    setTimeout(() => {

        heart.remove();

    }, (duration + 2) * 1000);

}


/* Create hearts */

setInterval(createHeart, 650);


/* =========================================
   SPARKLES
========================================= */

const sparklesContainer =
    document.getElementById("sparkles");


function createSparkle() {

    if (!sparklesContainer) return;


    const sparkle =
        document.createElement("div");


    sparkle.className = "sparkle";


    /* RANDOM POSITION */

    sparkle.style.left =
        Math.random() * 100 + "%";


    sparkle.style.top =
        Math.random() * 100 + "%";


    /* RANDOM SIZE */

    const size =
        Math.random() * 4 + 2;

    sparkle.style.width =
        size + "px";

    sparkle.style.height =
        size + "px";


    sparklesContainer.appendChild(sparkle);


    setTimeout(() => {

        sparkle.remove();

    }, 2000);

}


setInterval(createSparkle, 300);


/* =========================================
   BACKGROUND MUSIC
========================================= */

const music =
    document.getElementById("bgMusic");


if (music) {

    music.volume = 0.45;


    /* Try autoplay */

    const playMusic = () => {

        music.play().catch(() => {

            console.log(
                "Autoplay diblokir browser."
            );

        });

    };


    playMusic();


    /* Try again after first interaction */

    document.addEventListener(
        "click",
        () => {

            if (music.paused) {

                music.play().catch(() => {});

            }

        },
        { once: true }
    );

}


/* =========================================
   STOP MUSIC WHEN LEAVING PAGE
========================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (music) {

            music.pause();

            music.currentTime = 0;

        }

    }
);