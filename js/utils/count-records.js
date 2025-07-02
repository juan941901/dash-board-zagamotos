export function countRecords(data) {
  const total = data.length;

  // Formatear el número con separadores de miles, estilo colombiano/español
  const totalRegistrosFormateado = total.toLocaleString("es-CO");

  // Seleccionar el primer <h2> dentro del div
  const totalRegistrosDiv = document.querySelector('#total-registros h2');
  const totalRegistrosCulminadosDiv = document.querySelector('#total-registros-culminado h2');
  const totalRegistrosSinCulminarDiv = document.querySelector('#total-registros-sin-culminado h2');

  if (totalRegistrosDiv) {
    totalRegistrosDiv.textContent = totalRegistrosFormateado;
  }

  const totalAsesorNoVacio = data.filter(
    (item) => item.asesor && item.asesor.trim() !== "Sin Asesor"
  ).length.toLocaleString("es-CO");

if (totalRegistrosCulminadosDiv) {
    totalRegistrosCulminadosDiv.textContent = totalAsesorNoVacio;
  }

  const totalAsesorVacio = data.filter(
    (item) => !item.asesor || item.asesor.trim() === "Sin Asesor"
  ).length.toLocaleString("es-CO");

  if (totalRegistrosSinCulminarDiv) {
    totalRegistrosSinCulminarDiv.textContent = totalAsesorVacio;
  }
 
}
