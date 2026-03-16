import { apiClient } from '@/lib/api-client'

/**
 * Authentication Service - REST API endpoints for auth management
 * Handles login, registration, token refresh, and session management
 * 
 * API Base: https://api.fynza.com/api/v1
 */

const TOKEN_KEY = 'fynza_token'
const REFRESH_TOKEN_KEY = 'fynza_refresh_token'
const USER_KEY = 'fynza_user'

export const authService = {
  /**
   * POST /auth/register
   * User registration for customer or seller
   * 
   * Request Body:
   * {
   *   email: string,
   *   password: string,
   *   firstName: string,
   *   lastName: string,
   *   userType: "CUSTOMER" | "SELLER",
   *   phone?: string
   * }
   */
  async register(data: {
    email: string
    password: string
    firstName: string
    lastName: string
    userType: 'CUSTOMER' | 'SELLER'
    phone?: string
  }) {
    try {
      const response = await apiClient.post('/auth/register', data)
      console.log('[v0] POST /auth/register - user registered:', data.email)

      if (response?.data?.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, response.data.token)
          localStorage.setItem(USER_KEY, JSON.stringify(response.data))
        }
      }

      return response?.data
    } catch (error) {
      console.error('[v0] Error in authService.register:', error)
      throw error
    }
  },

  /**
   * POST /auth/login
   * User login with email and password
   * 
   * Request Body:
   * {
   *   email: string,
   *   password: string
   * }
   */
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      console.log('[v0] POST /auth/login - logged in:', credentials.email)

      if (response?.data?.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, response.data.token)
          localStorage.setItem(USER_KEY, JSON.stringify(response.data))
        }
      }

      return response?.data
    } catch (error) {
      console.error('[v0] Error in authService.login:', error)
      throw error
    }
  },

  /**
   * POST /auth/logout
   * Logout user and blacklist token
   */
  async logout() {
    try {
      const response = await apiClient.post('/auth/logout')
      console.log('[v0] POST /auth/logout - user logged out')
      return response?.data
    } catch (error) {
      console.warn('[v0] Logout error (continuing):', error)
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    }
  },

  /**
   * POST /auth/refresh-token
   * Refresh JWT token for extended session
   * 
   * Request Body:
   * {
   *   token: current_jwt_token
   * }
   */
  async refreshToken() {
    try {
      const currentToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null

      if (!currentToken) {
        throw new Error('No token found')
      }

      const response = await apiClient.post('/auth/refresh-token', {
        token: currentToken,
      })
      console.log('[v0] POST /auth/refresh-token - token refreshed')

      if (response?.data?.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_KEY, response.data.token)
        }
      }

      return response?.data
    } catch (error) {
      console.error('[v0] Error refreshing token:', error)
      throw error
    }
  },

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  },

  /**
   * Get current user from storage
   */
  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY)
      if (userStr) {
        try {
          return JSON.parse(userStr)
        } catch {
          return null
        }
      }
    }
    return null
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(TOKEN_KEY)
    }
    return false
  },

  /**
   * Clear all auth data on logout
   */
  clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  },
}
