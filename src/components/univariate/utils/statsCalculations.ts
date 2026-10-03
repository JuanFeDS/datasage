import { DataType, Stats } from '../types';

// Helper function to safely convert values to numbers for calculations
export const toNumber = (value: string | number | boolean | Date | null): number | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value instanceof Date) return value.getTime();
  
  const num = parseFloat(value.toString());
  return isNaN(num) ? null : num;
};

// Helper function to calculate statistics for numeric data
export const calculateNumericStats = (values: (string | number | boolean | Date | null)[]): Stats => {
  const numericValues = values
    .map(toNumber)
    .filter((val): val is number => val !== null);
    
  if (numericValues.length === 0) {
    return {
      media: 0,
      mediana: 0,
      moda: null,
      desviacion: 0,
      minimo: null,
      maximo: null,
      count: 0
    };
  }
  
  const sorted = [...numericValues].sort((a, b) => a - b);
  const sum = numericValues.reduce((a, b) => a + b, 0);
  const media = sum / numericValues.length;
  const variance = numericValues.reduce((a, b) => a + Math.pow(b - media, 2), 0) / numericValues.length;
  const desviacion = Math.sqrt(variance);
  
  // Calculate median
  const mid = Math.floor(sorted.length / 2);
  const mediana = sorted.length % 2 !== 0 
    ? sorted[mid] 
    : (sorted[mid - 1] + sorted[mid]) / 2;
  
  // Calculate mode
  const frequency: Record<number, number> = {};
  numericValues.forEach(n => {
    frequency[n] = (frequency[n] || 0) + 1;
  });
  
  let moda: number | null = null;
  let maxCount = 0;
  
  for (const [value, count] of Object.entries(frequency)) {
    if (count > maxCount) {
      moda = parseFloat(value);
      maxCount = count;
    }
  }
  
  return {
    media: parseFloat(media.toFixed(2)),
    mediana: parseFloat(mediana.toFixed(2)),
    moda,
    desviacion: parseFloat(desviacion.toFixed(2)),
    minimo: sorted[0],
    maximo: sorted[sorted.length - 1],
    count: values.length
  };
};

// Helper function to calculate statistics for non-numeric data
export const calculateCategoricalStats = (values: (string | number | boolean | Date | null)[]): Stats => {
  const stringValues = values.map(v => v?.toString() || '');
  const valueCounts: Record<string, number> = {};
  
  stringValues.forEach(value => {
    if (value) {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    }
  });
  
  const counts = Object.values(valueCounts);
  const total = counts.reduce((a, b) => a + b, 0);
  
  // Find mode
  let moda: string | null = null;
  let maxCount = 0;
  
  for (const [value, count] of Object.entries(valueCounts)) {
    if (count > maxCount) {
      moda = value;
      maxCount = count;
    }
  }
  
  // For categorical data, we can only calculate certain stats
  return {
    media: 0,
    mediana: 0,
    moda,
    desviacion: 0,
    minimo: null,
    maximo: null,
    count: total
  };
};

// Main function to calculate statistics based on data type
export const calculateStats = (
  values: (string | number | boolean | Date | null)[],
  dataType: DataType = 'number'
): Stats => {
  if (dataType === 'number') {
    return calculateNumericStats(values);
  }
  return calculateCategoricalStats(values);
};
