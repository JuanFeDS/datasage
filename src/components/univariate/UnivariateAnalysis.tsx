import React, { useMemo } from 'react';
import styled from 'styled-components';
import { UnivariateAnalysisProps, DataType } from './types';
import { VariableSelector } from './components/VariableSelector';
import { StatsDisplay } from './components/StatsDisplay';
import { ChartTypeSelector } from './components/ChartTypeSelector';
import { ChartDisplay } from './components/ChartDisplay';
import { useUnivariateAnalysis } from './hooks/useUnivariateAnalysis';
import { ErrorBoundary } from 'react-error-boundary';

// Componente para mostrar errores
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div role="alert" style={{ color: '#ff6b6b', padding: '1rem' }}>
    <p>Algo salió mal:</p>
    <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    <button 
      onClick={resetErrorBoundary}
      style={{ 
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4a6bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Reintentar
    </button>
  </div>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #14141f;
  color: #fff;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  overflow-y: auto;
`;

const UnivariateAnalysis: React.FC<UnivariateAnalysisProps> = ({ 
  data, 
  columnTypes 
}) => {
  // Validar props
  const validatedProps = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      console.warn('UnivariateAnalysis: data debe ser un array');
      return { data: [], columnTypes: {} };
    }
    if (!columnTypes || typeof columnTypes !== 'object') {
      console.warn('UnivariateAnalysis: columnTypes debe ser un objeto');
      return { data, columnTypes: {} };
    }
    return { data, columnTypes };
  }, [data, columnTypes]);

  const {
    selectedVariable,
    dataType,
    activeChart,
    filteredVariables,
    stats,
    currentChartOptions,
    availableChartTypes,
    handleDataTypeChange,
    handleVariableChange,
    handleChartTypeChange
  } = useUnivariateAnalysis(validatedProps);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Container>
        <Header>
          <h2>Análisis Univariado</h2>
          <VariableSelector
            dataType={dataType}
            selectedVariable={selectedVariable}
            filteredVariables={filteredVariables}
            onDataTypeChange={handleDataTypeChange}
            onVariableChange={handleVariableChange}
          />
        </Header>
        
        <Content>
          <StatsDisplay stats={stats} />
          
          {filteredVariables.length > 0 ? (
            <>
              <ChartTypeSelector
                activeChart={activeChart}
                availableChartTypes={availableChartTypes}
                onChartTypeChange={handleChartTypeChange}
              />
              
              <ChartDisplay
                chartOptions={currentChartOptions}
                dataType={dataType}
                activeChart={activeChart}
                isLoading={!currentChartOptions}
              />
            </>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '200px',
              color: '#888',
              fontSize: '1.1rem'
            }}>
              No hay variables disponibles para el tipo de dato seleccionado.
            </div>
          )}
        </Content>
      </Container>
    </ErrorBoundary>
  );
};

export default UnivariateAnalysis;
