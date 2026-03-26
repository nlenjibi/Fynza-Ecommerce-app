# Fynza E-Commerce Platform - User Stories

**Version:** 1.0  
**Last Updated:** 2026-03-25

---

## Introduction

This document contains user stories for the Fynza E-Commerce platform, organized by:
- **Category**: Backend / Frontend
- **Status**: Completed / In Progress / Pending
- **Priority**: High / Medium / Low
- **Story Points**: Fibonacci sequence (1, 2, 3, 5, 8, 13, 21)
- **Level**: Epic / Feature / Task

---

# PART 1: BACKEND USER STORIES

## ✅ COMPLETED STORIES

### 1. Authentication & Security

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-AUTH-001 | As a user, I want to register an account with email and password so that I can access the platform | 5 | High | Feature | ✅ Complete |
| BE-AUTH-002 | As a user, I want to log in with email/password so that I can access my account | 3 | High | Feature | ✅ Complete |
| BE-AUTH-003 | As a user, I want to log in with Google/GitHub OAuth so that I can sign in quickly | 5 | High | Feature | ✅ Complete |
| BE-AUTH-004 | As a user, I want to receive a new access token using refresh token so that I stay logged in | 3 | High | Feature | ✅ Complete |
| BE-AUTH-005 | As a user, I want to log out and invalidate my token so that my session is secure | 2 | High | Feature | ✅ Complete |
| BE-AUTH-006 | As a user, I want to enable 2FA so that my account is more secure | 8 | Medium | Feature | ✅ Complete |
| BE-AUTH-007 | As a user, I want my password to be securely hashed so that my credentials are protected | 2 | High | Task | ✅ Complete |
| BE-AUTH-008 | As a user, I want to be locked out after 5 failed login attempts so that my account is protected | 3 | High | Feature | ✅ Complete |
| BE-AUTH-009 | As an admin, I want to assign roles to users so that I can control access | 5 | High | Feature | ✅ Complete |
| BE-AUTH-010 | As a system, I want to log security events so that I can monitor suspicious activity | 3 | Medium | Task | ✅ Complete |

### 2. User Management

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-USER-001 | As a user, I want to view and edit my profile so that my information is up to date | 3 | High | Feature | ✅ Complete |
| BE-USER-002 | As a user, I want to add multiple shipping addresses so that I can ship to different locations | 5 | High | Feature | ✅ Complete |
| BE-USER-003 | As a user, I want to change my password so that my account remains secure | 2 | High | Feature | ✅ Complete |
| BE-USER-004 | As an admin, I want to search for users so that I can manage them | 3 | Medium | Feature | ✅ Complete |

### 3. Product Management

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-PROD-001 | As a seller, I want to create a product so that I can sell it | 5 | High | Feature | ✅ Complete |
| BE-PROD-002 | As a seller, I want to update product details so that my listing is accurate | 3 | High | Feature | ✅ Complete |
| BE-PROD-003 | As a seller, I want to delete a product so that it's no longer available | 2 | High | Feature | ✅ Complete |
| BE-PROD-004 | As a customer, I want to browse products so that I can find what I need | 5 | High | Feature | ✅ Complete |
| BE-PROD-005 | As a customer, I want to search products by keyword so that I can find specific items | 8 | High | Feature | ✅ Complete |
| BE-PROD-006 | As a customer, I want to filter products by category so that I can narrow my search | 5 | High | Feature | ✅ Complete |
| BE-PROD-007 | As a seller, I want to add product images so that customers can see my products | 3 | High | Feature | ✅ Complete |
| BE-PROD-008 | As a customer, I want to view product reviews so that I can make informed decisions | 3 | Medium | Feature | ✅ Complete |
| BE-PROD-009 | As a customer, I want to write a product review so that I can share my experience | 3 | Medium | Feature | ✅ Complete |

### 4. Shopping Cart

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-CART-001 | As a customer, I want to add products to cart so that I can purchase them | 5 | High | Feature | ✅ Complete |
| BE-CART-002 | As a customer, I want to update cart item quantities so that I can adjust my order | 3 | High | Feature | ✅ Complete |
| BE-CART-003 | As a customer, I want to remove items from cart so that I can modify my order | 2 | High | Feature | ✅ Complete |
| BE-CART-004 | As a system, I want to reserve stock for 15 minutes so that items don't oversell | 5 | High | Feature | ✅ Complete |
| BE-CART-005 | As a customer, I want my cart to persist so that I can return later | 3 | Medium | Feature | ✅ Complete |

