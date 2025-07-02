export function renderActividadesBitacora(data) {
  // Crear nuevo JSON con valores únicos de marca y contarlos
  const conteoActividadesBitacora = {};

  data.forEach((item) => {
    const actividadBitacora = item.actividad_bitacora ?? "Sin Actividad";
    conteoActividadesBitacora[actividadBitacora] =
      (conteoActividadesBitacora[actividadBitacora] || 0) + 1;
  });

  const jsonFinal = Object.entries(conteoActividadesBitacora).map(
    ([marca, count]) => ({
      value: count,
      name: marca,
    })
  );

  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById("actividades-bitacora"));

  // Specify the configuration items and data for the chart
  var option = {
    title: {
      text: "Actividades Bitacoras",
      // subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      selectedMode: false,
      orient: "horizontal",
      top: "7%", // ⬅️ Baja la leyenda
      left: "center", // ⬅️ Centra la leyenda
      textStyle: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Actividad",
        type: "pie",
        radius: "30%",
        center: ["50%", "60%"],
        label: {
          show: true,
          formatter: "{b}:({d}%)", // b = nombre, c = valor, d = porcentaje
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
}
