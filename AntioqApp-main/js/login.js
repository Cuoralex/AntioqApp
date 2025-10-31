// login.js — compatible con tu HTML (ids y clases existentes)
// Requisitos: en registration guardas usuarios en localStorage 'users' con { fullName, email, password, profileType }

(function () {
// Safe-guard: no ejecutar hasta que DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
// Elementos (se busca por ids que ya tienes en tu HTML)
const form = document.getElementById('loginForm');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const rememberEl = document.getElementById('rememberMe');
const loginButton = document.getElementById('loginButton');
const loginButtonText = document.getElementById('loginButtonText');
const loginSpinner = document.getElementById('loginSpinner'); // <i> spinner con id
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginError = document.getElementById('loginError');
const loginSuccess = document.getElementById('loginSuccess');
const passwordToggle = document.getElementById('passwordToggle');

// Helper: safe class toggle
function show(el) { if (!el) return; el.classList.remove('hidden'); }
function hide(el) { if (!el) return; el.classList.add('hidden'); }
function setText(el, txt) { if (!el) return; el.textContent = txt; }

// Toggle password visibility (keeps your onclick)
window.togglePassword = function () {
  const f = passwordEl;
  const t = passwordToggle;
  if (!f) return;
  if (f.type === 'password') {
    f.type = 'text';
    if (t) t.className = 'fas fa-eye-slash text-gray-400';
  } else {
    f.type = 'password';
    if (t) t.className = 'fas fa-eye text-gray-400';
  }
};

// Mostrar estado "iniciando sesión"
function showLoadingState() {
  if (loginButton) loginButton.disabled = true;
  if (loginButton) loginButton.classList.add('opacity-75');
  if (loginButtonText) loginButtonText.textContent = 'Iniciando sesión...';
  if (loginSpinner) loginSpinner.classList.remove('hidden');
}

function hideLoadingState() {
  if (loginButton) loginButton.disabled = false;
  if (loginButton) loginButton.classList.remove('opacity-75');
  if (loginButtonText) loginButtonText.textContent = 'Iniciar Sesión';
  if (loginSpinner) loginSpinner.classList.add('hidden');
}

// Mensajes
function showFieldError(fieldEl, msg) {
  if (!fieldEl) return;
  setText(fieldEl, msg);
  show(fieldEl);
}

function clearFieldErrors() {
  hide(emailError);
  hide(passwordError);
  hide(loginError);
  hide(loginSuccess);
}

// Cargar email recordado al cargar la página
const remembered = localStorage.getItem('rememberedEmail');
if (remembered && emailEl) {
  emailEl.value = remembered;
  if (rememberEl) rememberEl.checked = true;
}

// Submit del formulario de login
if (form) {
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearFieldErrors();

    const email = (emailEl && emailEl.value || '').trim();
    const password = (passwordEl && passwordEl.value) || '';
    const remember = rememberEl && rememberEl.checked;

    // Validaciones simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFieldError(emailError, 'Por favor ingresa un email válido');
      return;
    }
    if (!password) {
      showFieldError(passwordError, 'La contraseña es requerida');
      return;
    }

    showLoadingState();

    // Simulamos un pequeño delay para que se vea el spinner (igual que en tu UI)
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Buscar usuario registrado (registration guarda fullName, email, password, profileType)
        const user = users.find(u => (u.email && u.email.toLowerCase()) === email.toLowerCase() && u.password === password);

        if (!user) {
          // Credenciales inválidas
          hideLoadingState();
          show(loginError);
          // Si hay un elemento con texto de error específico, lo dejamos (tu HTML ya tiene #loginErrorText)
          return;
        }

        // Login exitoso
        show(loginSuccess);
        // Guardar sesión (currentUser)
        const currentUser = {
          email: user.email,
          name: user.fullName || user.nombre || user.name || user.email,
          type: user.profileType || user.type || 'tourist'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Recordarme
        if (remember) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Redirección según tipo (respeta nombres de archivos que has usado)
        setTimeout(() => {
          // Por seguridad, ocultamos spinner y desbloqueamos (aunque redirigimos)
          hideLoadingState();

          // Decide ruta
          const type = (currentUser.type || '').toLowerCase();
          switch (type) {
            case 'entrepreneur':
            case 'emprendedor':
              window.location.href = 'bussines_directory.html'; // mantenemos el nombre que mencionaste
              break;
            case 'local':
              window.location.href = 'tourism_routes.html';
              break;
            case 'tourist':
            case 'turist':
            default:
              window.location.href = 'tourism_routes.html';
              break;
          }
        }, 800);

      } catch (err) {
        console.error('login.js error:', err);
        hideLoadingState();
        showFieldError(loginError, 'Error interno. Intenta de nuevo.');
      }
    }, 700); // delay
  });
}

// Clear messages on input
if (emailEl) emailEl.addEventListener('input', () => { hide(emailError); hide(loginError); });
if (passwordEl) passwordEl.addEventListener('input', () => { hide(passwordError); hide(loginError); });

// Forgot password modal handling (if exists in your HTML)
window.openForgotPasswordModal = function () {
  const modal = document.getElementById('forgotPasswordModal');
  if (modal) modal.classList.remove('hidden');
};
window.closeForgotPasswordModal = function () {
  const modal = document.getElementById('forgotPasswordModal');
  if (modal) modal.classList.add('hidden');
  // reset form inside modal if exists
  const f = document.getElementById('forgotPasswordForm');
  if (f) f.reset();
  const resetSuccess = document.getElementById('resetSuccess');
  if (resetSuccess) resetSuccess.classList.add('hidden');
  const resetEmailError = document.getElementById('resetEmailError');
  if (resetEmailError) resetEmailError.classList.add('hidden');
};

// Cerrar modal al click fuera (si tu modal usa overlay con id)
document.addEventListener('click', function (e) {
  const modal = document.getElementById('forgotPasswordModal');
  if (!modal) return;
  if (e.target === modal) closeForgotPasswordModal();
});
});
})();
