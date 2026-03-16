import { NextRequest, NextResponse } from 'next/server';

// Paystack payment verification endpoint
// This API route verifies payment with the backend which handles the actual Paystack API communication

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get('reference');
        const orderId = searchParams.get('orderId');

        if (!reference) {
            return NextResponse.json(
                { message: 'Payment reference is required' },
                { status: 400 }
            );
        }

        if (!orderId) {
            return NextResponse.json(
                { message: 'Order ID is required' },
                { status: 400 }
            );
        }

        // Call your backend API to verify the payment
        // Replace this URL with your actual backend endpoint
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';

        const backendResponse = await fetch(
            `${backendUrl}/api/payments/paystack/verify?reference=${encodeURIComponent(reference)}&orderId=${encodeURIComponent(orderId)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if required
                    // 'Authorization': `Bearer ${token}`,
                },
            }
        );

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({}));
            return NextResponse.json(
                { message: errorData.message || 'Payment verification failed' },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        // Return the verification result to the frontend
        return NextResponse.json(data);

    } catch (error) {
        console.error('Paystack verification error:', error);
        return NextResponse.json(
            { message: 'Payment verification failed. Please try again.' },
            { status: 500 }
        );
    }
}
