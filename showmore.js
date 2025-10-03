document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const carouselContainer = document.getElementById('carouselContainer');
    const gallerySection = document.getElementById('gallery-section');

    toggleButton.addEventListener('click', function() {

        carouselContainer.classList.toggle('expanded');


        if (carouselContainer.classList.contains('expanded')) {
            toggleButton.textContent = 'Show Less';

            gallerySection.scrollIntoView({ behavior: 'smooth' });
        } else {
            toggleButton.textContent = 'Show More';

            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
