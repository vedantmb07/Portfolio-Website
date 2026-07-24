const links = document.querySelectorAll('.nav-link');
const sliderItems = document.querySelectorAll('.slider-item');
const revealElements = document.querySelectorAll('.reveal');
const sections = Array.from(document.querySelectorAll('section'));

const setActiveSlider = (targetId) => {
    sliderItems.forEach(item => item.classList.toggle('active', item.dataset.target === targetId));
};

const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        setActiveSlider(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        scrollToSection(targetId);
    });
});

sliderItems.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        scrollToSection(targetId);
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.23,
});

revealElements.forEach(el => revealObserver.observe(el));

const sliderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const button = document.querySelector(`.slider-item[data-target="${id}"]`);
        if (button) {
            if (entry.isIntersecting) {
                setActiveSlider(id);
            }
        }
    });
}, {
    root: null,
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0.25,
});

sections.forEach(section => sliderObserver.observe(section));