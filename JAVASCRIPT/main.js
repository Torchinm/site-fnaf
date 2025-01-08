let currentAudio = null;

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const parallaxEffect = scrollPosition * 0.3;
    document.querySelector('.marge-en-tete').style.backgroundPosition = `${parallaxEffect}px center`;
});

const carouselWrapper = document.querySelector('.carousel-wrapper');
const images = document.querySelectorAll('.el');
let currentIndex = 0;

function moveCarouselLeft(carouselId) {
    const carouselWrapper = document.querySelector(`#${carouselId} .carousel-wrapper`);
    const images = carouselWrapper.querySelectorAll('.el');
    let currentIndex = Math.round(carouselWrapper.scrollLeft / images[0].clientWidth);

    currentIndex = (currentIndex - 1 + images.length) % images.length;
    
    scrollToImage(currentIndex, carouselWrapper, images);
}

function moveCarouselRight(carouselId) {
    const carouselWrapper = document.querySelector(`#${carouselId} .carousel-wrapper`);
    const images = carouselWrapper.querySelectorAll('.el');
    let currentIndex = Math.round(carouselWrapper.scrollLeft / images[0].clientWidth);

    currentIndex = (currentIndex + 1) % images.length;
    
    scrollToImage(currentIndex, carouselWrapper, images);
}

function scrollToImage(index, carouselWrapper, images) {
    const targetScroll = images[index].offsetLeft;
    carouselWrapper.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
    });
}

scrollToImage(currentIndex);


function toggleMusic(path) {
    const element = document.querySelector("#music img");

    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        element.classList.remove("tourne");
    } else {
        if (currentAudio) {
            currentAudio.pause();
        }

        currentAudio = new Audio(path);
        currentAudio.play();
        element.classList.add("tourne");
    }
}

function changeTheme() {
    const link = document.getElementById('theme');
    const button = document.getElementById('theme-btn');
    const currentTheme = link.href.includes('sombre.css') ? 'sombre.css' : 'clair.css';
    const newTheme = currentTheme === 'sombre.css' ? 'clair.css' : 'sombre.css';

    // Vérifier si on est sur index.html ou une autre page
    if (window.location.pathname.endsWith("index.html")) {
        // Comportement pour index.html
        link.href = `CSS/${newTheme}`;
        localStorage.setItem('selected-theme', newTheme);
    } else {
        // Comportement pour les autres pages dans HTML/
        link.href = `../CSS/${newTheme}`;
        localStorage.setItem('selected-theme', newTheme);
        console.log(newTheme)
    }

    // Ajouter une animation de rotation au bouton
    button.classList.add('tourne');
    setTimeout(() => {
        button.classList.remove('tourne');
    }, 2000);
}

/*
window.onload = function () {
    const savedTheme = localStorage.getItem('selected-theme') || 'clair.css';
    const link = document.getElementById('theme');
    console.log(savedTheme)

    // Récupérer le nom de la page actuelle
    const currentPath = window.location.pathname;

    // Appliquer le chemin correct pour les thèmes
    if (currentPath.endsWith("index.html") || currentPath === "/") {
        // Si on est sur index.html ou la racine du site
        link.href = `CSS/${savedTheme}`;
    } else {
        // Si on est sur une autre page dans HTML/
        link.href = `../CSS/${savedTheme}`;
    }
};
*/