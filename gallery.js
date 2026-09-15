/* =================================
        FLOATING HEARTS
================================= */

const heartContainer =
    document.getElementById("heartContainer");


function createHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add("floating-heart");


    const hearts = [
        "♡",
        "♥",
        "❤",
        "💕",
        "♡"
    ];


    heart.innerHTML =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";


    heart.style.animationDuration =
        (6 + Math.random() * 5) + "s";


    heartContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


setInterval(createHeart, 700);


/* =================================
        POLAROID CLICK
================================= */

const photos =
    document.querySelectorAll(
        ".polaroid img, .mini-photo img, .booth-photo img"
    );


const viewer =
    document.getElementById("photoViewer");


const viewerImage =
    document.getElementById("viewerImage");


const closeViewer =
    document.getElementById("closeViewer");


photos.forEach(photo => {

    photo.addEventListener("click", () => {

        viewerImage.src =
            photo.src;

        viewer.classList.add("active");

    });

});


/* =================================
        CLOSE VIEWER
================================= */

closeViewer.addEventListener(
    "click",
    () => {

        viewer.classList.remove(
            "active"
        );

    }
);


/* =================================
        CLICK BACKDROP
================================= */

viewer.addEventListener(
    "click",
    event => {

        if (
            event.target === viewer
        ) {

            viewer.classList.remove(
                "active"
            );

        }

    }
);


/* =================================
        ESC CLOSE
================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            viewer.classList.remove(
                "active"
            );

        }

    }
);


/* =================================
        LITTLE RANDOM ROTATION
================================= */

const miniPhotos =
    document.querySelectorAll(
        ".mini-photo"
    );


miniPhotos.forEach(photo => {

    photo.addEventListener(
        "mouseenter",
        () => {

            photo.style.transform =
                "rotate(0deg) scale(1.25)";

        }
    );


    photo.addEventListener(
        "mouseleave",
        () => {

            const rotation =
                (Math.random() * 20) - 10;


            photo.style.transform =
                `rotate(${rotation}deg)`;

        }
    );

});