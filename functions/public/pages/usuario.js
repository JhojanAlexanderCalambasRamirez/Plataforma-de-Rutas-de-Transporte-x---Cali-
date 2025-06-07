let mapa, marcador;

window.onload = () => {
  iniciarMapa();
  obtenerPublicaciones();
};

function iniciarMapa() {
  mapa = L.map("mapa").setView([3.4516, -76.5320], 13); // Punto inicial: Cali
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapa);
}

async function obtenerPublicaciones() {
  try {
    const res = await fetch(`${baseURL}/admin/publicaciones`);
    const data = await res.json();
    const contenedor = document.getElementById("panelesConductores");
    contenedor.innerHTML = "";

    data.forEach((conductor) => {
      const div = document.createElement("div");
      div.className = "panel-conductor";

      div.innerHTML = `
        <p><strong>Conductor:</strong> ${conductor.nombre}</p>
        <p><strong>Placa:</strong> ${conductor.placa}</p>
        <p><strong>Ruta:</strong> ${conductor.rutaAsignada}</p>
        <p><strong>Fecha:</strong> ${conductor.fechaPublicacion}</p>
        <button onclick="verUbicacion('${conductor.placa}')">Ver en Mapa</button>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("❌ Error al obtener publicaciones:", error);
  }
}

async function verUbicacion(placa) {
  try {
    const res = await fetch(`${baseURL}/usuario/ubicacion?busID=${placa}`);
    if (!res.ok) throw new Error("Ubicación no encontrada");

    const data = await res.json();
    const latlng = [data.latitud, data.longitud];

    mapa.setView(latlng, 15);

    if (marcador) {
      marcador.setLatLng(latlng);
    } else {
      marcador = L.marker(latlng).addTo(mapa);
    }

    marcador.bindPopup("Ubicación del bus").openPopup();
  } catch (error) {
    alert("Ubicación no disponible.");
    console.error("❌ Error al mostrar ubicación:", error);
  }
}
