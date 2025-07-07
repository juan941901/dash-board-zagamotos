import { filterData } from "../state/filters.js";

export function renderAsesores(data, pastelColors) {
  // Crear nuevo JSON con valores únicos de marca y contarlos
  const conteoAsesores = {};

  data.forEach((item) => {
    const asesor = item.asesor ?? "Sin Asesor";
    conteoAsesores[asesor] = (conteoAsesores[asesor] || 0) + 1;
  });

  const asesoresOrdenados = Object.fromEntries(
    Object.entries(conteoAsesores).sort(([, a], [, b]) => a - b)
  );

  const etiquetAsasesor = Object.keys(asesoresOrdenados);
  const valoresAsesor = Object.values(asesoresOrdenados);

  const contenedor = document.getElementById("asesores");
  echarts.dispose(contenedor); // 💥 Limpia cualquier gráfico anterior
  // Initialize the echarts instance based on the prepared dom
  const myChart = echarts.init(contenedor);

  // Specify the configuration items and data for the chart
  var option = {
    grid: {
      left: "35%", // Aumenta este valor para mover el gráfico a la derecha
      right: "10%",
      top: "10%",
      bottom: "10%",
    },
    tooltip: { trigger: "item" },
    title: {
      text: "Asesores",
      left: "center",
      textStyle: { fontSize: 18 },
    },
    color: ["#0000FF", "#FF0000", "#000000", "#00FF00", "#FFA500"],
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: etiquetAsasesor,
      axisLabel: {
        fontSize: 14,
      },
    },
    dataZoom: [
      {
        type: "slider",
        yAxisIndex: 0,
        start: 100, // Contro
        end: 70, //
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 20, // Grosor de barra
        label: {
          show: true,
          fontSize: 14,
          position: "right",
        },
        itemStyle: {
          color: function (params) {
            return pastelColors[params.dataIndex % pastelColors.length];
          },
        },
        data: valoresAsesor,
      },
    ],
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);

  // Evento click para filtrar
  myChart.on("click", function (params) {
    console.log(params);
    filterData("asesor", params.name);
  });
}
