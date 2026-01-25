
/**
 * services/apiClient.ts
 * Standardized Fetcher for EduMentor AI Backend
 */

const API_BASE = '/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

/**
 * Enhanced fetch with JWT injection and standard response handling.
 */
export async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('edumentor_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const result: ApiResponse<T> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'API request failed');
    }

    return result.data;
  } catch (error) {
    // Re-throw to be handled by the "Safe Hybrid" fallback logic in components
    throw error;
  }
}
