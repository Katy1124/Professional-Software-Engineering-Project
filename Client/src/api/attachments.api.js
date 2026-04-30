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
  },

  uploadOne: async (ticketId, file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(`${API_BASE}/api/tickets/${ticketId}/attachments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to upload attachment');
    }

    return response.json();
  },

  uploadMany: async (ticketId, files) => {
    const results = [];

    for (const file of files) {
      const result = await attachmentsApi.uploadOne(ticketId, file);
      results.push(result);
    }

    return results;
  }
};