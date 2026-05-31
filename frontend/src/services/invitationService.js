import api from './api';

/**
 * Submit visitor details and receive matched session + AI invitation email
 */
export const generateInvitation = async (payload) => {
  try {
    const { data } = await api.post('/api/generate-invitation', payload);
    return data;
  } catch (error) {
    console.error("Generate Invitation Error:", error.message);
    throw error;
  }
};

/**
 * Fetch all agenda sessions
 */
export const fetchSessions = async () => {
  try {
    const { data } = await api.get('/api/sessions');
    return data.sessions;
  } catch (error) {
    console.error("Fetch Sessions Error:", error.message);
    throw error;
  }
};

/**
 * Check backend health
 */
export const checkHealth = async () => {
  try {
    const { data } = await api.get('/api/health');
    return data;
  } catch (error) {
    console.error("Health Check Error:", error.message);
    throw error;
  }
};