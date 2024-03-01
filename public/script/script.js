// Slider
const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);


// Je bekijkt de breedte van de card-item nadat je dat berekent scroll je naar links/rechts elke keer met die breedte.
function slideLeft() {
    const itemWidth = slider.querySelector('.card-item').offsetWidth;
    const scrollAmount = slider.scrollLeft - itemWidth;
    slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function slideRight() {
    const itemWidth = slider.querySelector('.card-item').offsetWidth;
    const scrollAmount = slider.scrollLeft + itemWidth;
    slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}