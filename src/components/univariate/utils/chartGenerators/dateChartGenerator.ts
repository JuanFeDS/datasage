import { DateChartOptions } from '../../types/chartTypes';

export const generateDateChartOptions = ({
  values,
  selectedVariable
}: { values: any[]; selectedVariable: string }): DateChartOptions => {
  const dateCounts = values.reduce<Record<string, number>>((acc, date) => {
    if (!date) return acc;
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return acc;
    
    const dateKey = dateObj.toISOString().split('T')[0];
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});
  const sortedDates = Object.keys(dateCounts).sort();
  
  return {
    lineChartOptions: {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const date = params[0].axisValue;
          const count = dateCounts[date] || 0;
          return `${date}<br/>Conteo: ${count}`;
        }
      },
      xAxis: {
        type: 'category',
        data: sortedDates,
        axisLabel: {
          rotate: 45,
          interval: Math.ceil(sortedDates.length / 10)
        }
      },
      yAxis: {
        type: 'value',
        name: 'Conteo'
      },
      series: [{
        name: 'Conteo',
        type: 'line',
        smooth: true,
        data: sortedDates.map(date => ({
          value: dateCounts[date],
          name: date
        })),
        itemStyle: {
          color: '#6366f1'
        },
        lineStyle: {
          width: 3
        },
        symbolSize: 6,
        symbol: 'circle'
      }]
    },
    data: { [selectedVariable]: values }
  };
};
