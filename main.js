gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Follower
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
    });
});

// 2. Reading Progress Bar Logic
gsap.to("#readingProgress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

// 3. Magnetic Menu Items
const magnetics = document.querySelectorAll('.magnetic');
magnetics.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        gsap.to(item, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { x: 0, y: 0, duration: 0.3 });
    });
});

// 4. Staggered Entrance (Page Load)
const tl = gsap.timeline();
tl.from(".reveal-text", { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
  .from(".stagger-load", { opacity: 0, y: 20, stagger: 0.2 }, "-=0.5")
  .from(".bento-item", { scale: 0.8, opacity: 0, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.5");

// 5. Dark Mode Logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate button morph
    gsap.to(".sun-moon", { rotation: "+=180", duration: 0.5 });
});

// 6. Automated Reading Time Calculation
const calculateReadTime = () => {
    const text = document.body.innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    console.log(`Estimated Read Time: ${time} min`);
};
calculateReadTime();

// 7. Scroll-Triggered Parallax for Images
gsap.utils.toArray('.bento-item').forEach(item => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top bottom",
            toggleActions: "play none none reverse"
        },
        y: -30,
        duration: 1
    });
});