### 5. Order Management

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-ORDER-001 | As a customer, I want to place an order so that I can purchase items | 8 | High | Feature | ✅ Complete |
| BE-ORDER-002 | As a customer, I want to view my order history so that I can track past purchases | 5 | High | Feature | ✅ Complete |
| BE-ORDER-003 | As a customer, I want to view order status so that I know when it will arrive | 3 | High | Feature | ✅ Complete |
| BE-ORDER-004 | As a customer, I want to cancel an order so that I can change my mind | 5 | High | Feature | ✅ Complete |
| BE-ORDER-005 | As a seller, I want to view incoming orders so that I can fulfill them | 3 | High | Feature | ✅ Complete |
| BE-ORDER-006 | As an admin, I want to view all orders so that I can oversee the platform | 5 | Medium | Feature | ✅ Complete |

### 6. Wishlist

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-WISH-001 | As a customer, I want to add products to wishlist so that I can save for later | 3 | High | Feature | ✅ Complete |
| BE-WISH-002 | As a customer, I want to view my wishlist so that I can see saved items | 2 | High | Feature | ✅ Complete |
| BE-WISH-003 | As a customer, I want to remove items from wishlist so that I can manage my list | 2 | High | Feature | ✅ Complete |
| BE-WISH-004 | As a customer, I want to share my wishlist so that others can see it | 3 | Medium | Feature | ✅ Complete |
| BE-WISH-005 | As a customer, I want to receive price drop notifications so that I can buy at better prices | 5 | Medium | Feature | ✅ Complete |

### 7. Follow System

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-FOLLOW-001 | As a customer, I want to follow a seller so that I can see their new products | 3 | Medium | Feature | ✅ Complete |
| BE-FOLLOW-002 | As a customer, I want to unfollow a seller so that I stop seeing their updates | 2 | Medium | Feature | ✅ Complete |
| BE-FOLLOW-003 | As a seller, I want to see my follower count so that I know my popularity | 2 | Low | Feature | ✅ Complete |

### 8. Messaging

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-MSG-001 | As a customer, I want to send a message to a seller so that I can ask questions | 3 | Medium | Feature | ✅ Complete |
| BE-MSG-002 | As a seller, I want to reply to customer messages so that I can provide support | 3 | Medium | Feature | ✅ Complete |
| BE-MSG-003 | As an admin, I want to view all conversations so that I can moderate | 3 | Medium | Feature | ✅ Complete |

### 9. Coupons

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-COUP-001 | As a seller, I want to create a coupon so that I can offer discounts | 5 | High | Feature | ✅ Complete |
| BE-COUP-002 | As a customer, I want to apply a coupon at checkout so that I get a discount | 3 | High | Feature | ✅ Complete |
| BE-COUP-003 | As a system, I want to validate coupon usage so that limits are enforced | 3 | High | Feature | ✅ Complete |

### 10. Admin Panel

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-ADMIN-001 | As an admin, I want to view platform analytics so that I can make decisions | 8 | High | Feature | ✅ Complete |
| BE-ADMIN-002 | As an admin, I want to manage users so that I can control the platform | 5 | High | Feature | ✅ Complete |
| BE-ADMIN-003 | As an admin, I want to manage products globally so that I can moderate content | 5 | High | Feature | ✅ Complete |
| BE-ADMIN-004 | As an admin, I want to view system performance metrics so that I can monitor health | 8 | Medium | Feature | ✅ Complete |
| BE-ADMIN-005 | As an admin, I want to generate reports so that I can analyze data | 13 | Medium | Feature | ✅ Complete |

### 11. API Infrastructure

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-API-001 | As a developer, I want REST API documentation so that I can integrate properly | 3 | High | Feature | ✅ Complete |
| BE-API-002 | As a developer, I want GraphQL queries so that I can get nested data | 8 | Medium | Feature | ✅ Complete |
| BE-API-003 | As a developer, I want standardized error responses so that I can handle errors | 2 | Medium | Task | ✅ Complete |
| BE-API-004 | As a developer, I want paginated responses so that I can handle large datasets | 3 | Medium | Task | ✅ Complete |

