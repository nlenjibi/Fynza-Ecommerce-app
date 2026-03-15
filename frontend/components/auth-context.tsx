"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    signup: (name: string, email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for stored user session
        const storedUser = localStorage.getItem("fynza_user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful login
        const mockUser: User = {
            id: "1",
            name: email.split("@")[0],
            email: email,
        }

        setUser(mockUser)
        localStorage.setItem("fynza_user", JSON.stringify(mockUser))
        setIsLoading(false)
        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("fynza_user")
    }

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful signup
        const mockUser: User = {
            id: "1",
            name: name,
            email: email,
        }

        setUser(mockUser)
        localStorage.setItem("fynza_user", JSON.stringify(mockUser))
        setIsLoading(false)
        return true
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}