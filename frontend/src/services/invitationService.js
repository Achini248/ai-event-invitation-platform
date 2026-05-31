import api from './api';

/**
 * Submit visitor details and receive a matched session + AI invitation email.
 * @param {{ name: string, email: string, interest: string }} payload
 * @returns {Promise<InvitationResponse>}
 */
export const generateInvitation = async (payload) => {
  const { data } = await api.post('/generate-invitation', payload);
  return data;
};

/**
 * Fetch the full list of agenda sessions from the backend.
 */
export const fetchSessions = async () => {
  const { data } = await api.get('/sessions');
  return data.sessions;
};

/**
 * Ping the backend health endpoint.
 */
export const checkHealth = async () => {
  const { data } = await api.get('/health');
  return data;
};
