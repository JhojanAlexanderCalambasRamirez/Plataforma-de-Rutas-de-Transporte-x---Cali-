const baseURL = "http://localhost:5001/rutas-valle/us-central1";
let watchID = null;

// ✅ Registrar conductor
async function registrarConductor() {
  const nombre = document.getElementById("nombre").value;
  const placa = document.getElementById("placa").value;
  const rutaAsignada = document.getElementById("rutaAsignada").value;

  const res = await fetch(`${baseURL}/registrarConductor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, placa, rutaAsignada })
  });

  const resultado = await res.json();
  alert(resultado.mensaje || "Error");
}

// ✅ Enviar ubicación GPS cada vez que se actualice
async function enviarUbicacion(busID, lat, lng) {
  await fetch(`${baseURL}/actualizarUbicacion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ busID, latitud: lat, longitud: lng })
  });
}

// ✅ Iniciar seguimiento GPS
function iniciarGPS() {
  const busID = document.getElementById("busID").value;

  if (!navigator.geolocation) {
    alert("Geolocalización no soportada por tu navegador");
    return;
  }

  watchID = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      enviarUbicacion(busID, latitude, longitude);
    },
    (error) => alert("Error obteniendo ubicación: " + error.message),
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
  );

  alert("Ubicación en tiempo real activada.");
}
