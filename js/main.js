import { renderMarcas } from "./charts/marcas.js";
import { renderPuntosDeVenta } from "./charts/puntos-de-venta.js";
import { renderAsesores } from "./charts/asesores.js";
import { renderEstadosBitacoras } from "./charts/estados-bitacoras.js";
import { renderActividadesBitacora } from "./charts/actividades-bitacora.js";
import { countRecords } from "./utils/count-records.js";
import { getDatos, setDatos } from "./state/dataState.js";

const pastelColors = [
  "#AEC6CF",
  "#FFB347",
  "#B39EB5",
  "#77DD77",
  "#FF6961",
  "#F49AC2",
  "#CFCFC4",
  "#FDFD96",
  "#CB99C9",
  "#FFD1DC",
  "#C1E1C1",
  "#D6AEDD",
  "#FFDAC1",
  "#B0E0E6",
  "#FFB6C1",
  "#E6E6FA",
  "#FFFACD",
  "#F5DEB3",
  "#E0BBE4",
  "#D5AAFF",
  "#B2FBA5",
  "#A0E7E5",
  "#FFAAAF",
  "#AFCBFF",
  "#D5F4E6",
  "#E3E3E3",
  "#FAF0E6",
  "#DCD0FF",
  "#FFDEAD",
  "#FFE4E1",
  "#D8BFD8",
  "#F0E68C",
  "#FFCCCB",
  "#C4FAF8",
  "#F3D1DC",
  "#F6C6EA",
  "#D0F0C0",
  "#ECECEC",
  "#FFEFDB",
  "#C5D0E6",
  "#FFABAB",
  "#FFF5BA",
  "#C9C9FF",
  "#B5EAD7",
  "#E2F0CB",
  "#FFB3BA",
  "#FFDFBA",
  "#FFFFBA",
  "#BAFFC9",
  "#BAE1FF",
  "#FADADD",
  "#FFEFD5",
  "#EED6D3",
  "#D1CFE2",
  "#EAD1DC",
  "#E0FFFF",
  "#F0FFF0",
  "#F8F8FF",
  "#F5F5F5",
  "#FFF0F5",
  "#FFFAFA",
  "#FFFFF0",
  "#FDF5E6",
  "#F0F8FF",
  "#FFE4B5",
  "#FFF8DC",
  "#E6E6FA",
  "#FFE4E1",
  "#E0FFFF",
  "#F0FFF0",
  "#FFFACD",
  "#F5FFFA",
  "#FAEBD7",
  "#FDF5E6",
  "#F5F5DC",
  "#FFEBCD",
  "#FFFAF0",
  "#F0F0F0",
  "#EEE8AA",
  "#F4A460",
  "#D2B48C",
  "#D8BFD8",
  "#B0C4DE",
  "#B0E0E6",
  "#AFEEEE",
  "#ADD8E6",
  "#87CEFA",
  "#87CEEB",
  "#B6D0E2",
  "#D3D3D3",
  "#DCDCDC",
  "#C0C0C0",
  "#C1CDC1",
  "#F5F5F5",
  "#F6F8FF",
  "#E1F5FE",
  "#FCE4EC",
  "#FFF9C4",
  "#F3E5F5",
  "#F1F8E9",
];

document.addEventListener("DOMContentLoaded", async () => {

  const boton = document.querySelector("button");
  boton.addEventListener("click", enviarFechas);

  const fechaInicial = document.getElementById("fecha-inicial");
  const fechaFinal = document.getElementById("fecha-final");

  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth();

  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);

  const formatear = (f) => f.toISOString().split("T")[0];

  fechaInicial.value = formatear(primerDia);
  fechaFinal.value = formatear(ultimoDia);

  try {
    await setDatos(fechaInicial.value, fechaFinal.value); // ✅ Espera a que cargue los datos

    const data = getDatos();

    countRecords(data);
    renderMarcas(data, pastelColors);
    renderPuntosDeVenta(data, pastelColors);
    renderAsesores(data, pastelColors);
    renderEstadosBitacoras(data, pastelColors);
    renderActividadesBitacora(data, pastelColors);
  } catch (error) {
    console.error("Error cargando el JSON:", error);
  }
});

async function enviarFechas() {

  const fechaInicial = document.getElementById("fecha-inicial").value;
  const fechaFinal = document.getElementById("fecha-final").value;


  try {

    await setDatos(fechaInicial, fechaFinal); // ✅ Espera a que cargue los datos

    const data = getDatos();

    countRecords(data);
    renderMarcas(data, pastelColors);
    renderPuntosDeVenta(data, pastelColors);
    renderAsesores(data, pastelColors);
    renderEstadosBitacoras(data, pastelColors);
    renderActividadesBitacora(data, pastelColors);
  } catch (error) {
    console.error("Error cargando el JSON:", error);
  }
}
