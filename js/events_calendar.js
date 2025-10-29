// =================== MENÚ MÓVIL ===================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// =================== CARRUSEL DESTACADOS ===================
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
    if (carousel) carousel.style.transform = `translateX(${translateX}%)`;
}

// =================== CALENDARIO ===================
function nextMonth() { console.log('Next month'); }
function prevMonth() { console.log('Previous month'); }

// =================== INTERACCIÓN DE EVENTOS ===================
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas', 'text-accent');
    } else {
        icon.classList.remove('fas', 'text-accent');
        icon.classList.add('far');
    }
}

function openEventDetail(eventId) {
    const modal = document.getElementById('eventDetailModal');
    if (modal) modal.classList.remove('hidden');
}

function closeEventDetail() {
    const modal = document.getElementById('eventDetailModal');
    if (modal) modal.classList.add('hidden');
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
        navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
    }
}

function loadMoreEvents() {
    alert('Cargando más eventos...');
}

// =================== FILTROS ===================
function resetFilters() {
    document.getElementById('eventTypeFilter').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('familyFriendly').checked = false;
    document.getElementById('accessible').checked = false;
    document.getElementById('outdoor').checked = false;

    aplicarFiltros();
}

// =================== FUNCIONALIDAD FILTRADO REAL ===================
function aplicarFiltros() {
    const tipo = document.getElementById('eventTypeFilter').value;
    const municipio = document.getElementById('locationFilter').value;
    const fechaFiltro = document.getElementById('dateFilter').value;
    const precio = document.getElementById('priceFilter').value;
    const familiar = document.getElementById('familyFriendly').checked;
    const accesible = document.getElementById('accessible').checked;
    const aireLibre = document.getElementById('outdoor').checked;

    const eventos = document.querySelectorAll('#eventsList > div');
    const hoy = new Date();

    eventos.forEach(evento => {
        const eventDateStr = evento.dataset.date;
        const eventDate = eventDateStr ? new Date(eventDateStr) : null;

        const matchTipo = !tipo || evento.dataset.type === tipo;
        const matchMunicipio = !municipio || evento.dataset.location === municipio;
        const matchPrecio = !precio || evento.dataset.price === precio;
        const matchFamiliar = !familiar || evento.dataset.family === "true";
        const matchAccesible = !accesible || evento.dataset.accessible === "true";
        const matchAireLibre = !aireLibre || evento.dataset.outdoor === "true";

        let matchFecha = true; // por defecto, pasa

        if (eventDate) {
            const diffDays = (eventDate - hoy) / (1000 * 60 * 60 * 24);
            switch (fechaFiltro) {
                case "today":
                    matchFecha = diffDays >= 0 && diffDays < 1;
                    break;
                case "week":
                    matchFecha = diffDays >= 0 && diffDays <= 7;
                    break;
                case "month":
                    matchFecha = diffDays >= 0 && diffDays <= 30;
                    break;
                case "quarter":
                    matchFecha = diffDays >= 0 && diffDays <= 90;
                    break;
                default:
                    matchFecha = true;
            }
        }

        const visible = matchTipo && matchMunicipio && matchPrecio &&
                        matchFamiliar && matchAccesible && matchAireLibre && matchFecha;

        evento.style.display = visible ? '' : 'none';
    });
}


// =================== ESCUCHAS DE EVENTOS ===================
document.addEventListener('DOMContentLoaded', () => {
    // Filtros select
    ['eventTypeFilter', 'locationFilter', 'dateFilter', 'priceFilter'].forEach(id => {
        document.getElementById(id).addEventListener('change', aplicarFiltros);
    });

    // Checkboxes
    ['familyFriendly', 'accessible', 'outdoor'].forEach(id => {
        document.getElementById(id).addEventListener('change', aplicarFiltros);
    });

    aplicarFiltros();
});

// =================== MODAL ===================
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('bg-black')) {
        e.target.classList.add('hidden');
    }
});

// =================== AUTO-CARRUSEL ===================
setInterval(nextFeatured, 5000);
