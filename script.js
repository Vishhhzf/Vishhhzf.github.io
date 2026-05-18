// --- 1. LOGICA MODO CLARO / OSCURO ---
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const body = document.body;

themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        // Cambiar a Sol
        iconMoon.style.transform = 'rotate(-90deg) scale(0)'; 
        iconSun.style.transform = 'rotate(0deg) scale(1)';    
    } else {
        // Volver a Luna
        iconMoon.style.transform = 'rotate(0deg) scale(1)';   
        iconSun.style.transform = 'rotate(90deg) scale(0)';   
    }
});

// --- 2. CURSOR ---
const cursorDot = document.getElementById('cursor-dot');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // El punto central viaja de manera instantánea
    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
});

function animateCursor() {
    if (!cursorBlur) return;
    // La anilla externa sigue al mouse con físicas de resorte suaves
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    cursorX += distX * 0.15;
    cursorY += distY * 0.15;
    cursorBlur.style.left = `${cursorX}px`;
    cursorBlur.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Click Effects
document.addEventListener('mousedown', () => {
    if (cursorDot) {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.6)';
    }
    if (cursorBlur) {
        cursorBlur.style.transform = 'translate(-50%, -50%) scale(1.4)';
        cursorBlur.style.borderColor = '#ec4899'; // Rosa brillante al hacer clic
        cursorBlur.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.4)';
    }
});
document.addEventListener('mouseup', () => {
    if (cursorDot) {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    if (cursorBlur) {
        cursorBlur.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorBlur.style.borderColor = 'var(--accent, #a855f7)';
        cursorBlur.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.2)';
    }
});

// --- 3. TEXTO HACKER ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
document.querySelectorAll('.reveal-text').forEach(element => {
    element.addEventListener('mouseover', event => {  
        let iterations = 0;
        const targetValue = event.target.dataset.value || event.target.innerText;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iterations) return targetValue[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            if(iterations >= targetValue.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });
});

// --- 4. SCROLL REVEAL ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.project-card, .tech-card, .reveal-on-scroll, .animate-fade-in-up');
elementsToAnimate.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    if(el.classList.contains('tech-card')) {
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index % 4 * 0.1}s`;
    } else {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    observer.observe(el);
});

// --- 5. MAGNETIC BTN ---
const magnets = document.querySelectorAll('.magnetic-btn');
magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const position = magnet.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    magnet.addEventListener('mouseleave', () => {
        magnet.style.transform = 'translate(0px, 0px)';
    });
});

// --- 6. NAVBAR INTELIGENTE (SCROLL UP/DOWN) ---
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (!nav) return;
    const currentScrollY = window.scrollY;

    // Lógica para Ocultar/Mostrar
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }

    // Lógica para el Fondo (Vidrio)
    if (currentScrollY > 20) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }

    lastScrollY = currentScrollY;
});

// --- 7. EMAIL OBFUSCATION (SEGURIDAD ANTI-SCRAPING) ---
const secureEmailBtn = document.getElementById('secure-email-btn');
if(secureEmailBtn) {
    secureEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const user = secureEmailBtn.getAttribute('data-user');
        const domain = secureEmailBtn.getAttribute('data-domain');
        // Reconstruye el email solo cuando el humano hace click
        window.location.href = `mailto:${user}@${domain}`;
    });
}
