import { css } from 'styled-components';

export const dropzoneStyles = (isDragging: boolean) => css`
  border: 2px dashed ${({ theme }) => 
    isDragging ? theme.colors.primary : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 1rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const fileInputStyles = css`
  display: none;
`;

export const fileInfoStyles = css`
  margin: 10px 0 0.75rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  text-align: left;
  font-size: 0.9rem;
  
  p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
  }
  
  strong {
    color: white;
    font-weight: 600;
  }
`;

export const instructionsStyles = css`
  margin-bottom: 1.5rem;
  color: #333;
  
  h3 {
    color: #222;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #444;
    margin: 0.5rem 0;
  }
`;

export const supportedFormatsStyles = css`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0;
  
  span {
    background: rgba(0, 0, 0, 0.08);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #333;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
