export function renderMarcas(items) {

  // Crear nuevo JSON con valores únicos de marca y contarlos
  const conteoMarcas = {};

  items.forEach((item) => {
    const marca = item.marca ?? "Sin Marca";
    conteoMarcas[marca] = (conteoMarcas[marca] || 0) + 1;
  });

  const jsonFinal = Object.entries(conteoMarcas).map(([marca, count]) => ({
    value: count,
    name: marca,
  }));

  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById("marcas"));

  // Specify the configuration items and data for the chart
  var option = {
    color: ["#0000FF", "#FF0000", "#000000"],
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
}
