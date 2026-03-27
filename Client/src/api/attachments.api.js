const API_BASE = import.meta.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`
  };
}

export const attachmentsApi = {
  getByTicketId: async (ticketId) => {
    const response = await fetch(`${API_BASE}/api/tickets/${ticketId}/attachments`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attachments');
    }

    return response.json();
  }
};