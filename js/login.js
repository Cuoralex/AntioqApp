// login.js — versión estable y compatible con tu HTML
// Usa localStorage 'users' con { fullName, email, password, profileType }

// -----------------------------------------------------------------------------
// Al cargar la página: rellenar email/contraseña recordados
document.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  const rememberedPassword = localStorage.getItem("rememberedPassword");
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMeCheckbox.checked = true;
  }

  if (rememberedPassword) {
    passwordInput.value = atob(rememberedPassword); // decodificar Base64
  }
});

// -----------------------------------------------------------------------------
// Lógica principal
(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // Referencias a elementos del DOM
    const form = document.getElementById('loginForm');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const rememberEl = document.getElementById('rememberMe');
    const loginButton = document.getElementById('loginButton');
    const loginButtonText = document.getElementById('loginButtonText');
    const loginSpinner = document.getElementById('loginSpinner');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginError = document.getElementById('loginError');
    const loginSuccess = document.getElementById('loginSuccess');
    const passwordToggle = document.getElementById('passwordToggle');

    // Utilidades
    function show(el) { if (el) el.classList.remove('hidden'); }
    function hide(el) { if (el) el.classList.add('hidden'); }
    function setText(el, txt) { if (el) el.textContent = txt; }

    // Mostrar/ocultar contraseña
    window.togglePassword = function () {
      if (!passwordEl) return;
      if (passwordEl.type === 'password') {
        passwordEl.type = 'text';
        passwordToggle.className = 'fas fa-eye-slash text-gray-400';
      } else {
        passwordEl.type = 'password';
        passwordToggle.className = 'fas fa-eye text-gray-400';
      }
    };

    // Estados del botón de carga
    function showLoadingState() {
      if (loginButton) {
        loginButton.disabled = true;
        loginButton.classList.add('opacity-75');
      }
      if (loginButtonText) loginButtonText.textContent = 'Iniciando sesión...';
      if (loginSpinner) loginSpinner.classList.remove('hidden');
    }

    function hideLoadingState() {
      if (loginButton) {
        loginButton.disabled = false;
        loginButton.classList.remove('opacity-75');
      }
      if (loginButtonText) loginButtonText.textContent = 'Iniciar Sesión';
      if (loginSpinner) loginSpinner.classList.add('hidden');
    }

    function showFieldError(fieldEl, msg) {
      setText(fieldEl, msg);
      show(fieldEl);
    }

    function clearFieldErrors() {
      hide(emailError);
      hide(passwordError);
      hide(loginError);
      hide(loginSuccess);
    }

    // -------------------------------------------------------------------------
    // Envío del formulario de login
    if (form) {
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        clearFieldErrors();

        const email = (emailEl?.value || '').trim();
        const password = passwordEl?.value || '';
        const remember = rememberEl?.checked || false;

        // Validaciones básicas
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

        setTimeout(() => {
          try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Buscar coincidencia exacta de email y contraseña
            const user = users.find(u =>
              u.email?.toLowerCase() === email.toLowerCase() &&
              u.password === password
            );

            if (!user) {
              hideLoadingState();
              show(loginError);
              return;
            }

            // Login exitoso
            show(loginSuccess);

            const currentUser = {
              email: user.email,
              name: user.fullName || user.nombre || user.name || user.email,
              type: user.profileType || user.type || 'tourist'
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Guardar o limpiar "recordarme"
            if (remember) {
              localStorage.setItem('rememberedEmail', email);
              localStorage.setItem('rememberedPassword', btoa(password)); // base64
            } else {
              localStorage.removeItem('rememberedEmail');
              localStorage.removeItem('rememberedPassword');
            }

            // Redirección según tipo de usuario
            setTimeout(() => {
              hideLoadingState();
              const type = (currentUser.type || '').toLowerCase();

              switch (type) {
                case 'entrepreneur':
                case 'emprendedor':
                  window.location.href = 'business_directory.html';
                  break;
                case 'local':
                  window.location.href = 'tourism_routes.html';
                  break;
                case 'tourist':
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
        }, 600);
      });
    }

    // -------------------------------------------------------------------------
    // Listeners para limpiar mensajes en escritura
    if (emailEl) emailEl.addEventListener('input', () => { hide(emailError); hide(loginError); });
    if (passwordEl) passwordEl.addEventListener('input', () => { hide(passwordError); hide(loginError); });

    // -------------------------------------------------------------------------
    // Modal de recuperar contraseña (ya definido en tu HTML)
    window.openForgotPasswordModal = function () {
      const modal = document.getElementById('forgotPasswordModal');
      if (modal) modal.classList.remove('hidden');
    };

    window.closeForgotPasswordModal = function () {
      const modal = document.getElementById('forgotPasswordModal');
      if (modal) modal.classList.add('hidden');
      const form = document.getElementById('forgotPasswordForm');
      if (form) form.reset();
      hide(document.getElementById('resetSuccess'));
      hide(document.getElementById('resetEmailError'));
    };

    document.addEventListener('click', (e) => {
      const modal = document.getElementById('forgotPasswordModal');
      if (modal && e.target === modal) closeForgotPasswordModal();
    });

  });
})();
