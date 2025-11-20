// --- 1. LOGICA MODO CLARO / OSCURO ---
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const body = document.body;

themeToggle.addEventListener('click', () => {
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
const cursor = document.getElementById('cursor-blur');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Click Effects
document.addEventListener('mousedown', () => {
    cursor.style.width = '300px'; cursor.style.height = '300px';
});
document.addEventListener('mouseup', () => {
    cursor.style.width = '400px'; cursor.style.height = '400px';
});

// --- 3. TEXTO HACKER ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
document.querySelectorAll('.reveal-text').forEach(element => {
    element.addEventListener('mouseover', event => {  
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iterations) return event.target.dataset.value[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            if(iterations >= event.target.dataset.value.length) clearInterval(interval);
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
    const currentScrollY = window.scrollY;

    // Lógica para Ocultar/Mostrar
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Si bajas y has pasado 50px del tope -> Ocultar
        nav.classList.add('nav-hidden');
    } else {
        // Si subes -> Mostrar
        nav.classList.remove('nav-hidden');
    }

    // Lógica para el Fondo (Vidrio)
    if (currentScrollY > 20) {
        // Si no estamos en el tope absoluto -> Poner fondo vidrio
        nav.classList.add('nav-scrolled');
    } else {
        // Si estamos en el tope (Inicio) -> Transparente total
        nav.classList.remove('nav-scrolled');
    }

    lastScrollY = currentScrollY;
    // ... (Todo el código anterior se mantiene igual) ...

// --- 7. EMAIL OBFSUCATION (SEGURIDAD ANTI-SCRAPING) ---
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
});

