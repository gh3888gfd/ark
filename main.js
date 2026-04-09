// Initialize Lucide Icons
lucide.createIcons();

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
const tl = gsap.timeline();
tl.from(".reveal-text", { y: 100, duration: 1, opacity: 0, ease: "power4.out" })
  .from(".reveal-subtext", { opacity: 0, y: 20 }, "-=0.5");

// Parallax Hero
gsap.to(".parallax-bg", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true
    },
    y: 200
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// --- Blog Functionality ---
const blogPosts = [
    { id: 1, title: "The Future of Minimalist Design", category: "design", img: "https://picsum.photos/400/250?random=1" },
    { id: 2, title: "Coding with Abdullah Rabee", category: "tech", img: "https://picsum.photos/400/250?random=2" },
    { id: 3, title: "Travel Chronicles: Tokyo", category: "lifestyle", img: "https://picsum.photos/400/250?random=3" },
];

const blogGrid = document.getElementById('blog-grid');
const searchInput = document.getElementById('blog-search');

function renderPosts(posts) {
    blogGrid.innerHTML = posts.map(post => `
        <article class="post-card glass-card" data-category="${post.category}">
            <img src="${post.img}" alt="${post.title}" loading="lazy">
            <h3>${post.title}</h3>
            <p>Explore the depths of ${post.category}...</p>
            <button class="btn-text">Read More</button>
        </article>
    `).join('');
    
    // Reveal posts on scroll
    gsap.from(".post-card", {
        scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%"
        },
        opacity: 0,
        y: 50,
        stagger: 0.2
    });
}

// Search Filter
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = blogPosts.filter(p => p.title.toLowerCase().includes(term));
    renderPosts(filtered);
});

// --- Theme Toggle ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeBtn.innerHTML = newTheme === 'dark' ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
    lucide.createIcons();
});

// --- Reading Progress Bar ---
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("reading-progress").style.width = scrolled + "%";
    
    // Back to Top visibility
    const btt = document.getElementById('back-to-top');
    if (winScroll > 500) btt.classList.remove('hidden');
    else btt.classList.add('hidden');
});

// --- Clipboard Functionality ---
document.getElementById('copy-link').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
});

// --- Loader Simulation ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        renderPosts(blogPosts);
    }, 1000);
});
