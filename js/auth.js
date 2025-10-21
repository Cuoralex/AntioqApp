// ======================== auth.js ========================
// 🔐 Verifica si el usuario ha iniciado sesión
function verificarSesion() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
        console.warn('⚠️ No hay sesión activa. Redirigiendo al login...');
        window.location.href = 'user_login.html';
        return;
    }

    console.log(`✅ Sesión activa: ${user.name} (${user.email})`);

    // Mostrar nombre en el header si hay <span id="userName">
    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = user.name;

    // Activar botón de cerrar sesión si existe
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.classList.remove('hidden');
        logoutBtn.addEventListener('click', cerrarSesion);
    }
}

// 🔓 Cierra sesión y limpia localStorage
function cerrarSesion() {
    localStorage.removeItem('currentUser');
    console.log('👋 Sesión cerrada correctamente.');
    window.location.href = 'user_login.html';
}

// 🧭 Autoprotección automática de páginas marcadas
document.addEventListener('DOMContentLoaded', () => {
    const protegido = document.body.getAttribute('data-protegido');
    if (protegido === 'true') verificarSesion();
});
