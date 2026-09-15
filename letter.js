/* ============================================================
   MATRIX CODE RAIN — HAPPY BIRTHDAY
   Pure JavaScript + Canvas
============================================================ */


/* ============================================================
   CONFIGURATION
   =========================================================

   GANTI BAGIAN INI UNTUK MEMBUAT VERSI UNTUK ORANG LAIN.
============================================================ */

const CONFIG = {

    /* -----------------------------------------
       DATA PERSONAL
    ----------------------------------------- */

    name: "Syaila Ayu Ningrum",

    ageText: "21",

    birthday: "23-September-2026",

    closingMessage: "I LOVE YOU",


    /* -----------------------------------------
       DURASI
       
       Angka dalam milliseconds.
    ----------------------------------------- */

    countdownDuration: 2300,

    messageDuration: 3000,

    dissolveDuration: 1100,

    assembleDuration: 1250,


    /* -----------------------------------------
       MATRIX
    ----------------------------------------- */

    matrix: {

        fontSize: 15,

        baseOpacity: 0.42,

        headOpacity: 0.9,

        minSpeed: 1.2,

        maxSpeed: 4.5,

        trailAlpha: 0.055,

        columnGap: 1
    },


    /* -----------------------------------------
       WARNA
    ----------------------------------------- */

    colors: {

        background: "#000000",

        rain: "#f7b8d6",

        head: "#ffe2ee",

        mainText: "#ffb3d9",

        glow: "#ff8fc7"
    }

};


/* ============================================================
   ELEMENTS
============================================================ */

const canvas =
    document.getElementById("matrixCanvas");

const ctx =
    canvas.getContext("2d", {
        alpha: false
    });

const messageElement =
    document.getElementById("message");

const replayButton =
    document.getElementById("replayButton");


/* ============================================================
   GLOBAL STATE
============================================================ */

let width = 0;
let height = 0;

let columns = [];

let animationFrame = null;

let lastFrameTime = 0;

let currentCharacters = "HAPPYBIRTHDAY";

let sequenceRunning = false;

let isReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* ============================================================
   UTILITY
============================================================ */

/**
 * Mengambil karakter unik dari sebuah string.
 *
 * Contoh:
 * "HAPPY BIRTHDAY"
 * menjadi:
 * "HAPYBIRTHD"
 */
function getCharacters(text) {

    const chars =
        text
            .replace(/[^A-Za-z0-9]/g, "")
            .toUpperCase()
            .split("");

    return [
        ...new Set(chars)
    ].join("");
}


/**
 * Angka random.
 */
function random(min, max) {

    return Math.random() *
        (max - min) +
        min;
}


/**
 * Integer random.
 */
function randomInt(min, max) {

    return Math.floor(
        random(min, max + 1)
    );
}


/**
 * Ambil karakter random dari string.
 */
function randomCharacter(chars) {

    if (!chars || chars.length === 0) {

        return "A";
    }

    return chars[
        randomInt(0, chars.length - 1)
    ];
}


/* ============================================================
   RESIZE CANVAS
============================================================ */

function resizeCanvas() {

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    width =
        window.innerWidth;

    height =
        window.innerHeight;


    canvas.width =
        Math.floor(width * dpr);

    canvas.height =
        Math.floor(height * dpr);


    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;


    /*
     * Semua koordinat berikutnya
     * menggunakan CSS pixel.
     */
    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    createColumns();
}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* ============================================================
   CREATE MATRIX COLUMNS
============================================================ */

function createColumns() {

    const fontSize =
        CONFIG.matrix.fontSize;

    /*
     * Lebar antar kolom.
     */
    const columnWidth =
        fontSize +
        CONFIG.matrix.columnGap;

    const count =
        Math.ceil(
            width / columnWidth
        );


    columns = [];


    for (let i = 0; i < count; i++) {

        columns.push({

            x:
                i * columnWidth,

            y:
                random(
                    -height,
                    height
                ),

            speed:
                random(
                    CONFIG.matrix.minSpeed,
                    CONFIG.matrix.maxSpeed
                ),

            length:
                randomInt(
                    5,
                    24
                ),

            opacity:
                random(
                    0.15,
                    0.7
                ),

            /*
             * Delay kecil supaya
             * tidak semua kolom bergerak
             * secara identik.
             */
            delay:
                random(
                    0,
                    3000
                )
        });
    }
}


/* ============================================================
   MATRIX RAIN DRAW
============================================================ */

