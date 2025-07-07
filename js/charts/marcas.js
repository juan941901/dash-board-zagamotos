import { filterData } from "../state/filters.js";

export function renderMarcas(items,pastelColors) {

  // Crear nuevo JSON con valores únicos de marca y contarlos
  const conteoMarcas = {};

  items.forEach((item) => {
    const marca = (item.marca === null || item.marca === undefined || item.marca === "") 
  ? "Sin Marca" 
  : item.marca;
    conteoMarcas[marca] = (conteoMarcas[marca] || 0) + 1;
  });

  const jsonFinal = Object.entries(conteoMarcas).map(([marca, count]) => ({
    value: count,
    name: marca,
  }));

  const contenedor = document.getElementById("marcas");
  echarts.dispose(contenedor); // 💥 Limpia cualquier gráfico anterior
  // Initialize the echarts instance based on the prepared dom
  const myChart = echarts.init(contenedor);

  // Specify the configuration items and data for the chart
  var option = {
    color: pastelColors,
    title: {
      text: "Marcas", // ← Título principal
      left: "center",
      top: "15%", // distancia desde arriba
      // itemGap: 10, // espacio entre título y subtítulo
      textStyle: {
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      selectedMode: false,
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Marca",
        type: "pie",
        radius: ["45%", "60%"],
        center: ["50%", "70%"],
        label: {
          show: true,
          formatter: "{b}: {c} {d}", // b = nombre, c = valor, d = porcentaje
          fontSize: 10,
        },
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: jsonFinal,
      },
    ],
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);

  // Evento click para filtrar
  myChart.on("click", function (params) {
    console.log(params);
    
    filterData("marca", params.name);
  });
}
