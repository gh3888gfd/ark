gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Follower
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
    });
});

// 2. Reading Progress Bar
window.onscroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("readingProgress").style.width = scrolled + "%";
};

// 3. Staggered Entrances
gsap.from(".reveal-text", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.5
});

gsap.from(".bento-item", {
    scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%"
    },
    scale: 0.8,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: "expo.out"
});

// 4. Magnetic Menu Items
const magneticItems = document.querySelectorAll('.magnetic-item');
magneticItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.5;
        const y = (e.clientY - top - height / 2) * 0.5;
        gsap.to(item, { x: x, y: y, duration: 0.3 });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { x: 0, y: 0, duration: 0.3 });
    });
});

// 5. Card Tilt Effect (Simplified)
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const dx = (e.clientX - left) / width - 0.5;
        const dy = (e.clientY - top) / height - 0.5;
        gsap.to(card, {
            rotationY: dx * 10,
            rotationX: -dy * 10,
            transformPerspective: 1000,
            duration: 0.5
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5 });
    });
});

// 6. Heart Pop Particle Logic
const heartArea = document.querySelector('.heart-pop-area');
heartArea?.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = e.offsetX + 'px';
    heart.style.top = e.offsetY + 'px';
    heartArea.appendChild(heart);

    gsap.to(heart, {
        y: -100,
        opacity: 0,
        duration: 1,
        onComplete: () => heart.remove()
    });
});