function drawMatrix(timestamp) {

    /*
     * Trail khas Matrix.
     *
     * Kita tidak membersihkan canvas sepenuhnya.
     * Sebaliknya, kita menutupnya dengan warna hitam
     * transparan.
     */
    ctx.fillStyle =
        `rgba(0, 0, 0, ${CONFIG.matrix.trailAlpha})`;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    const fontSize =
        CONFIG.matrix.fontSize;


    ctx.font =
        `${fontSize}px monospace`;

    ctx.textAlign = "center";

    ctx.textBaseline = "top";


    columns.forEach(column => {

        /*
         * Posisi awal kolom.
         */
        let y =
            column.y;


        /*
         * Setiap kolom terdiri dari
         * beberapa karakter.
         */
        for (
            let i = 0;
            i < column.length;
            i++
        ) {

            const char =
                randomCharacter(
                    currentCharacters
                );


            /*
             * Semakin jauh dari head,
             * semakin redup.
             */
            const fade =
                1 -
                (i / column.length);


            const alpha =
                column.opacity *
                fade;


            /*
             * Karakter paling depan
             * dibuat lebih terang.
             */
            if (i === 0) {

                ctx.fillStyle =
                    `rgba(255, 226, 238, ${
                        Math.min(
                            CONFIG.matrix.headOpacity,
                            alpha + 0.25
                        )
                    })`;

            } else {

                /*
                 * #f7b8d6
                 */
                ctx.fillStyle =
                    `rgba(247, 184, 214, ${
                        alpha * 0.75
                    })`;
            }


            ctx.fillText(
                char,
                column.x,
                y
            );


            y += fontSize;
        }


        /*
         * Gerakkan kolom.
         */
        column.y +=
            column.speed;


        /*
         * Jika seluruh kolom sudah
         * melewati layar, reset ke atas.
         */
        if (
            column.y -
            column.length * fontSize
            >
            height
        ) {

            column.y =
                random(
                    -height * 0.5,
                    -fontSize
                );

            column.speed =
                random(
                    CONFIG.matrix.minSpeed,
                    CONFIG.matrix.maxSpeed
                );

            column.length =
                randomInt(
                    5,
                    24
                );

            column.opacity =
                random(
                    0.15,
                    0.7
                );
        }

    });
}


/* ============================================================
   ANIMATION LOOP
============================================================ */

function matrixLoop(timestamp) {

    /*
     * Throttle ringan untuk HP.
     *
     * Kita target sekitar 60 FPS,
     * tetapi browser tetap bebas mengatur
     * refresh rate.
     */
    if (
        timestamp - lastFrameTime
        >= 1000 / 60
    ) {

        drawMatrix(timestamp);

        lastFrameTime =
            timestamp;
    }


    animationFrame =
        requestAnimationFrame(
            matrixLoop
        );
}


/* ============================================================
   UPDATE MATRIX CHARACTERS
============================================================ */

function setMatrixCharacters(text) {

    currentCharacters =
        getCharacters(text);


    /*
     * Kalau string terlalu pendek,
     * tambahkan karakter agar hujan
     * tidak terlalu monoton.
     */
    if (
        currentCharacters.length < 2
    ) {

        currentCharacters +=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
}


/* ============================================================
   MESSAGE
============================================================ */

function setMessage(text) {

    messageElement.textContent =
        text;

    messageElement.dataset.text =
        text;

    /*
     * Reset animation CSS.
     */
    messageElement.classList.remove(
        "assemble",
        "dissolve"
    );

    /*
     * Force reflow supaya animation
     * bisa dimainkan ulang.
     */
    void messageElement.offsetWidth;

    messageElement.classList.add(
        "assemble"
    );
}


/* ============================================================
   DISSOLVE MESSAGE
============================================================ */

function dissolveMessage() {

    messageElement.classList.remove(
        "assemble"
    );

    void messageElement.offsetWidth;

    messageElement.classList.add(
        "dissolve"
    );
}


/* ============================================================
   WAIT
============================================================ */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );
}


/* ============================================================
   SEQUENCE DATA
   =========================================================

   Semua pesan berada dalam array ini.

   Format:

   {
       text: "ISI PESAN",
       duration: 3000,
       chars: "ABC..."
   }

============================================================ */

function buildSequence() {

    return [

        /* ==========================================
           COUNTDOWN
        ========================================== */

        {
            text: "3",

            duration:
                CONFIG.countdownDuration,

            chars:
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        },

        {
            text: "2",

            duration:
                CONFIG.countdownDuration,

            chars:
                "0123456789"
        },

        {
            text: "1",

            duration:
                CONFIG.countdownDuration,

            chars:
                "0123456789"
        },


        /* ==========================================
           HAPPY BIRTHDAY
        ========================================== */

        {
            text: "HAPPY BIRTHDAY",

            duration:
                CONFIG.messageDuration,

            chars:
                getCharacters(
                    "HAPPY BIRTHDAY"
                )
        },


        /* ==========================================
           NAMA
        ========================================== */

        {
            text:
                CONFIG.name,

            duration:
                CONFIG.messageDuration,

            chars:
                getCharacters(
                    CONFIG.name
                )
        },


        /* ==========================================
           UMUR / TAHUN
        ========================================== */

        {
            text:
                `HAPPY ${CONFIG.ageText}`,

            duration:
                CONFIG.messageDuration,

            chars:
                getCharacters(
                    `HAPPY ${CONFIG.ageText}`
                )
        },


        /* ==========================================
           TANGGAL
        ========================================== */

        {
            text:
                CONFIG.birthday,

            duration:
                CONFIG.messageDuration,

            chars:
                getCharacters(
                    CONFIG.birthday
                )
        },


        /* ==========================================
           PENUTUP
        ========================================== */

        {
            text:
                CONFIG.closingMessage,

            duration:
                CONFIG.messageDuration + 1000,

            chars:
                getCharacters(
                    CONFIG.closingMessage
                )
        }

    ];
}


