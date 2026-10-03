import { EChartsOption } from 'echarts';
import { ChartData } from '../types/chartTypes';

export const getHistogramOptions = (data: ChartData, variableName: string): EChartsOption => {
  const values = data[variableName] || [];
  
  return {
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'shadow' as const
      }
    },
    xAxis: {
      type: 'category' as const,
      data: Array.from({ length: 10 }, (_, i) => i.toString()),
      axisLabel: {
        color: '#a1a1aa'
      }
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: {
        color: '#a1a1aa'
      },
      splitLine: {
        lineStyle: {
          color: '#2d2d3d'
        }
      }
    },
    series: [{
      name: 'Frecuencia' as const,
      type: 'line' as const,
      data: Array(10).fill(0).map((_, i) => 
        values.filter(v => 
          v >= i * 10 && v < (i + 1) * 10
        ).length
      ),
      itemStyle: {
        color: '#6366f1'
      }
    }]
  };
};

export const getBoxPlotOptions = (data: ChartData, variableName: string): EChartsOption => {
  const values = (data[variableName] || []) as number[];
  const sorted = [...values].sort((a, b) => a - b);
  
  const q1 = sorted[Math.floor(sorted.length * 0.25)] || 0;
  const median = sorted[Math.floor(sorted.length * 0.5)] || 0;
  const q3 = sorted[Math.floor(sorted.length * 0.75)] || 0;
  const iqr = q3 - q1;
  const min = Math.max(sorted[0] || 0, q1 - 1.5 * iqr);
  const max = Math.min(sorted[sorted.length - 1] || 0, q3 + 1.5 * iqr);
  
  return {
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item' as const,
      axisPointer: {
        type: 'shadow' as const
      }
    },
    xAxis: {
      type: 'category' as const,
      data: [variableName],
      axisLabel: {
        color: '#a1a1aa'
      }
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: {
        color: '#a1a1aa'
      },
      splitLine: {
        lineStyle: {
          color: '#2d2d3d'
        }
      }
    },
    series: [{
      name: 'Box Plot' as const,
      type: 'boxplot' as const,
      data: [{
        value: [min, q1, median, q3, max],
        itemStyle: {
          color: '#6366f1',
          borderColor: '#a5b4fc'
        }
      }]
    }]
  };
};

export const getLineChartOptions = (data: ChartData, variableName: string): EChartsOption => {
  const values = data[variableName] || [];
  
  return {
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'cross' as const,
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category' as const,
      data: values.map((_, i) => i.toString()),
      axisLabel: {
        color: '#a1a1aa'
      }
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: {
        color: '#a1a1aa'
      },
      splitLine: {
        lineStyle: {
          color: '#2d2d3d'
        }
      }
    },
    series: [{
      type: 'pie' as const,
      data: (values as number[]).map((value, index) => ({
        value,
        name: `Item ${index + 1}`,
        itemStyle: {
          color: `hsl(${index * 137.5}, 70%, 60%)`,
          borderColor: '#fff',
          borderWidth: 2
        }
      })),
      radius: ['40%', '70%'],
      label: {
        color: '#a1a1aa'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
};
