import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { 
  dropzoneStyles, 
  fileInputStyles, 
  fileInfoStyles, 
  instructionsStyles, 
  supportedFormatsStyles 
} from './styles/fileUploadStyles';

const SUPPORTED_FORMATS = ['CSV', 'Excel (.xlsx, .xls)', 'JSON'] as const;
const FILE_TYPES = '.csv,.xlsx,.xls,.json';

const Dropzone = styled.div<{ $isDragging: boolean }>`
  ${({ $isDragging }) => dropzoneStyles($isDragging)}
`;

const FileInput = styled.input`${fileInputStyles}`;

const FileInfo = styled.div`${fileInfoStyles}`;

const Instructions = styled.div`${instructionsStyles}`;

const SupportedFormats = styled.div`${supportedFormatsStyles}
  
  .supported-formats-text {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
  }
`;

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setSelectedFile(file);
    onFileUpload(file);
  }, [onFileUpload]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card style={{ backgroundColor: '#f8f9fa' }}>
      <Instructions>
        <h3>Carga tus datos</h3>
        <p>Sube un archivo para comenzar tu análisis. Puedes arrastrar y soltar el archivo o hacer clic para seleccionarlo.</p>
        
        <SupportedFormats>
          {SUPPORTED_FORMATS.map(format => (
            <span key={format}>{format}</span>
          ))}
        </SupportedFormats>
      </Instructions>
      
      <Dropzone
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        $isDragging={isDragging}
      >
        <div>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
          </svg>
          <p>Arrastra tu archivo aquí o haz clic para seleccionar</p>
          <p className="supported-formats-text">Formatos soportados: {FILE_TYPES}</p>
        </div>
        
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,.xlsx,.xls,.json"
        />
      </Dropzone>
      
      {selectedFile && (
        <FileInfo>
          <p><strong>Archivo seleccionado:</strong> {selectedFile.name}</p>
          <p><strong>Tamaño:</strong> {formatFileSize(selectedFile.size)}</p>
          <p><strong>Tipo:</strong> {selectedFile.type || 'No especificado'}</p>
        </FileInfo>
      )}
      
      <Button 
        variant="primary" 
        onClick={handleClick}
        disabled={isLoading}
        style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem' }}
        size="sm"
      >
        {isLoading ? 'Procesando...' : 'Seleccionar archivo'}
      </Button>
    </Card>
  );
};
