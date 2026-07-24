const links = document.querySelectorAll('.nav-link');
const sliderItems = document.querySelectorAll('.slider-item');
const revealElements = document.querySelectorAll('.reveal');
const sections = Array.from(document.querySelectorAll('section'));
const heroTitle = document.querySelector('.hero-title');
const heroImage = document.querySelector('.hero-logo');

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

if (heroImage) {
    heroImage.addEventListener('click', () => {
        window.open('https://github.com/vedantmb07', '_blank');
    });
}

const typeHeroTitle = () => {
    if (!heroTitle) return;

    const text = heroTitle.dataset.text || heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    const typeNext = () => {
        if (index <= text.length) {
            heroTitle.textContent = text.slice(0, index);
            index += 1;
            setTimeout(typeNext, 80);
        }
    };

    typeNext();
};

typeHeroTitle();

const sectionTitles = document.querySelectorAll('.section-header h2');

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

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const title = entry.target.querySelector('h2');
        if (!title) return;

        if (entry.isIntersecting) {
            title.classList.add('active-title');
            const text = title.dataset.text || title.textContent;
            title.textContent = '';
            let index = 0;
            const typeHeading = () => {
                if (index <= text.length) {
                    title.textContent = text.slice(0, index);
                    index += 1;
                    setTimeout(typeHeading, 50);
                }
            };
            typeHeading();
            titleObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.4,
});

sections.forEach(section => titleObserver.observe(section));

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