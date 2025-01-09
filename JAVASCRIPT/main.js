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

// Fonction pour changer le thème
function changeTheme() {
    const link = document.getElementById('theme');
    const button = document.getElementById('theme-btn');
    const currentTheme = link.href.includes('sombre.css') ? 'sombre.css' : 'clair.css';
    const newTheme = currentTheme === 'sombre.css' ? 'clair.css' : 'sombre.css';

    // Déterminer le chemin en fonction de la page actuelle
    const isIndexPage = window.location.pathname.endsWith("index.html");
    link.href = isIndexPage ? `CSS/${newTheme}` : `../CSS/${newTheme}`;

    // Enregistrer le thème dans le localStorage
    localStorage.setItem('selected-theme', newTheme);

    // Log pour déboguer
    /*console.log(`Thème changé : ${newTheme}`);
    console.log(`Chemin appliqué : ${link.href}`);
    console.log(`Thème enregistré dans localStorage : ${localStorage.getItem('selected-theme')}`);*/

    // Ajouter une animation de rotation au bouton
    button.classList.add('tourne');
    setTimeout(() => {
        button.classList.remove('tourne');
    }, 2000);
}

// Appliquer le thème sélectionné au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('theme');
    const savedTheme = localStorage.getItem('selected-theme');
    const isIndexPage = window.location.pathname.endsWith("index.html");

    if (savedTheme) {
        link.href = isIndexPage ? `CSS/${savedTheme}` : `../CSS/${savedTheme}`;
        /*console.log(`Thème appliqué au chargement : ${savedTheme}`);*/
    } else {
        /*console.log('Aucun thème enregistré dans localStorage.');*/
    }
});

function togglePanel(panelIdToToggle) {
    const panelToToggle = document.getElementById(panelIdToToggle);
    const nav = document.querySelector("nav");

    panelToToggle.style.width = panelToToggle.style.width === "100%" ? "0%" : "100%";

    if (panelIdToToggle === "mainMenuPanel") {
        if (panelToToggle.style.width === "100%") {
            nav.classList.remove("sticky");
        } else {
            nav.classList.add("sticky");
        }
    }
}
