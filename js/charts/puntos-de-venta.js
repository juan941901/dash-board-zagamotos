export function renderPuntosDeVenta(items) {
  // Crear nuevo JSON con valores únicos de marca y contarlos
  const conteoPuntoDeVenta = {};

  items.forEach((item) => {
    const puntoDeVenta = item.punto_de_venta ?? "Sin Pto venta";
    conteoPuntoDeVenta[puntoDeVenta] =
      (conteoPuntoDeVenta[puntoDeVenta] || 0) + 1;
  });

  const puntosDeVentaOrdenados = Object.fromEntries(
  Object.entries(conteoPuntoDeVenta).sort(([, a], [, b]) => b - a)
);

  const etiquetasPuntoDeVenta = Object.keys(puntosDeVentaOrdenados);
  const valoresPuntoDeVenta = Object.values(puntosDeVentaOrdenados);

  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById("puntos-de-venta"));

  // Specify the configuration items and data for the chart
  var option = {
    color: ["#0000FF", "#FF0000", "#000000"],
    tooltip: { trigger: "item" },
    title: {
      text: "Puntos de Venta", // ← Título principal
      left: "center",
      // top: "15%", // distancia desde arriba
      // itemGap: 10, // espacio entre título y subtítulo
      textStyle: {
        fontSize: 18,
      },
    },
    xAxis: {
      type: "category",
      data: etiquetasPuntoDeVenta,
      axisLabel: {
        show: false,
        interval: 0,
        rotate: 45, // o 60 si lo ves muy apretado
        fontSize: 10, // puedes ajustar tamaño si están muy largas
      },
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        start: 0, // Contro
        end: 30, //
        disabled: true, // ❗ Bloquea el zoom, pero mantiene visible la barra
        show: true, // 👁️ Asegura que se muestre
      },
    ],
    series: [
      {
        label: {
          show: true,
          fontSize: 10,
        },
        type: "bar",
        itemStyle: {
          color: function (params) {
            // Selecciona el color según el índice
            const colores = [
              "#0000FF",
              "#FF0000",
              "#000000",
              "#00FF00",
              "#FFA500",
              "#800080",
              "#00CED1",
            ];
            return colores[params.dataIndex % colores.length];
          },
        },
        data: valoresPuntoDeVenta,
      },
    ],
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);
}
