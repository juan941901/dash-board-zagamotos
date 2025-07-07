let datosOriginales = [];

export async function setDatos(fechaInicial, FechaFinal) {
  
  const fechaInicialCompacta = fechaInicial.split("-").join("");
  const fechaFinalCompacta = FechaFinal.split("-").join("");
  
  const response = await fetch(
    "https://zagamotos.cuotasoft.com/blank_consulta_informacion_registros_bitacoras/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Si necesitas enviar un token:
        // "Authorization": "Bearer tu_token_aquí"
      },
      body: JSON.stringify({
        // Aquí los parámetros que tu API espera, si hay
        fecha_inicial: fechaInicialCompacta,
        fecha_final: fechaFinalCompacta,
      }),
    }
  );
  datosOriginales = await response.json();
}

export function getDatos() {
  // if (datosOriginales.length === 0) {
  //   await setDatos(); // solo carga si no se ha cargado aún
  // }
  return datosOriginales;
}
