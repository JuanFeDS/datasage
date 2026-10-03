import React from 'react';
import { DataType, Variable, VariableSelectorProps } from '../types';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  background: #1e1e2d;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SelectorGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #a1a1aa;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #3f3f4d;
  background: #2d2d3d;
  color: #fff;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const dataTypeLabels: Record<DataType, string> = {
  number: 'Numérico',
  string: 'Texto',
  date: 'Fecha',
  boolean: 'Booleano',
  categorical: 'Categórico'
};

export const VariableSelector: React.FC<VariableSelectorProps> = ({
  dataType,
  selectedVariable,
  filteredVariables,
  onDataTypeChange,
  onVariableChange
}) => {
  const dataTypes: DataType[] = ['number', 'string', 'date', 'boolean', 'categorical'];

  return (
    <SelectorContainer>
      <SelectorGroup>
        <Label htmlFor="data-type">Tipo de Dato:</Label>
        <Select
          id="data-type"
          value={dataType}
          onChange={(e) => onDataTypeChange(e.target.value as DataType)}
        >
          {dataTypes.map((type) => (
            <option key={type} value={type}>
              {dataTypeLabels[type]}
            </option>
          ))}
        </Select>
      </SelectorGroup>

      <SelectorGroup>
        <Label htmlFor="variable">Variable:</Label>
        <Select
          id="variable"
          value={selectedVariable}
          onChange={(e) => onVariableChange(e.target.value)}
          disabled={filteredVariables.length === 0}
        >
          {filteredVariables.length === 0 ? (
            <option value="">No hay variables disponibles</option>
          ) : (
            filteredVariables.map((variable) => (
              <option key={variable.name} value={variable.name}>
                {variable.name}
              </option>
            ))
          )}
        </Select>
      </SelectorGroup>
    </SelectorContainer>
  );
};
