import { UserRole, UserStatus } from './api';

// User/Auth Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  sellerId?: string;
  exp: number;
  iat: number;
  scope?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Auth Request/Response Types
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'CUSTOMER' | 'SELLER';
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
  verificationEmailSent: boolean;
}

export interface OAuthCallback {
  provider: 'google' | 'facebook' | 'apple';
  code: string;
  redirectUri: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SellerProfile extends User {
  storeName: string;
  storeDescription?: string;
  storeLogoUrl?: string;
  storeBannerUrl?: string;
  businessType?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';
  rating: number;
  totalReviews: number;
  bankAccountHolder?: string;
  upiId?: string;
  totalProducts: number;
  totalSales: number;
  averageDeliveryDays?: number;
  cancellationRate?: number;
  returnRate?: number;
  isFeatured: boolean;
}

export interface CustomerProfile extends User {
  defaultAddressId?: string;
  totalOrders: number;
  totalSpent: number;
  wishlistCount: number;
  loyaltyPoints: number;
}
