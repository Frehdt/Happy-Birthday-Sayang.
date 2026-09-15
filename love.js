const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const HEART_SCALE = 16;
const TOTAL_PARTICLES = 1800;

function heart(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t))
    };
}

class Particle {

    constructor() {

        this.angle = Math.random() * Math.PI * 2;

        this.speed = 0.002 + Math.random() * 0.003;

        this.size = Math.random() * 2 + 1;

        this.alpha = Math.random();

        this.offset = Math.random() * Math.PI * 2;

    }

    update(time) {

        this.angle += this.speed;

        const p = heart(this.angle + Math.sin(time * 0.001 + this.offset) * 0.2);

        this.x = p.x * HEART_SCALE;

        this.y = p.y * HEART_SCALE;

    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle = `rgba(0,190,255,${this.alpha})`;

        ctx.shadowColor = "#00bfff";

        ctx.shadowBlur = 15;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

    }

}
// ===============================
// Membuat Partikel
// ===============================

for (let i = 0; i < TOTAL_PARTICLES; i++) {
    particles.push(new Particle());
}

// ===============================
// Background Trail
// ===============================

function drawBackground() {

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, 0, w, h);

}

// ===============================
// Glow
// ===============================

function setupGlow() {

    ctx.shadowColor = "#00bfff";
    ctx.shadowBlur = 20;

}

// ===============================
// Animasi
// ===============================

function animate(time) {

    drawBackground();

    ctx.save();

    ctx.translate(w / 2, h / 2);

    const pulse = 1 + Math.sin(time * 0.003) * 0.08;

    ctx.scale(pulse, pulse);

    setupGlow();

    for (let p of particles) {

        p.update(time);

        p.draw();

    }

    ctx.restore();

    requestAnimationFrame(animate);

}

// ===============================
// Loading Screen
// ===============================

setTimeout(() => {

    const loading = document.getElementById("loading");

    if (loading) {

        loading.classList.add("hide");

    }

}, 1000);
// ===============================
// Efek Garis Antar Partikel
// ===============================

function drawLines() {

    ctx.lineWidth = 0.4;

    for (let i = 0; i < particles.length; i += 2) {

        const p1 = particles[i];
        const p2 = particles[(i + 1) % particles.length];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {

            const alpha = 1 - dist / 10;

            ctx.beginPath();

            ctx.strokeStyle = `rgba(0,190,255,${alpha * 0.35})`;

            ctx.shadowColor = "#00bfff";
            ctx.shadowBlur = 10;

            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.stroke();
        }
    }
}

// ===============================
// Override Animasi
// ===============================

function animate(time) {

    drawBackground();

    ctx.save();

    ctx.translate(w / 2, h / 2);

    const pulse = 1 + Math.sin(time * 0.003) * 0.08;

    ctx.scale(pulse, pulse);

    ctx.rotate(Math.sin(time * 0.0003) * 0.03);

    setupGlow();

    for (const p of particles) {
        p.update(time);
    }

    drawLines();

    for (const p of particles) {
        p.draw();
    }

    ctx.restore();

    requestAnimationFrame(animate);
}

// ===============================
// Mulai Animasi
// ===============================

requestAnimationFrame(animate);