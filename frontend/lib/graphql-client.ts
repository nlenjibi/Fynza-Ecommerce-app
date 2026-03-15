import { API_CONFIG, TOKEN_KEY } from './api-config'

interface GraphQLRequest {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>
}

class GraphQLClient {
  private endpoint: string

  constructor(endpoint: string = API_CONFIG.GRAPHQL_ENDPOINT) {
    this.endpoint = endpoint
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  async request<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
    operationName?: string
  ): Promise<T> {
    const token = this.getAuthToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    console.log(`[v0] GraphQL Request: ${operationName || 'Query'}`)

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
        operationName,
      } as GraphQLRequest),
    })

    const result: GraphQLResponse<T> = await response.json()

    if (result.errors && result.errors.length > 0) {
      const errorMessage = result.errors
        .map((err) => err.message)
        .join(', ')
      console.error(`[v0] GraphQL Error: ${errorMessage}`)
      throw new Error(`GraphQL Error: ${errorMessage}`)
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    return result.data as T
  }
}

export const graphqlClient = new GraphQLClient()
