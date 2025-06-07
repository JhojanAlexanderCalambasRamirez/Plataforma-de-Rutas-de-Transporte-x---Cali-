// conductor.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formConductor");
  const mensajeDiv = document.getElementById("mensajeRegistro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      mensajeDiv.innerText = "❌ Geolocalización no soportada en tu navegador.";
      mensajeDiv.style.color = "red";
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      form.latitud.value = position.coords.latitude;
      form.longitud.value = position.coords.longitude;

      const formData = new FormData(form);
      const datos = Object.fromEntries(formData.entries());

      datos.latitud = parseFloat(datos.latitud);
      datos.longitud = parseFloat(datos.longitud);

      try {
        const res = await fetch(`${baseURL}/conductor/registrar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        const result = await res.json();
        if (res.ok) {
          mensajeDiv.innerText = `✅ ${result.mensaje}`;
          mensajeDiv.style.color = "green";
          form.reset();

          // ⏱️ Activar seguimiento en tiempo real
          iniciarActualizacionUbicacion(datos.placa);
        } else {
          mensajeDiv.innerText = `❌ ${result.error}`;
          mensajeDiv.style.color = "red";
        }
      } catch (error) {
        console.error("❌ Error al registrar:", error);
        mensajeDiv.innerText = "❌ Error de conexión al servidor";
        mensajeDiv.style.color = "red";
      }
    }, (error) => {
      mensajeDiv.innerText = "❌ No se pudo obtener tu ubicación";
      mensajeDiv.style.color = "red";
      console.error("Geolocation error:", error);
    });
  });
});

// ⏱️ Función para enviar ubicación periódicamente
function iniciarActualizacionUbicacion(placa) {
  setInterval(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      await fetch(`${baseURL}/conductor/actualizar-ubicacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placa,
          latitud: lat,
          longitud: lng
        })
      });
    });
  }, 5000); // cada 10 segundos
}