---

## 🔨 IN PROGRESS STORIES

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-SET-001 | As an admin, I want to configure site settings so that I can customize the platform | 5 | High | Feature | 🔨 In Progress |
| BE-SET-002 | As an admin, I want to manage social media links so that I can connect my channels | 3 | Medium | Feature | 🔨 In Progress |
| BE-SET-003 | As a customer, I want to submit a contact message so that I can get support | 3 | High | Feature | 🔨 In Progress |
| BE-GQL-001 | As a developer, I want advanced GraphQL filtering so that I can query complex data | 8 | Medium | Feature | 🔨 In Progress |
| BE-GQL-002 | As a developer, I want GraphQL mutations for writes so that I can update data via GraphQL | 5 | Medium | Feature | 🔨 In Progress |

---

## ❌ PENDING STORIES

### High Priority

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-PAY-001 | As a customer, I want to pay with credit card so that I can complete my purchase | 13 | High | Epic | ❌ Pending |
| BE-PAY-002 | As a customer, I want to pay with PayPal so that I can complete my purchase | 8 | High | Feature | ❌ Pending |
| BE-SHIP-001 | As a seller, I want to integrate shipping API so that I can provide tracking | 13 | High | Epic | ❌ Pending |
| BE-NOTIF-001 | As a user, I want to receive email notifications so that I stay informed | 8 | High | Feature | ❌ Pending |
| BE-NOTIF-002 | As a user, I want to receive SMS notifications so that I stay informed | 5 | High | Feature | ❌ Pending |
| BE-REFUND-001 | As a customer, I want to request a refund so that I can get my money back | 8 | High | Feature | ❌ Pending |
| BE-INV-001 | As a system, I want to generate PDF invoices so that users have documentation | 5 | High | Feature | ❌ Pending |

### Medium Priority

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-GQL-003 | As a developer, I want GraphQL subscriptions so that I can get real-time updates | 13 | Medium | Feature | ❌ Pending |
| BE-WS-001 | As a user, I want real-time notifications so that I stay updated | 8 | Medium | Epic | ❌ Pending |
| BE-SEARCH-001 | As a customer, I want advanced search filters so that I can find exactly what I need | 5 | Medium | Feature | ❌ Pending |
| BE-ANALYTICS-001 | As a seller, I want detailed analytics dashboard so that I can track performance | 8 | Medium | Feature | ❌ Pending |
| BE-I18N-001 | As a user, I want to switch language so that I can use the app in my language | 13 | Medium | Epic | ❌ Pending |
| BE-SKU-001 | As a seller, I want to manage SKU variants so that I can track inventory | 5 | Medium | Feature | ❌ Pending |

### Lower Priority

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| BE-AI-001 | As a customer, I want AI product recommendations so that I discover new products | 21 | Low | Epic | ❌ Pending |
| BE-SOCIAL-001 | As a customer, I want to share products on social media so that I can recommend to friends | 5 | Low | Feature | ❌ Pending |
| BE-MOBILE-001 | As a mobile developer, I want API endpoints for mobile so that I can build an app | 13 | Low | Epic | ❌ Pending |
| BE-AFF-001 | As an admin, I want an affiliate system so that I can track commissions | 13 | Low | Epic | ❌ Pending |
| BE-LOYALTY-001 | As a customer, I want loyalty points so that I can earn rewards | 13 | Low | Epic | ❌ Pending |

---

# PART 2: FRONTEND USER STORIES

## ✅ COMPLETED STORIES

### 1. Core Pages

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-HOME-001 | As a customer, I want to view the home page so that I can see featured products | 5 | High | Feature | ✅ Complete |
| FE-HOME-002 | As a customer, I want to browse product categories so that I can shop by type | 3 | High | Feature | ✅ Complete |
| FE-SEARCH-001 | As a customer, I want to search for products so that I can find what I need | 5 | High | Feature | ✅ Complete |
| FE-SEARCH-002 | As a customer, I want to filter search results so that I can narrow options | 5 | High | Feature | ✅ Complete |
| FE-SEARCH-003 | As a customer, I want to sort search results so that I can find best matches | 3 | High | Feature | ✅ Complete |
| FE-PROD-001 | As a customer, I want to view product details so that I can make a purchase decision | 5 | High | Feature | ✅ Complete |
| FE-CART-001 | As a customer, I want to view my cart so that I can see what I'm buying | 3 | High | Feature | ✅ Complete |
| FE-CHECK-001 | As a customer, I want to complete checkout so that I can place my order | 8 | High | Feature | ✅ Complete |
| FE-FLASH-001 | As a customer, I want to view flash sales so that I can get deals | 5 | Medium | Feature | ✅ Complete |

