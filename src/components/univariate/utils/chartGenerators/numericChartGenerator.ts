import { NumericChartOptions } from '../../types/chartTypes';
import { getHistogramOptions, getBoxPlotOptions, getLineChartOptions } from '../chartUtils';

export const generateNumericChartOptions = ({
  values,
  selectedVariable
}: { values: any[]; selectedVariable: string }): NumericChartOptions => {
  const chartData = { [selectedVariable]: values };
  
  return {
    histogramOptions: getHistogramOptions(chartData, selectedVariable),
    boxPlotOptions: getBoxPlotOptions(chartData, selectedVariable),
    lineChartOptions: getLineChartOptions(chartData, selectedVariable),
    data: chartData
  };
};
