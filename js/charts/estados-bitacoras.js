export function renderEstadosBitacoras(data) {

  // Crear nuevo JSON con valores únicos de marca y contarlos
  const conteoEstadosBitacora = {};

  data.forEach((item) => {
    const estadoBitacora = item.estado_bitacora ?? "Sin Estado";
    conteoEstadosBitacora[estadoBitacora] = (conteoEstadosBitacora[estadoBitacora] || 0) + 1;
  });

  const jsonFinal = Object.entries(conteoEstadosBitacora).map(([marca, count]) => ({
    value: count,
    name: marca,
  }));


  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById("estados-bitacoras"));

  // Specify the configuration items and data for the chart
  var option = {
    title: {
      text: "Estado Bitacoras",
      // subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      selectedMode: true,
      orient: "horizontal",
      top: "10%", // ⬅️ Baja la leyenda
      left: "center", // ⬅️ Centra la leyenda
      textStyle: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Zona",
        type: "pie",
        radius: "30%",
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)", // b = nombre, c = valor, d = porcentaje
        },
        data: jsonFinal,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);

  // Evento click para filtrar
  myChart.on("click", function (params) {
    const marcaSeleccionada = params.name;
    console.log(params);
    
    // filtrarPorMarcaYRenderizarTodo(data, marcaSeleccionada);
  });

  myChart.on("legendselectchanged", function (params) {
  const valorSeleccionado = params.name;
  console.log("Click en leyenda:", valorSeleccionado);
  console.log(params);
  

  // También puedes ejecutar la misma función si quieres que se comporte igual
  // filtrarPorMarcaYRenderizarTodo(data, valorSeleccionado);
});
}