### 2. Customer Dashboard

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-CUST-001 | As a customer, I want to view my dashboard so that I can see my account overview | 3 | High | Feature | ✅ Complete |
| FE-CUST-002 | As a customer, I want to view my order history so that I can track past purchases | 5 | High | Feature | ✅ Complete |
| FE-CUST-003 | As a customer, I want to view my wishlist so that I can see saved items | 3 | High | Feature | ✅ Complete |
| FE-CUST-004 | As a customer, I want to edit my profile so that my information is current | 3 | High | Feature | ✅ Complete |
| FE-CUST-005 | As a customer, I want to manage addresses so that I can ship to multiple places | 5 | High | Feature | ✅ Complete |
| FE-CUST-006 | As a customer, I want to configure notification preferences so that I control alerts | 3 | Medium | Feature | ✅ Complete |
| FE-CUST-007 | As a customer, I want to add payment methods so that I can check out faster | 5 | High | Feature | ✅ Complete |
| FE-CUST-008 | As a customer, I want to enable 2FA so that my account is more secure | 5 | Medium | Feature | ✅ Complete |
| FE-CUST-009 | As a customer, I want to change my password so that my account stays secure | 2 | High | Feature | ✅ Complete |
| FE-CUST-010 | As a customer, I want to view followed sellers so that I can see their new products | 3 | Medium | Feature | ✅ Complete |
| FE-CUST-011 | As a customer, I want to send messages so that I can contact sellers | 3 | Medium | Feature | ✅ Complete |

### 3. Seller Dashboard

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-SELL-001 | As a seller, I want to view my dashboard so that I can see my store overview | 5 | High | Feature | ✅ Complete |
| FE-SELL-002 | As a seller, I want to manage my products so that I can keep my inventory updated | 8 | High | Feature | ✅ Complete |
| FE-SELL-003 | As a seller, I want to view incoming orders so that I can fulfill them | 5 | High | Feature | ✅ Complete |
| FE-SELL-004 | As a seller, I want to view analytics so that I can track my performance | 8 | High | Feature | ✅ Complete |
| FE-SELL-005 | As a seller, I want to create coupons so that I can offer discounts | 5 | High | Feature | ✅ Complete |
| FE-SELL-006 | As a seller, I want to manage flash sales so that I can run promotions | 5 | Medium | Feature | ✅ Complete |
| FE-SELL-007 | As a seller, I want to tag products so that I can organize my inventory | 3 | Medium | Feature | ✅ Complete |
| FE-SELL-008 | As a seller, I want to view and respond to reviews so that I can improve my store | 3 | Medium | Feature | ✅ Complete |
| FE-SELL-009 | As a seller, I want to view my customers so that I can understand my audience | 3 | Low | Feature | ✅ Complete |
| FE-SELL-010 | As a seller, I want to view my followers so that I can see who supports me | 2 | Low | Feature | ✅ Complete |
| FE-SELL-011 | As a seller, I want to manage messages so that I can communicate with customers | 5 | Medium | Feature | ✅ Complete |
| FE-SELL-012 | As a seller, I want to create promotions so that I can market my products | 5 | Medium | Feature | ✅ Complete |
| FE-SELL-013 | As a seller, I want to manage refund requests so that I can process returns | 5 | High | Feature | ✅ Complete |
| FE-SELL-014 | As a seller, I want to view reports so that I can analyze my business | 8 | Medium | Feature | ✅ Complete |
| FE-SELL-015 | As a seller, I want to configure store settings so that I can customize my store | 5 | Medium | Feature | ✅ Complete |
| FE-SELL-016 | As a seller, I want to manage notifications so that I stay informed | 3 | Low | Feature | ✅ Complete |

