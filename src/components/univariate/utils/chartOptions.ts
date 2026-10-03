import { DataType } from '../types';
import { ChartGeneratorOptions } from '../types/chartTypes';

// Import the chart generators
import { generateDateChartOptions } from './chartGenerators/dateChartGenerator';
import { generateNumericChartOptions } from './chartGenerators/numericChartGenerator';
import { generateCategoricalChartOptions as generateCategoricalChartOptionsHelper } from './chartGenerators/categoricalChartGenerator';

export { generateDateChartOptions, generateNumericChartOptions };

export const generateCategoricalChartOptions = ({
  values,
  selectedVariable,
  dataType
}: ChartGeneratorOptions) => {
  return generateCategoricalChartOptionsHelper({ values, selectedVariable });
};
