import { apiClient } from '@/lib/api-client'

const SESSION_KEY = 'fynza_session_id'
const EVENTS_KEY = 'fynza_tracking_events'

export type TrackingEventType =
  | 'PRODUCT_VIEW'
  | 'PRODUCT_CLICK'
  | 'ADD_TO_CART'
  | 'REMOVE_FROM_CART'
  | 'ADD_TO_WISHLIST'
  | 'REMOVE_FROM_WISHLIST'
  | 'BEGIN_CHECKOUT'
  | 'PURCHASE'
  | 'SEARCH'
  | 'PAGE_VIEW'

export interface TrackingEvent {
  id: string
  eventType: TrackingEventType
  userId?: string
  sessionId: string
  productId?: string
  productName?: string
  category?: string
  price?: number
  source?: string
  referrer?: string
  metadata?: Record<string, unknown>
  timestamp: string
}

interface TrackEventParams {
  eventType: TrackingEventType
  userId?: string
  productId?: string
  productName?: string
  category?: string
  price?: number
  source?: string
  referrer?: string
  metadata?: Record<string, unknown>
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    sessionId = `sess_${generateId()}`
    sessionStorage.setItem(SESSION_KEY, sessionId)
  }
  return sessionId
}

function getStoredEvents(): TrackingEvent[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(EVENTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function storeEvent(event: TrackingEvent): void {
  if (typeof window === 'undefined') return

  const events = getStoredEvents()
  events.push(event)

  const limitedEvents = events.slice(-1000)
  localStorage.setItem(EVENTS_KEY, JSON.stringify(limitedEvents))
}

async function sendToBackend(event: TrackingEvent): Promise<void> {
  try {
    await apiClient.post('/tracking/events', {
      eventType: event.eventType,
      userId: event.userId,
      sessionId: event.sessionId,
      productId: event.productId,
      productName: event.productName,
      category: event.category,
      price: event.price,
      source: event.source,
      referrer: event.referrer,
      metadata: event.metadata,
    })
  } catch (error) {
    console.warn('[Tracking] Failed to send to backend, storing locally:', error)
  }
}

export const trackingService = {
  getSessionId,

  getEvents(): TrackingEvent[] {
    return getStoredEvents()
  },

  clearEvents(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(EVENTS_KEY)
  },

  async track(params: TrackEventParams): Promise<void> {
    const event: TrackingEvent = {
      id: generateId(),
      eventType: params.eventType,
      userId: params.userId,
      sessionId: getSessionId(),
      productId: params.productId,
      productName: params.productName,
      category: params.category,
      price: params.price,
      source: params.source || (typeof window !== 'undefined' ? window.location.pathname : ''),
      referrer: params.referrer || (typeof window !== 'undefined' ? document.referrer : ''),
      metadata: params.metadata,
      timestamp: new Date().toISOString(),
    }

    storeEvent(event)

    await sendToBackend(event)

    console.log('[Tracking] Event logged:', event.eventType, event.productName || '')
  },

  async trackProductView(product: {
    id: string
    name: string
    category?: string
    price?: number
  }): Promise<void> {
    await this.track({
      eventType: 'PRODUCT_VIEW',
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      source: 'product_page',
    })
  },

  async trackProductClick(product: {
    id: string
    name: string
    category?: string
    price?: number
  }, source: string = 'search'): Promise<void> {
    await this.track({
      eventType: 'PRODUCT_CLICK',
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      source,
    })
  },

  async trackAddToCart(product: {
    id: string
    name: string
    category?: string
    price?: number
    quantity?: number
  }): Promise<void> {
    await this.track({
      eventType: 'ADD_TO_CART',
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      source: 'product_page',
      metadata: { quantity: product.quantity || 1 },
    })
  },

  async trackRemoveFromCart(product: {
    id: string
    name: string
    category?: string
    price?: number
  }): Promise<void> {
    await this.track({
      eventType: 'REMOVE_FROM_CART',
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      source: 'cart_page',
    })
  },

  async trackAddToWishlist(product: {
    id: string
    name: string
    category?: string
    price?: number
  }): Promise<void> {
    await this.track({
      eventType: 'ADD_TO_WISHLIST',
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      source: 'product_page',
    })
  },

  async trackRemoveFromWishlist(product: {
    id: string
    name: string
    category?: string
    price?: number
  }): Promise<void> {
    await this.track({
      eventType: 'REMOVE_FROM_WISHLIST',
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      source: 'wishlist_page',
    })
  },

  async trackBeginCheckout(cart: {
    items: Array<{
      productId: string
      name: string
      category?: string
      price: number
      quantity: number
    }>
    total: number
  }): Promise<void> {
    await this.track({
      eventType: 'BEGIN_CHECKOUT',
      source: 'cart_page',
      metadata: {
        items: cart.items,
        total: cart.total,
        itemCount: cart.items.length,
      },
    })
  },

  async trackPurchase(order: {
    id: string
    items: Array<{
      productId: string
      name: string
      category?: string
      price: number
      quantity: number
    }>
    total: number
  }): Promise<void> {
    await this.track({
      eventType: 'PURCHASE',
      source: 'checkout_success',
      metadata: {
        orderId: order.id,
        items: order.items,
        total: order.total,
        itemCount: order.items.length,
      },
    })
  },

  async trackSearch(query: string, resultsCount: number = 0): Promise<void> {
    await this.track({
      eventType: 'SEARCH',
      source: 'search_page',
      metadata: { query, resultsCount },
    })
  },

  async trackPageView(pageName: string): Promise<void> {
    await this.track({
      eventType: 'PAGE_VIEW',
      source: pageName,
    })
  },

  getEventStats(): { total: number; byType: Record<TrackingEventType, number> } {
    const events = getStoredEvents()
    const byType: Record<TrackingEventType, number> = {
      PRODUCT_VIEW: 0,
      PRODUCT_CLICK: 0,
      ADD_TO_CART: 0,
      REMOVE_FROM_CART: 0,
      ADD_TO_WISHLIST: 0,
      REMOVE_FROM_WISHLIST: 0,
      BEGIN_CHECKOUT: 0,
      PURCHASE: 0,
      SEARCH: 0,
      PAGE_VIEW: 0,
    }

    events.forEach((event) => {
      if (byType[event.eventType] !== undefined) {
        byType[event.eventType]++
      }
    })

    return { total: events.length, byType }
  },
}