### 4. Admin Panel

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-ADMIN-001 | As an admin, I want to view the admin dashboard so that I can see platform overview | 5 | High | Feature | ✅ Complete |
| FE-ADMIN-002 | As an admin, I want to manage products so that I can moderate content | 5 | High | Feature | ✅ Complete |
| FE-ADMIN-003 | As an admin, I want to manage orders so that I can oversee transactions | 5 | High | Feature | ✅ Complete |
| FE-ADMIN-004 | As an admin, I want to manage sellers so that I can control who sells on the platform | 5 | High | Feature | ✅ Complete |
| FE-ADMIN-005 | As an admin, I want to manage customers so that I can view user activity | 3 | Medium | Feature | ✅ Complete |
| FE-ADMIN-006 | As an admin, I want to manage reviews so that I can moderate content | 3 | Medium | Feature | ✅ Complete |
| FE-ADMIN-007 | As an admin, I want to manage tags so that I can organize content | 2 | Low | Feature | ✅ Complete |
| FE-ADMIN-008 | As an admin, I want to manage subscribers so that I can grow my newsletter | 2 | Low | Feature | ✅ Complete |
| FE-ADMIN-009 | As an admin, I want to manage messages so that I can respond to inquiries | 3 | Medium | Feature | ✅ Complete |
| FE-ADMIN-010 | As an admin, I want to send notifications so that I can communicate with users | 3 | Medium | Feature | ✅ Complete |
| FE-ADMIN-011 | As an admin, I want to manage flash sales so that I can run platform-wide promotions | 3 | Medium | Feature | ✅ Complete |
| FE-ADMIN-012 | As an admin, I want to manage FAQs so that I can provide help content | 3 | Medium | Feature | ✅ Complete |
| FE-ADMIN-013 | As an admin, I want to configure settings so that I can customize the platform | 5 | Medium | Feature | ✅ Complete |
| FE-ADMIN-014 | As an admin, I want to track orders so that I can monitor shipping | 3 | Medium | Feature | ✅ Complete |

### 5. Help Center

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-HELP-001 | As a user, I want to view the help center so that I can find answers | 3 | Medium | Feature | ✅ Complete |
| FE-HELP-002 | As a user, I want to view return policy so that I understand returns | 2 | Medium | Feature | ✅ Complete |
| FE-HELP-003 | As a user, I want to track my order so that I know when it will arrive | 3 | High | Feature | ✅ Complete |
| FE-HELP-004 | As a user, I want to view payment methods so that I know what I can use | 2 | Medium | Feature | ✅ Complete |
| FE-HELP-005 | As a user, I want to view delivery information so that I know shipping details | 2 | Medium | Feature | ✅ Complete |

### 6. Authentication

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-AUTH-001 | As a user, I want to log in so that I can access my account | 3 | High | Feature | ✅ Complete |
| FE-AUTH-002 | As a user, I want to sign up so that I can create an account | 5 | High | Feature | ✅ Complete |
| FE-AUTH-003 | As a user, I want to log in with Google so that I can sign in quickly | 5 | High | Feature | ✅ Complete |
| FE-AUTH-004 | As a user, I want to log in with GitHub so that I can sign in quickly | 5 | High | Feature | ✅ Complete |
| FE-AUTH-005 | As a user, I want to reset my password so that I can recover my account | 3 | High | Feature | ✅ Complete |
| FE-AUTH-006 | As a user, I want to set up 2FA so that my account is more secure | 5 | Medium | Feature | ✅ Complete |

### 7. Components

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-COMP-001 | As a user, I want to navigate using the header so that I can access different sections | 3 | High | Feature | ✅ Complete |
| FE-COMP-002 | As a user, I want to view the footer so that I can access additional links | 2 | Low | Feature | ✅ Complete |
| FE-COMP-003 | As a user, I want to view products in a grid so that I can browse easily | 3 | High | Feature | ✅ Complete |
| FE-COMP-004 | As a user, I want to use filters so that I can narrow product options | 5 | High | Feature | ✅ Complete |
| FE-COMP-005 | As a user, I want to search for products so that I can find what I need | 3 | High | Feature | ✅ Complete |
| FE-COMP-006 | As a user, I want to use the mega menu so that I can browse categories | 3 | Medium | Feature | ✅ Complete |

---

