import { ProductStatus, OrderStatus, PaymentStatus, ReturnStatus } from './api';

// Product Types
export interface Product {
  id: string;
  sellerId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercentage: number;
  sku?: string;
  quantityInStock: number;
  status: ProductStatus;
  images: ProductImage[];
  specifications?: Record<string, any>;
  rating: number;
  totalReviews: number;
  totalSold: number;
  isFeatured: boolean;
  seller: SellerInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface SellerInfo {
  id: string;
  storeName: string;
  storeLogoUrl?: string;
  rating: number;
  totalReviews: number;
  verificationStatus: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  sku?: string;
  quantityInStock: number;
  images: ProductImage[];
  specifications?: Record<string, any>;
  seoKeywords?: string;
  seoDescription?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  status?: ProductStatus;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  commissionRate: number;
  isActive: boolean;
  subCategories?: Category[];
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  appliedCouponCode?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Order Types
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  reviewStatus: 'NO_REVIEW' | 'PENDING' | 'REVIEWED';
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  sellerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  items: OrderItem[];
  trackingNumber?: string;
  trackingProvider?: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
  returnStatus: ReturnStatus;
  returnReason?: string;
  returnRequestedAt?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CreateOrderRequest {
  cartItems: AddToCartRequest[];
  shippingAddressId: string;
  billingAddressId?: string;
  paymentMethodId?: string;
  couponCode?: string;
  notes?: string;
}

export interface OrderTrackingInfo {
  trackingNumber: string;
  provider: string;
  status: string;
  lastUpdate: string;
  location?: string;
  estimatedDelivery?: string;
  events?: TrackingEvent[];
}

export interface TrackingEvent {
  status: string;
  description: string;
  timestamp: string;
  location?: string;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  sellerId: string;
  reviewerId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
  unhelpfulCount: number;
  sellerResponse?: string;
  sellerResponseAt?: string;
  verifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitReviewRequest {
  orderItemId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}

// Payment Types
export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentGateway?: string;
  transactionId?: string;
  status: PaymentStatus;
  receiptUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'CARD' | 'UPI' | 'NET_BANKING' | 'WALLET';
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface InitiatePaymentRequest {
  orderId: string;
  paymentMethodId?: string;
  savePaymentMethod?: boolean;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

// Return/Refund Types
export interface ReturnRequest {
  orderId: string;
  reason: string;
  comment?: string;
  images?: string[];
}

export interface ReturnApprovalRequest {
  returnId: string;
  approved: boolean;
  comment?: string;
  refundAmount?: number;
}

// Analytics Types
export interface SellerAnalytics {
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: Product[];
  salesTrend: DailySale[];
  categoryBreakdown: CategorySale[];
}

export interface DailySale {
  date: string;
  sales: number;
  revenue: number;
  orders: number;
}

export interface CategorySale {
  categoryName: string;
  sales: number;
  percentage: number;
}
