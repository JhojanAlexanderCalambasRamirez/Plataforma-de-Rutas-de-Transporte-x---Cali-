async function obtenerConductores() {
  try {
    const res = await fetch(`${baseURL}/admin/publicaciones`);
    const data = await res.json();

    // Validar que la respuesta sea un arreglo
    if (!Array.isArray(data)) {
      console.error("⚠️ Respuesta inesperada:", data);
      alert("Error al cargar publicaciones. Intenta más tarde.");
      return;
    }

    const lista = document.getElementById("listaConductores");
    lista.innerHTML = "";

    data.forEach(conductor => {
      const li = document.createElement("div");
      li.className = "panel-conductor";

      li.innerHTML = `
        <p><strong>Nombre:</strong> ${conductor.nombre}</p>
        <p><strong>Placa:</strong> ${conductor.placa}</p>
        <p><strong>Ruta:</strong> ${conductor.rutaAsignada}</p>
        <p><strong>Fecha:</strong> ${conductor.fechaPublicacion}</p>
        <button onclick="eliminarPublicacion('${conductor.id}')">Eliminar</button>
      `;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error("❌ Error al obtener publicaciones:", error);
    alert("Hubo un problema al obtener las publicaciones.");
  }
}

async function eliminarPublicacion(busID) {
  try {
    const res = await fetch(`${baseURL}/admin/eliminar-publicacion/${busID}`, {
      method: "DELETE"
    });
    const result = await res.json();

    if (res.ok) {
      alert(result.mensaje || "Publicación eliminada.");
      obtenerConductores(); // Recargar lista
    } else {
      console.error("⚠️ Error al eliminar:", result);
      alert(result.error || "No se pudo eliminar la publicación.");
    }
  } catch (error) {
    console.error("❌ Error al eliminar publicación:", error);
    alert("Hubo un problema al eliminar la publicación.");
  }
}
