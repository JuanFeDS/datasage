import { CategoricalChartOptions } from '../../types/chartTypes';

export const generateCategoricalChartOptions = ({
  values,
  selectedVariable
}: { values: any[]; selectedVariable: string }): CategoricalChartOptions => {
  const frequency = values.reduce<Record<string, number>>((acc, value) => {
    const key = String(value);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  
  const categories = Object.keys(frequency);
  const counts = Object.values(frequency);
  
  return {
    pieOptions: {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: {
          color: '#fff'
        },
        data: categories
      },
      series: [{
        name: selectedVariable,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#1e1e2d',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: categories.map((name, index) => ({
          value: counts[index],
          name
        }))
      }]
    },
    barOptions: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          color: '#a1a1aa',
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
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
        name: selectedVariable,
        type: 'bar',
        data: categories.map((name, index) => ({
          value: counts[index],
          name,
          itemStyle: {
            color: '#6366f1',
            borderRadius: [4, 4, 0, 0]
          }
        })),
        barWidth: '60%'
      }]
    },
    data: { [selectedVariable]: values }
  };
};
