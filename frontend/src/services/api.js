const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('vibecheck_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth APIs
  auth: {
    login: async (identity, password) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      if (data.token) localStorage.setItem('vibecheck_token', data.token);
      return data;
    },

    register: async (userData) => {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      if (data.token) localStorage.setItem('vibecheck_token', data.token);
      return data;
    },

    getMe: async () => {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
      return data.user;
    },

    forgotPassword: async (email) => {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await res.json();
    },

    logout: () => {
      localStorage.removeItem('vibecheck_token');
    },
  },

  // Task & Daily Intention APIs
  tasks: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/tasks${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch tasks');
      return data.data;
    },

    create: async (taskData) => {
      const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create task');
      return data.data;
    },

    toggle: async (id) => {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to toggle task');
      return data.data;
    },

    update: async (id, taskData) => {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update task');
      return data.data;
    },

    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete task');
      return data;
    },
  },

  // Daily Vibe APIs
  vibes: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/vibes`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return data.data;
    },

    create: async (vibeData) => {
      const res = await fetch(`${API_BASE_URL}/vibes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(vibeData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to log vibe');
      return data.data;
    },

    getInsights: async () => {
      const res = await fetch(`${API_BASE_URL}/vibes/insights`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return data.data;
    },
  },

  // Space Preferences APIs
  preferences: {
    get: async () => {
      const res = await fetch(`${API_BASE_URL}/preferences`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return data.data;
    },

    update: async (prefs) => {
      const res = await fetch(`${API_BASE_URL}/preferences`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(prefs),
      });
      const data = await res.json();
      return data.data;
    },
  },
};

export default api;
