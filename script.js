// CONTACT LINKS

const contactLinks = document.querySelectorAll('.contact-link');
const sectionContact = document.querySelector('section.contact');
const projectImages = document.querySelectorAll('.project img');

contactLinks.forEach(link => {
    link.addEventListener('click', function(ev) {
        ev.preventDefault();

        sectionContact.scrollIntoView({ behavior: 'smooth' });
    })
});

// LAZY LOADING IMAGES

const loadImg = function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.src = entry.target.dataset.srclarge;
 
        entry.target.addEventListener('load', function () {
            entry.target.classList.remove('blurImage');
        });

        observer.unobserve(entry.target);
    })
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-40px',
});

projectImages.forEach(image => imgObserver.observe(image));

// CONTACT FORM

const contactForm = document.querySelector('.contact__form');
const submitBtn = contactForm.querySelector('input[type="submit"]');
const inputs = contactForm.querySelectorAll('[name]');

submitBtn.addEventListener('click', function(ev) {
    contactForm.querySelectorAll('[name]:invalid').forEach(input => {
        input.classList.add('invalid');
    });
});

inputs.forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('invalid');
    });
});

// Projects

const projectsList = document.querySelector('.projects__list');

const loadProjects = async () => {
    try {
        const response = await fetch('data.json');
        const projects = await response.json();
        projects.forEach(project => {
            const html = `
            <div class="project">
                <img class="blurImage" src="${project.src}-pixel.${project.imgFormat}" 
                    data-srclarge="${project.src}-large.${project.imgFormat}"
                    alt="${project.name}">
                <h3 class="heading-medium">${project.name}</h3>
                <ul>${project.tools.map(tool => `<li>${tool}</li>`).join('')}</ul>
                <div class="project__links">
                    <a class="link" href="${project.url}">VIEW PROJECT</a>
                    <a class="link" href="${project.gitHub}">VIEW CODE</a>
                </div>
            </div>`;

            projectsList.insertAdjacentHTML('beforeend', html);
        })
    } catch(e) {
        console.log(e)
    }
}
loadProjects();