import { useState, useCallback, useEffect } from 'react'
import { authService, type LoginRequest, type RegisterRequest, type AuthResponse } from '@/lib/services/auth'

export function useAuth() {
  const [user, setUser] = useState(authService.getCurrentUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())

  const login = useCallback(async (credentials: LoginRequest) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(credentials)
      authService.setCurrentUser(response.user)
      setUser(response.user)
      setIsAuthenticated(true)
      return response.user
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(data)
      authService.setCurrentUser(response.user)
      setUser(response.user)
      setIsAuthenticated(true)
      return response.user
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Registration failed'
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Logout failed'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
