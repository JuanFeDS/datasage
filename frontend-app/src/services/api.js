const API_BASE_URL = 'http://localhost:8000/api/v1';

const handleResponse = async (response) => {
  // Clonar la respuesta para poder leerla múltiples veces si es necesario
  const responseClone = response.clone();
  
  if (!response.ok) {
    try {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Error HTTP ${response.status}`);
    } catch (error) {
      // Si falla el parseo como JSON, intentamos leer como texto
      const text = await responseClone.text();
      throw new Error(text || `Error HTTP ${response.status}`);
    }
  }
  
  // Para respuestas exitosas, devolvemos el JSON
  return response.json();
};

/**
 * Envía un mensaje al backend y devuelve la respuesta del agente AI
 * @param {string} message - El mensaje del usuario
 * @param {string|null} conversationId - ID de la conversación (opcional)
 * @returns {Promise<Object>} Respuesta del agente
 */
export const sendMessage = async (message, conversationId = null) => {
  console.log('Enviando mensaje al backend:', { message, conversationId });
  const response = await fetch(`${API_BASE_URL}/chat/chat/message`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ 
      content: message, 
      conversation_id: conversationId,
      stream: false
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Error HTTP ${response.status}`);
  }
  
  return response.json();
};

/**
 * Verifica la conexión con el backend
 * @returns {Promise<boolean>} true si la conexión es exitosa
 */
export const checkBackendConnection = async () => {
  try {
    console.log('Verificando conexión con el backend en:', `${API_BASE_URL}/health`);
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      console.error('Error en la respuesta del servidor:', response.status);
      return false;
    }
    
    const data = await response.json();
    console.log('Estado del backend:', data);
    return data.status === 'ok';
  } catch (error) {
    console.error('Error de conexión con el backend:', error);
    return false;
  }
};
