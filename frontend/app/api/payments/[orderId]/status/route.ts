import { NextRequest, NextResponse } from 'next/server';

// Payment status endpoint
// Returns the current status of a payment for a given order

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await params;

        if (!orderId) {
            return NextResponse.json(
                { message: 'Order ID is required' },
                { status: 400 }
            );
        }

        // Call your backend API to get the payment status
        // Replace this URL with your actual backend endpoint
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';

        const backendResponse = await fetch(
            `${backendUrl}/api/payments/${encodeURIComponent(orderId)}/status`,
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
                { message: errorData.message || 'Failed to get payment status' },
                { status: backendResponse.status }
            );
        }

        const data = await backendResponse.json();

        // Return the payment status to the frontend
        // Expected statuses: PENDING, SUCCESS, FAILED, ABANDONED, REFUNDED
        return NextResponse.json(data);

    } catch (error) {
        console.error('Payment status error:', error);
        return NextResponse.json(
            { message: 'Failed to get payment status. Please try again.' },
            { status: 500 }
        );
    }
}
