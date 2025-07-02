import { renderMarcas } from "./charts/marcas.js";
import { renderPuntosDeVenta } from "./charts/puntos-de-venta.js";
import { renderAsesores } from "./charts/asesores.js";
import { renderEstadosBitacoras } from "./charts/estados-bitacoras.js";
import { renderActividadesBitacora } from "./charts/actividades-bitacora.js";
import { countRecords } from "./utils/count-records.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("../data/mi_archivo.json");
    const data = await response.json();

    countRecords(data);
    renderMarcas(data);
    renderPuntosDeVenta(data);
    renderAsesores(data);
    renderEstadosBitacoras(data);
    renderActividadesBitacora(data);

  } catch (error) {
    console.error("Error cargando el JSON:", error);
  }
});

