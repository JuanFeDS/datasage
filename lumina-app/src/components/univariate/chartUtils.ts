import * as echarts from 'echarts';

export const getHistogramOptions = (data: number[], variableName: string) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      backgroundColor: 'transparent',
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 10 }, (_, i) => i + 1),
      name: variableName,
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: { lineStyle: { color: '#8e8e93' } },
      axisLabel: { color: '#e1e1e6' },
    },
    yAxis: {
      type: 'value',
      name: 'Frecuencia',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: { lineStyle: { color: '#8e8e93' } },
      axisLabel: { color: '#e1e1e6' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    series: [
      {
        name: 'Frecuencia',
        type: 'bar',
        data: data,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
      },
    ],
    backgroundColor: 'transparent',
  };
};

export const getBoxPlotOptions = (data: number[], variableName: string) => {
  // Convertir datos a formato de caja y bigotes
  const boxData = [
    {
      name: variableName,
      type: 'boxplot',
      data: [
        {
          value: [
            Math.min(...data),
            data[Math.floor(data.length * 0.25)],
            data[Math.floor(data.length * 0.5)],
            data[Math.floor(data.length * 0.75)],
            Math.max(...data),
          ],
        },
      ],
      itemStyle: {
        color: '#188df0',
        borderColor: '#83bff6',
      },
    },
  ];

  return {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      data: [variableName],
      axisLabel: { color: '#e1e1e6' },
      axisLine: { lineStyle: { color: '#8e8e93' } },
    },
    yAxis: {
      type: 'value',
      name: 'Valores',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: { color: '#e1e1e6' },
      axisLine: { lineStyle: { color: '#8e8e93' } },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    series: boxData,
    backgroundColor: 'transparent',
  };
};

export const getLineChartOptions = (data: number[], variableName: string) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((_, i) => i + 1),
      axisLine: { lineStyle: { color: '#8e8e93' } },
      axisLabel: { color: '#e1e1e6' },
    },
    yAxis: {
      type: 'value',
      name: 'Valor',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: { lineStyle: { color: '#8e8e93' } },
      axisLabel: { color: '#e1e1e6' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    series: [
      {
        name: variableName,
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(24, 141, 240, 0.8)',
            },
            {
              offset: 1,
              color: 'rgba(24, 141, 240, 0.1)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: data,
      },
    ],
    backgroundColor: 'transparent',
  };
};
