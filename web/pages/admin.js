async function obtenerConductores() {
  try {
    const res = await fetch(`${baseURL}/admin/publicaciones`);
    const data = await res.json();
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
    console.error("Error al obtener publicaciones:", error);
  }
}

async function eliminarPublicacion(busID) {
  try {
    const res = await fetch(`${baseURL}/admin/eliminar-publicacion/${busID}`, {
      method: "DELETE"
    });
    const result = await res.json();
    alert(result.mensaje || "Eliminado");
    obtenerConductores(); // Recargar lista
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
  }
}
