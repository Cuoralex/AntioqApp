
// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Featured carousel
let currentFeatured = 0;
const featuredItems = 3;

function nextFeatured() {
    currentFeatured = (currentFeatured + 1) % featuredItems;
    updateFeaturedCarousel();
}

function prevFeatured() {
    currentFeatured = (currentFeatured - 1 + featuredItems) % featuredItems;
    updateFeaturedCarousel();
}

function updateFeaturedCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    const translateX = -currentFeatured * (100 / featuredItems);
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Calendar navigation
function nextMonth() {
    // Simulate month navigation
    console.log('Next month');
}

function prevMonth() {
    // Simulate month navigation
    console.log('Previous month');
}

// Event interactions
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.classList.add('text-accent');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.classList.remove('text-accent');
    }
}

function openEventDetail(eventId) {
    document.getElementById('eventDetailModal').classList.remove('hidden');
}

function closeEventDetail() {
    document.getElementById('eventDetailModal').classList.add('hidden');
}

function bookEvent(eventId) {
    alert(`Redirigiendo a la reserva del evento: ${eventId}`);
    window.location.href = 'booking_management.html';
}

function saveEvent(eventId) {
    alert(`Evento ${eventId} guardado en tu lista de favoritos`);
}

function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: 'Festival de las Flores - AntioqAPP',
            text: 'Descubre este increíble evento en Antioquia',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
    }
}

function loadMoreEvents() {
    // Simulate loading more events
    alert('Cargando más eventos...');
}

function resetFilters() {
    // Reset all filter inputs
    document.getElementById('eventTypeFilter').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('familyFriendly').checked = false;
    document.getElementById('accessible').checked = false;
    document.getElementById('outdoor').checked = false;
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('bg-black')) {
        e.target.classList.add('hidden');
    }
});

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filters = ['eventTypeFilter', 'locationFilter', 'dateFilter', 'priceFilter'];
    
    filters.forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            // Simulate filtering
            console.log(`Filter ${filterId} changed to: ${this.value}`);
        });
    });

    // Checkbox filters
    ['familyFriendly', 'accessible', 'outdoor'].forEach(checkboxId => {
        document.getElementById(checkboxId).addEventListener('change', function() {
            console.log(`${checkboxId} filter: ${this.checked}`);
        });
    });
});

// Auto-advance featured carousel
setInterval(nextFeatured, 5000);
