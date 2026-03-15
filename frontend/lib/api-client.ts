import { API_CONFIG, TOKEN_KEY, REFRESH_TOKEN_KEY } from './api-config'

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

class APIClient {
  private baseURL: string

  constructor(baseURL: string = API_CONFIG.REST_API_BASE_URL) {
    this.baseURL = baseURL
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  private setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token)
    }
  }

  private async handleResponse(response: Response) {
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear auth
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(REFRESH_TOKEN_KEY)
        }
        throw new Error('Unauthorized - Please login again')
      }
      throw new Error(data.message || `HTTP Error: ${response.status}`)
    }

    return data
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getAuthToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    console.log(`[v0] REST API Request: ${options.method || 'GET'} ${endpoint}`)

    const response = await fetch(url, {
      ...options,
      headers,
    })

    return this.handleResponse(response)
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(
    endpoint: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(
    endpoint: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new APIClient()
