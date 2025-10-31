
// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Filter toggle functionality
function toggleFilter(filterId) {
    const filter = document.getElementById(filterId);
    const allFilters = ['typeFilter', 'locationFilter', 'priceFilter', 'ratingFilter'];
    
    // Hide all other filters
    allFilters.forEach(id => {
        if (id !== filterId) {
            document.getElementById(id).classList.add('hidden');
        }
    });
    
    // Toggle current filter
    filter.classList.toggle('hidden');
}

// Reset filters
function resetFilters() {
    // Hide all filter dropdowns
    const allFilters = ['typeFilter', 'locationFilter', 'priceFilter', 'ratingFilter'];
    allFilters.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    
    // Reset all form inputs
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    
    // Reset search input
    document.getElementById('searchInput').value = '';
    
    // Update results count
    document.getElementById('resultsCount').textContent = 'Mostrando 156 negocios';
}

// View toggle functionality
function toggleView(viewType) {
    const gridView = document.getElementById('gridView');
    const mapView = document.getElementById('mapView');
    const gridBtn = document.getElementById('gridViewBtn');
    const mapBtn = document.getElementById('mapViewBtn');
    
    if (viewType === 'grid') {
        gridView.classList.remove('hidden');
        mapView.classList.add('hidden');
        gridBtn.className = 'px-3 py-1 rounded-md bg-primary text-white transition-colors';
        mapBtn.className = 'px-3 py-1 rounded-md text-text-secondary hover:bg-white transition-colors';
    } else {
        gridView.classList.add('hidden');
        mapView.classList.remove('hidden');
        mapBtn.className = 'px-3 py-1 rounded-md bg-primary text-white transition-colors';
        gridBtn.className = 'px-3 py-1 rounded-md text-text-secondary hover:bg-white transition-colors';
    }
}

// Carousel scroll functionality
function scrollCarousel(direction) {
    const carousel = document.getElementById('featuredCarousel');
    const scrollAmount = 320; // Width of card + gap
    
    if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Business detail modal
function openBusinessDetail(businessId) {
    const modal = document.getElementById('businessModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    // Mock business data
    const businessData = {
        'hacienda': {
            title: 'Restaurante La Hacienda',
            content: `
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Restaurante La Hacienda" class="w-full h-64 object-cover rounded-lg mb-4">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="flex items-center">
                                <i class="fas fa-star text-warning mr-1"></i>
                                <span class="font-medium">4.8</span>
                                <span class="text-text-secondary ml-1">(127 reseñas)</span>
                            </div>
                            <span class="bg-primary-100 text-primary px-2 py-1 rounded-full text-sm">$$</span>
                        </div>
                        <p class="text-text-secondary mb-4">Auténtica cocina tradicional antioqueña en el corazón de Guatapé. Especialistas en bandeja paisa, sancocho y postres caseros.</p>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-primary mr-2"></i>
                                <span>Calle Principal #123, Guatapé</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-phone text-primary mr-2"></i>
                                <span>+57 4 861-8234</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-clock text-primary mr-2"></i>
                                <span>Lun-Dom: 8:00 AM - 10:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary mb-3">Especialidades</h4>
                        <ul class="space-y-2 text-sm text-text-secondary mb-6">
                            <li>• Bandeja Paisa Tradicional</li>
                            <li>• Sancocho Antioqueño</li>
                            <li>• Arepas de Chócolo</li>
                            <li>• Postres Caseros</li>
                        </ul>
                        <div class="flex gap-3">
                            <button class="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                                <i class="fas fa-calendar-plus mr-2"></i>
                                Reservar Mesa
                            </button>
                            <button class="flex-1 bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-600 transition-colors">
                                <i class="fas fa-comments mr-2"></i>
                                Chat
                            </button>
                        </div>
                    </div>
                </div>
            `
        },
        'cafe-pueblo': {
            title: 'Café del Pueblo',
            content: `
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <img src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Café del Pueblo" class="w-full h-64 object-cover rounded-lg mb-4">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="flex items-center">
                                <i class="fas fa-star text-warning mr-1"></i>
                                <span class="font-medium">4.5</span>
                                <span class="text-text-secondary ml-1">(89 reseñas)</span>
                            </div>
                            <span class="bg-primary-100 text-primary px-2 py-1 rounded-full text-sm">$$</span>
                        </div>
                        <p class="text-text-secondary mb-4">Café especializado con granos 100% colombianos. Ambiente acogedor en el corazón de El Poblado.</p>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-primary mr-2"></i>
                                <span>Carrera 35 #8A-45, El Poblado</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-phone text-primary mr-2"></i>
                                <span>+57 4 311-2847</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-clock text-primary mr-2"></i>
                                <span>Lun-Vie: 7:00 AM - 8:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary mb-3">Especialidades</h4>
                        <ul class="space-y-2 text-sm text-text-secondary mb-6">
                            <li>• Café de Origen</li>
                            <li>• Métodos de Preparación</li>
                            <li>• Repostería Artesanal</li>
                            <li>• Desayunos Saludables</li>
                        </ul>
                        <div class="flex gap-3">
                            <button class="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                                <i class="fas fa-shopping-cart mr-2"></i>
                                Ordenar
                            </button>
                            <button class="flex-1 bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-600 transition-colors">
                                <i class="fas fa-comments mr-2"></i>
                                Chat
                            </button>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    const business = businessData[businessId] || businessData['hacienda'];
    title.textContent = business.title;
    content.innerHTML = business.content;
    modal.classList.remove('hidden');
}

function closeBusinessModal() {
    document.getElementById('businessModal').classList.add('hidden');
}

// Map popup functionality
function showMapPopup(markerId) {
    const popup = document.getElementById('mapPopup');
    const popupData = {
        'marker1': {
            image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Restaurante La Hacienda',
            description: 'Cocina tradicional antioqueña',
            rating: '4.8'
        },
        'marker2': {
            image: 'https://images.pixabay.com/photo/2016/11/18/14/39/hotel-1834923_960_720.jpg',
            title: 'Hotel Boutique Colonial',
            description: 'Hotel boutique de lujo',
            rating: '4.9'
        },
        'marker3': {
            image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2940&auto=format&fit=crop',
            title: 'Artesanías Doña María',
            description: 'Artesanías tradicionales',
            rating: '4.7'
        }
    };
    
    const data = popupData[markerId];
    if (data) {
        document.getElementById('popupImage').src = data.image;
        document.getElementById('popupTitle').textContent = data.title;
        document.getElementById('popupDescription').textContent = data.description;
        document.getElementById('popupRating').textContent = data.rating;
        popup.classList.remove('hidden');
    }
}

function closeMapPopup() {
    document.getElementById('mapPopup').classList.add('hidden');
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('bg-black')) {
        e.target.classList.add('hidden');
    }
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Mock search functionality - in real app would filter results
    if (searchTerm.length > 2) {
        document.getElementById('resultsCount').textContent = `Mostrando ${Math.floor(Math.random() * 50) + 10} negocios para "${searchTerm}"`;
    } else {
        document.getElementById('resultsCount').textContent = 'Mostrando 156 negocios';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Close any open filters when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter-container')) {
            const allFilters = ['typeFilter', 'locationFilter', 'priceFilter', 'ratingFilter'];
            allFilters.forEach(id => {
                document.getElementById(id).classList.add('hidden');
            });
        }
    });
});