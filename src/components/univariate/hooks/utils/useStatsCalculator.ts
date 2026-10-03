import { useMemo } from 'react';
import { DataType } from '../../types';
import { calculateStats } from '../../utils/statsCalculations';

export const useStatsCalculator = (selectedVariable: string, dataType: DataType, data: any[]) => {
  return useMemo(() => {
    if (!selectedVariable || data.length === 0) return null;
    
    const values = data
      .map(row => row[selectedVariable])
      .filter((val): val is number | string | boolean => val !== null && val !== undefined);
    
    return calculateStats(values, dataType);
  }, [selectedVariable, data, dataType]);
};