/* ============================================================
   RUN ONE MESSAGE
============================================================ */

async function playMessage(item) {

    /*
     * Matrix sekarang hanya menggunakan
     * huruf dari pesan tersebut.
     */
    setMatrixCharacters(
        item.chars || item.text
    );


    /*
     * Sedikit dorongan pada rain
     * ketika pesan mulai muncul.
     */
    boostRain();


    /*
     * Assemble.
     */
    setMessage(
        item.text
    );


    /*
     * Tunggu pesan bertahan.
     */
    await wait(
        item.duration
    );


    /*
     * Larut menjadi hujan.
     */
    dissolveMessage();


    /*
     * Beri waktu untuk dissolve.
     */
    await wait(
        CONFIG.dissolveDuration
    );
}


/* ============================================================
   RAIN BOOST
============================================================ */

function boostRain() {

    columns.forEach(column => {

        /*
         * Sesaat buat sebagian kolom
         * lebih cepat.
         */
        if (
            Math.random() < 0.65
        ) {

            column.speed *=
                random(
                    1.1,
                    1.8
                );
        }

    });
}


/* ============================================================
   PLAY SEQUENCE
============================================================ */

async function playSequence() {

    if (sequenceRunning) {
        return;
    }

    sequenceRunning = true;


    /*
     * Hilangkan tombol replay.
     */
    replayButton.classList.remove(
        "visible"
    );


    /*
     * Reset text.
     */
    messageElement.classList.remove(
        "assemble",
        "dissolve"
    );

    messageElement.textContent =
        "";

    messageElement.dataset.text =
        "";


    /*
     * Ambil sequence terbaru.
     */
    const sequence =
        buildSequence();


    /*
     * Jalankan satu per satu.
     */
    for (
        const item of sequence
    ) {

        await playMessage(
            item
        );

    }


    /*
     * Selesai.
     */
    sequenceRunning =
        false;


    /*
     * Kembalikan Matrix ke
     * kombinasi seluruh pesan.
     */
    setMatrixCharacters(
        "HAPPYBIRTHDAY" +
        CONFIG.name +
        CONFIG.ageText +
        CONFIG.birthday +
        CONFIG.closingMessage
    );


    /*
     * Tampilkan tombol replay.
     */
    replayButton.classList.add(
        "visible"
    );
}


/* ============================================================
   REDUCED MOTION MODE
============================================================ */

function showStaticVersion() {

    /*
     * Tidak memainkan animasi.
     *
     * Kita tetap menggambar Matrix
     * sangat sederhana, tetapi pesan
     * ditampilkan secara statis.
     */

    const finalText =
        CONFIG.closingMessage;

    setMatrixCharacters(
        finalText
    );

    messageElement.textContent =
        finalText;

    messageElement.dataset.text =
        finalText;

    messageElement.style.opacity =
        "1";

    messageElement.style.transform =
        "scale(1)";

    messageElement.style.filter =
        "none";

    replayButton.classList.add(
        "visible"
    );
}


/* ============================================================
   REPLAY
============================================================ */

replayButton.addEventListener(
    "click",
    () => {

        /*
         * Bersihkan canvas.
         */
        ctx.fillStyle =
            "#000000";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /*
         * Reset columns.
         */
        createColumns();


        /*
         * Jalankan lagi.
         */
        if (!isReducedMotion) {

            playSequence();

        } else {

            showStaticVersion();

        }
    }
);


/* ============================================================
   INITIALIZATION
============================================================ */

function init() {

    /*
     * Setup canvas.
     */
    resizeCanvas();


    /*
     * Matrix awal.
     */
    setMatrixCharacters(
        "HAPPYBIRTHDAY"
    );


    /*
     * Start render loop.
     */
    animationFrame =
        requestAnimationFrame(
            matrixLoop
        );


    /*
     * Reduced motion?
     */
    if (isReducedMotion) {

        showStaticVersion();

    } else {

        /*
         * Beri sedikit waktu agar
         * layar benar-benar gelap
         * sebelum angka 3 muncul.
         */
        setTimeout(
            () => {

                playSequence();

            },
            700
        );
    }
}


/* ============================================================
   START
============================================================ */

init();