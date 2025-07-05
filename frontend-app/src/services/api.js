const API_BASE_URL = 'http://localhost:8000/api/v1/chat';

/**
 * Envía un mensaje al backend
 * @param {string} message - El mensaje del usuario
 * @param {string} [conversationId] - ID opcional de la conversación
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const sendMessage = async (message, conversationId = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        conversation_id: conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Verifica la conexión con el backend
 * @returns {Promise<boolean>} True si la conexión es exitosa
 */
export const checkBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:8000/');
    return response.ok;
  } catch (error) {
    console.error('Backend connection error:', error);
    return false;
  }
};
