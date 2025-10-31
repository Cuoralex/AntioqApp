
// View switching functionality
function switchView(viewType) {
    const customerView = document.getElementById('customerView');
    const entrepreneurView = document.getElementById('entrepreneurView');
    const customerBtn = document.getElementById('customerViewBtn');
    const entrepreneurBtn = document.getElementById('entrepreneurViewBtn');
    
    if (viewType === 'customer') {
        customerView.classList.remove('hidden');
        entrepreneurView.classList.add('hidden');
        customerBtn.className = 'px-4 py-2 rounded-md text-sm font-medium bg-primary text-white transition-colors';
        entrepreneurBtn.className = 'px-4 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-primary transition-colors';
    } else {
        customerView.classList.add('hidden');
        entrepreneurView.classList.remove('hidden');
        entrepreneurBtn.className = 'px-4 py-2 rounded-md text-sm font-medium bg-primary text-white transition-colors';
        customerBtn.className = 'px-4 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-primary transition-colors';
    }
}

// Layout view toggle
function toggleView(viewType) {
    const cardsView = document.getElementById('bookingCards');
    const calendarView = document.getElementById('calendarView');
    const cardsBtn = document.getElementById('cardsViewBtn');
    const calendarBtn = document.getElementById('calendarViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    // Reset all buttons
    [cardsBtn, calendarBtn, listBtn].forEach(btn => {
        btn.className = 'p-2 rounded-lg text-text-secondary hover:bg-primary-50 hover:text-primary transition-colors';
    });
    
    if (viewType === 'cards') {
        cardsView.classList.remove('hidden');
        calendarView.classList.add('hidden');
        cardsBtn.className = 'p-2 rounded-lg bg-primary text-white';
    } else if (viewType === 'calendar') {
        cardsView.classList.add('hidden');
        calendarView.classList.remove('hidden');
        calendarBtn.className = 'p-2 rounded-lg bg-primary text-white';
    } else if (viewType === 'list') {
        // List view would be implemented here
        cardsView.classList.remove('hidden');
        calendarView.classList.add('hidden');
        listBtn.className = 'p-2 rounded-lg bg-primary text-white';
    }
}

// User menu toggle
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('hidden');
}

// Mobile menu toggle
function toggleMobileMenu() {
    // Mobile menu implementation would go here
    console.log('Mobile menu toggled');
}

// Chat functionality
function openChat(bookingId) {
    document.getElementById('chatModal').classList.remove('hidden');
}

function closeChat() {
    document.getElementById('chatModal').classList.add('hidden');
}

// Booking detail modal
function openBookingDetail(bookingId) {
    document.getElementById('bookingDetailModal').classList.remove('hidden');
}

function closeBookingDetail() {
    document.getElementById('bookingDetailModal').classList.add('hidden');
}

// Booking actions
function modifyBooking(bookingId) {
    alert('Función de modificación de reserva - ID: ' + bookingId);
}

function cancelBooking(bookingId) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
        alert('Reserva cancelada - ID: ' + bookingId);
    }
}

function payBooking(bookingId) {
    alert('Redirigiendo a pasarela de pago - ID: ' + bookingId);
}

function rebookExperience(bookingId) {
    alert('Redirigiendo para nueva reserva - ID: ' + bookingId);
}

function shareExperience(bookingId) {
    if (navigator.share) {
        navigator.share({
            title: 'Mi experiencia en AntioqAPP',
            text: '¡Tuve una experiencia increíble!',
            url: window.location.href
        });
    } else {
        alert('Función de compartir - ID: ' + bookingId);
    }
}

// Entrepreneur functions
function contactCustomer(customerId) {
    alert('Contactando cliente - ID: ' + customerId);
}

function sendPaymentReminder(customerId) {
    alert('Recordatorio de pago enviado - ID: ' + customerId);
}

function viewDetails(customerId) {
    alert('Ver detalles del cliente - ID: ' + customerId);
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('bg-black')) {
        e.target.classList.add('hidden');
    }
});

// Close user menu when clicking outside
document.addEventListener('click', function(e) {
    const userMenu = document.getElementById('userMenu');
    const userButton = e.target.closest('button');
    
    if (!userButton || !userButton.onclick || userButton.onclick.toString().indexOf('toggleUserMenu') === -1) {
        userMenu.classList.add('hidden');
    }
});

// Initialize default view
document.addEventListener('DOMContentLoaded', function() {
    switchView('customer');
    toggleView('cards');
});
