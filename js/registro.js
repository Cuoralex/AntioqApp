document.addEventListener("DOMContentLoaded", () => {
  console.log("🧾 Registro cargado correctamente");

  // ======== Función para mostrar u ocultar contraseña ========
  window.togglePassword = function(fieldId) {
    const field = document.getElementById(fieldId);
    const toggle = document.getElementById(fieldId + "Toggle");
    if (!field || !toggle) return;

    const isPassword = field.type === "password";
    field.type = isPassword ? "text" : "password";
    toggle.className = isPassword
      ? "fas fa-eye-slash text-gray-400"
      : "fas fa-eye text-gray-400";
  };

  // ======== Indicador de fuerza de contraseña ========
  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("input", e => {
    const val = e.target.value;
    const strength = calculateStrength(val);
    updateStrengthUI(strength);
  });

  function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4);
  }

  function updateStrengthUI(strength) {
    const bars = ["strength1", "strength2", "strength3", "strength4"];
    const colors = ["bg-error", "bg-warning", "bg-warning", "bg-success"];
    const texts = ["Muy débil", "Débil", "Regular", "Fuerte"];
    bars.forEach((id, idx) => {
      const el = document.getElementById(id);
      el.className =
        "h-1 flex-1 rounded " +
        (idx < strength ? colors[strength - 1] : "bg-gray-200");
    });
    document.getElementById("strengthText").textContent =
      strength > 0 ? texts[strength - 1] : "Mínimo 8 caracteres";
  }

  // ======== Validación en tiempo real de confirmación ========
  document
    .getElementById("confirmPassword")
    .addEventListener("input", e => {
      const pass = passwordInput.value;
      const confirm = e.target.value;
      if (confirm && pass === confirm) {
        showSuccess("confirmPasswordSuccess");
        hide("confirmPasswordError");
      } else if (confirm) {
        showError("confirmPasswordError", "Las contraseñas no coinciden");
        hide("confirmPasswordSuccess");
      } else {
        hide("confirmPasswordSuccess");
        hide("confirmPasswordError");
      }
    });

  // ======== Envío del formulario ========
  document
    .getElementById("registrationForm")
    .addEventListener("submit", e => {
      e.preventDefault();
      const form = e.target;
      const fullName = form.fullName.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const confirm = form.confirmPassword.value;
      const profileType = form.profileType.value;
      const terms = form.terms.checked;
      const privacy = form.privacy.checked;

      // Validaciones visuales
      let valid = true;

      if (fullName.length < 3) {
        showError("fullNameError", "Por favor ingresa tu nombre completo");
        valid = false;
      } else hide("fullNameError");

      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(email)) {
        showError("emailError", "Por favor ingresa un email válido");
        valid = false;
      } else showSuccess("emailSuccess");

      if (password.length < 8 || password !== confirm) {
        showError(
          "confirmPasswordError",
          "La contraseña debe tener al menos 8 caracteres y coincidir"
        );
        valid = false;
      } else hide("confirmPasswordError");

      if (!profileType) {
        alert("Por favor selecciona un tipo de perfil");
        valid = false;
      }

      if (!terms || !privacy) {
        alert("Debes aceptar los Términos y la Política de Privacidad");
        valid = false;
      }

      if (!valid) return;

      // ======== Guardar usuario en localStorage ========
      const user = { fullName, email, password, profileType };
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Evitar duplicados
      if (users.some(u => u.email === email)) {
        alert("⚠️ Ya existe una cuenta con este correo.");
        return;
      }

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email, name: fullName, type: profileType })
      );

      alert("✅ Registro exitoso. Bienvenido a AntioqAPP");
      window.location.href = "user_login.html";
    });

  // ======== Helpers ========
  function showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
  }

  function showSuccess(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
  }

  function hide(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("hidden");
  }

  // ======== Modal simple (ya definido en tu código) ========
  window.openModal = id => document.getElementById(id)?.classList.remove("hidden");
  window.closeModal = id => document.getElementById(id)?.classList.add("hidden");
});
