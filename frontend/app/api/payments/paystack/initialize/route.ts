import { NextRequest, NextResponse } from 'next/server';

// Paystack initialization endpoint
// This API route acts as a proxy to your backend which handles the actual Paystack integration
// The frontend should NEVER call Paystack directly - all payment processing goes through the backend

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            orderId,
            customerEmail,
            customerName,
            customerPhone,
            amount,
            currency,
            shippingAddress,
            items
        } = body;

        // Validate required fields
        if (!orderId || !customerEmail || !amount) {
            return NextResponse.json(
                { message: 'Missing required fields: orderId, customerEmail, and amount are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return NextResponse.json(
                { message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate amount
        if (amount <= 0) {
            return NextResponse.json(
                { message: 'Amount must be greater than 0' },
                { status: 400 }
            );
        }

        // Call your backend API to initialize the Paystack transaction
        // Replace this URL with your actual backend endpoint
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';

        const backendResponse = await fetch(`${backendUrl}/api/payments/paystack/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if required
                // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                orderId,
                customerEmail,
                customerName,
                customerPhone,
                amount,
                currency: currency || 'GHS',
                shippingAddress,
                items,
                // Callback URLs for Paystack redirect
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/payment-success`,
                cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/payment-cancelled`,
            }),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({}));
            return NextResponse.json(
                { message: errorData.message || 'Failed to initialize payment' },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        // Return the authorization URL to the frontend
        // The frontend will redirect the user to this URL
        return NextResponse.json(data);

    } catch (error) {
        console.error('Paystack initialization error:', error);
        return NextResponse.json(
            { message: 'Payment initialization failed. Please try again.' },
            { status: 500 }
        );
    }
}
