// --- 1. DARK MODE TOGGLE ---
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
    const iconSpan = themeBtn.querySelector('.icon');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (iconSpan) iconSpan.textContent = '\u2600\uFE0F';
    }
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (iconSpan) iconSpan.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) animate();
        else if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

// --- 2. REVIEW CAROUSEL (only on pages with review elements) ---
const textElem = document.getElementById('reviewText');
const authorElem = document.getElementById('reviewAuthor');
if (textElem && authorElem) {
    const reviews = [
        { text: "Oli is brilliant at his job and my dog loves him. He is really flexible and will walk my dog at short notice. Highly recommend.", author: "Sue Lake" },
        { text: "Been walking our dog Rupert for over 2 years now... especially enjoy the app updates! I can highly recommend \uD83D\uDC4D", author: "Radram" },
        { text: "Meg absolutely loves her day with Oli and I always have a peaceful evening as she snoozes...", author: "Janet Elston" },
        { text: "Oli and the team treat my mad staffy like one of the family. Could not recommend them highly enough...", author: "Vivian Swift" },
        { text: "We recently visited Cornwall... Oliver was really quick at responding and was very flexible... He kept us updated...", author: "Anna Lomas" },
        { text: "Riley absolutely loved Sophie and we could tell he had a great time. Absolutely fabulous service.", author: "Janey Willis" },
        { text: "Excellent dog sitting service while we were at Rick Stein's. Well worth it!", author: "Philip Bickle" }
    ];
    let currentReview = 0;

    function showReview(index) {
        textElem.style.opacity = 0;
        authorElem.style.opacity = 0;
        setTimeout(() => {
            textElem.innerText = `"${reviews[index].text}"`;
            authorElem.innerText = `- ${reviews[index].author}`;
            textElem.style.opacity = 1;
            authorElem.style.opacity = 1;
        }, 300);
    }

    const nextBtn = document.getElementById('nextReview');
    const prevBtn = document.getElementById('prevReview');
    const randomBtn = document.getElementById('randomReviewBtn');

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentReview = (currentReview - 1 + reviews.length) % reviews.length;
        showReview(currentReview);
    });
    if (randomBtn) randomBtn.addEventListener('click', () => {
        let newIndex;
        do { newIndex = Math.floor(Math.random() * reviews.length); } while (newIndex === currentReview);
        currentReview = newIndex;
        showReview(currentReview);
    });
}

// --- 3. STARS ANIMATION ---
const canvas = document.getElementById('starsCanvas');
let ctx, stars = [];

if (canvas) {
    ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }

    class Star {
        constructor() { this.reset(); this.y = Math.random() * canvas.height; }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.opacity = Math.random();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() { stars = Array(150).fill().map(() => new Star()); }

    resizeCanvas();
    initStars();
    if (document.body.classList.contains('dark-mode')) animate();
    window.addEventListener('resize', () => { resizeCanvas(); initStars(); });
}

function animate() {
    if (!document.body.classList.contains('dark-mode')) return;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => s.draw());
    requestAnimationFrame(animate);
}

// --- 4. MOBILE MENU LOGIC ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const navLinkItems = document.querySelectorAll('.nav-links li a');

function toggleMenu() {
    const isActive = navLinks.classList.contains('active');
    if (!isActive) {
        navLinks.classList.add('active');
        menuOverlay.classList.add('active');
        hamburger.textContent = '\u2715';
        document.body.classList.add('no-scroll');
    } else {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburger.textContent = '\u2630';
        document.body.classList.remove('no-scroll');
    }
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMenu();
        });
    });
}
