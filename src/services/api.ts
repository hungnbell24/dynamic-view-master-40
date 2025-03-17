
/**
 * API Service
 * This file centralizes all API endpoints and request handling
 */

// Base URL for API calls
const API_BASE_URL = 'http://localhost:3003';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (response.ok) {
    return data;
  }
  
  // If the response is not ok, throw an error with the error message
  throw new Error(data.data || 'An error occurred');
};

// Get auth token from localStorage
const getAuthToken = () => {
  const authData = localStorage.getItem('authData');
  if (!authData) return null;
  
  try {
    const parsed = JSON.parse(authData);
    return parsed.token;
  } catch (error) {
    console.error('Error parsing auth data:', error);
    return null;
  }
};

// Authentication APIs
export const authAPI = {
  login: async (payload: { 
    email: string; 
    password: string; 
    domain: string; 
    ttl_in_second: number 
  }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    return handleResponse(response);
  },
};

// Dashboard APIs
export const dashboardAPI = {
  getQuickSummary: async () => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/quick-summary`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },
};

// Export all APIs as a single object
const API = {
  auth: authAPI,
  dashboard: dashboardAPI,
};

export default API;
