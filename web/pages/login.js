document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = e.target.usuario.value;
  const password = e.target.password.value;
  const mensaje = document.getElementById("mensajeLogin");

  // Usuario fijo
  const USER = "Alex4nder";

  // Contraseña la defines aquí tú
  const PASSWORD = "246800"; // <- cámbiala aquí

  if (usuario === USER && password === PASSWORD) {
    localStorage.setItem("adminAutenticado", "true");
    window.location.href = "./pages/admin.html";
  } else {
    mensaje.textContent = "❌ Credenciales inválidas.";
    mensaje.style.color = "red";
  }
});