## 🔨 IN PROGRESS STORIES

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-API-001 | As a user, I want the frontend to connect to backend APIs so that data is dynamic | 13 | High | Epic | 🔨 In Progress |
| FE-API-002 | As a user, I want JWT authentication integrated so that I can log in properly | 8 | High | Feature | 🔨 In Progress |
| FE-REAL-001 | As a user, I want real-time updates so that I see new data without refreshing | 8 | Medium | Feature | 🔨 In Progress |
| FE-LOAD-001 | As a user, I want loading states displayed so that I know data is being fetched | 3 | Medium | Task | 🔨 In Progress |
| FE-ERR-001 | As a user, I want error handling so that I can see when something goes wrong | 3 | Medium | Task | 🔨 In Progress |
| FE-RESP-001 | As a user, I want a responsive mobile experience so that I can shop on my phone | 5 | Medium | Feature | 🔨 In Progress |

---

## ❌ PENDING STORIES

### High Priority

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-PAY-001 | As a customer, I want to see payment gateway UI so that I can enter payment details | 8 | High | Feature | ❌ Pending |
| FE-PAY-002 | As a customer, I want to see Stripe checkout so that I can pay with card | 5 | High | Feature | ❌ Pending |
| FE-PAY-003 | As a customer, I want to see PayPal checkout so that I can pay with PayPal | 5 | High | Feature | ❌ Pending |
| FE-TRACK-001 | As a customer, I want real-time order tracking so that I know where my order is | 8 | High | Feature | ❌ Pending |
| FE-SELL-ANA-001 | As a seller, I want detailed analytics charts so that I can visualize my performance | 8 | High | Feature | ❌ Pending |
| FE-ADMIN-REP-001 | As an admin, I want report visualizations so that I can analyze data easily | 8 | High | Feature | ❌ Pending |

### Medium Priority

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-NOTIF-001 | As a user, I want browser push notifications so that I get alerts even when offline | 8 | Medium | Feature | ❌ Pending |
| FE-CHAT-001 | As a user, I want real-time chat so that I can communicate instantly | 13 | Medium | Epic | ❌ Pending |
| FE-FILTER-001 | As a customer, I want more advanced filters so that I can find exactly what I need | 5 | Medium | Feature | ❌ Pending |
| FE-COMPARE-001 | As a customer, I want to compare products so that I can make better decisions | 8 | Medium | Feature | ❌ Pending |
| FE-GALLERY-001 | As a customer, I want an image gallery for products so that I can see all angles | 5 | Medium | Feature | ❌ Pending |
| FE-VIDEO-001 | As a seller, I want to add product videos so that I can show products in action | 5 | Medium | Feature | ❌ Pending |

### Lower Priority

| ID | User Story | Points | Priority | Level | Status |
|----|------------|--------|----------|-------|--------|
| FE-SHARE-001 | As a customer, I want to share products on social media so that I can recommend to friends | 3 | Low | Feature | ❌ Pending |
| FE-LIVECHAT-001 | As a customer, I want live chat support so that I can get help instantly | 13 | Low | Epic | ❌ Pending |
| FE-AR-001 | As a customer, I want AR product preview so that I can see how products look in real life | 21 | Low | Epic | ❌ Pending |
| FE-PWA-001 | As a user, I want to install as PWA so that I can use it like a native app | 13 | Low | Epic | ❌ Pending |
| FE-DARK-001 | As a user, I want dark mode so that I can switch themes | 5 | Low | Feature | ❌ Pending |
| FE-I18N-001 | As a user, I want to switch language so that I can use the app in my language | 13 | Low | Epic | ❌ Pending |

---

# SUMMARY

## Backend Story Points Summary

| Status | Count | Total Points |
|--------|-------|--------------|
| Completed | 56 | 234 |
| In Progress | 5 | 28 |
| Pending High | 7 | 52 |
| Pending Medium | 6 | 52 |
| Pending Low | 5 | 65 |
| **TOTAL** | **79** | **431** |

## Frontend Story Points Summary

| Status | Count | Total Points |
|--------|-------|--------------|
| Completed | 61 | 205 |
| In Progress | 6 | 40 |
| Pending High | 6 | 38 |
| Pending Medium | 6 | 45 |
| Pending Low | 6 | 57 |
| **TOTAL** | **85** | **385** |

## Grand Total

| Category | Stories | Points |
|----------|---------|--------|
| Backend | 79 | 431 |
| Frontend | 85 | 385 |
| **TOTAL** | **164** | **816** |

---

**Status:** Active Development  
**Last Updated:** March 25, 2026