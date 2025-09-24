document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const carouselContainer = document.getElementById('carouselContainer');
    const gallerySection = document.getElementById('gallery-section');

    toggleButton.addEventListener('click', function() {
        // Toggle the 'expanded' class on the container
        carouselContainer.classList.toggle('expanded');

        // Change the button text based on the state
        if (carouselContainer.classList.contains('expanded')) {
            toggleButton.textContent = 'Show Less';
            // Scroll to the gallery section to show the newly expanded content
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        } else {
            toggleButton.textContent = 'Show More';
            // Scroll back up to the gallery section
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});