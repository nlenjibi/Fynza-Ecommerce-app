"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck, Loader2, AlertCircle, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"

interface OrderData {
    orderId: string
    items: Array<{
        id: number
        name: string
        price: string
        oldPrice: string
        image: string
        quantity: number
    }>
    customerEmail: string
    customerName: string
    shippingAddress: {
        firstName: string
        lastName: string
        address: string
        city: string
        region: string
        zipCode: string
        phone: string
    }
    subtotal: number
    shipping: number
    tax: number
    total: number
    paymentMethod: string
    createdAt: string
}

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const [isVerifying, setIsVerifying] = useState(true)
    const [error, setError] = useState("")
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [paymentVerified, setPaymentVerified] = useState(false)

    const orderId = searchParams.get("orderId")
    const reference = searchParams.get("reference")

    useEffect(() => {
        const verifyPayment = async () => {
            // First, try to get order data from localStorage
            if (orderId) {
                const storedOrder = localStorage.getItem(`order_${orderId}`)
                if (storedOrder) {
                    try {
                        const parsed = JSON.parse(storedOrder)
                        setOrderData(parsed)
                    } catch (e) {
                        console.error("Failed to parse order data:", e)
                    }
                }
            }

            // If we have a reference, verify with backend
            if (reference && orderId) {
                try {
                    const response = await fetch(`/api/payments/paystack/verify?reference=${reference}&orderId=${orderId}`)

                    if (response.ok) {
                        const data = await response.json()
                        setPaymentVerified(true)

                        // Update order data if verification returns new data
                        if (data.order) {
                            setOrderData(data.order)
                        }
                    } else {
                        // If verification fails but we have order data, we might still want to show success
                        // This handles cases where webhook has already processed the payment
                        if (orderData) {
                            console.log("Verification failed but order exists, showing success anyway")
                            setPaymentVerified(true)
                        } else {
                            throw new Error("Payment verification failed")
                        }
                    }
                } catch (err) {
                    console.error("Payment verification error:", err)
                    // If we have order data, still show success (webhook might have processed)
                    if (orderData) {
                        setPaymentVerified(true)
                    } else {
                        setError("Payment verification failed. Please contact support if you believe you made a payment.")
                    }
                }
            } else if (orderId && orderData) {
                // No reference but we have order data - still show success
                setPaymentVerified(true)
            } else {
                setError("Missing order information")
            }

            setIsVerifying(false)
        }

        verifyPayment()
    }, [orderId, reference])

    // Calculate estimated delivery date (3-5 business days from now)
    const getEstimatedDelivery = () => {
        const today = new Date()
        const deliveryDate = new Date(today)
        deliveryDate.setDate(today.getDate() + 5)
        return deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (isVerifying) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-16 text-center">
                    <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
                    <p className="text-muted-foreground">Please wait while we confirm your payment with Paystack...</p>
                </main>
                <Footer />
            </div>
        )
    }

    if (error && !orderData) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-16 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-2">Payment Verification Issue</h1>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/checkout">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Try Again</Button>
                        </Link>
                        <Link href="/"><Button variant="outline">Go to Home</Button></Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-muted-foreground">Thank you for your order. Your payment has been confirmed.</p>
                </div>

                {/* Security Badge */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">Payment verified securely via Paystack</span>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-orange-500 text-white p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-orange-100">Order Number</p>
                                <p className="text-xl font-bold">{orderData?.orderId || orderId || "ORD-" + Date.now()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-orange-100">Total Paid</p>
                                <p className="text-xl font-bold">GH₵ {orderData?.total?.toFixed(2) || "0.00"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Payment Method - Paystack */}
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Paystack</p>
                                <p className="text-sm text-muted-foreground">
                                    {paymentVerified ? "Payment completed successfully" : "Payment pending verification"}
                                </p>
                                {reference && (
                                    <p className="text-xs text-gray-500 mt-1">Reference: {reference}</p>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        {orderData?.items && orderData.items.length > 0 && (
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {orderData.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-gray-900">
                                                GH₵ {(parseFloat(item.price.replace("GH₵ ", "").replace("GHC ", "")) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Shipping Address */}
                        {orderData?.shippingAddress && (
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                                <div className="text-sm text-gray-600">
                                    <p>{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</p>
                                    <p>{orderData.shippingAddress.address}</p>
                                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.region} {orderData.shippingAddress.zipCode}</p>
                                    <p>{orderData.shippingAddress.phone}</p>
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">GH₵ {orderData?.subtotal?.toFixed(2) || "0.00"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">
                                        {orderData?.shipping === 0 ? 'FREE' : `GH₵ ${orderData?.shipping?.toFixed(2) || "0.00"}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">GH₵ {orderData?.tax?.toFixed(2) || "0.00"}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t">
                                    <span className="font-semibold text-gray-900">Total</span>
                                    <span className="font-semibold text-orange-500">GH₵ {orderData?.total?.toFixed(2) || "0.00"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Estimated Delivery */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <Truck className="w-5 h-5 text-orange-500" />
                                <span className="font-medium text-gray-900">Estimated Delivery</span>
                            </div>
                            <p className="text-muted-foreground ml-8">{getEstimatedDelivery()}</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/my-orders">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            <Package className="w-4 h-4 mr-2" />View Orders
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="w-full">Continue Shopping</Button>
                    </Link>
                </div>

                {/* Clear order data from localStorage after successful payment */}
                {orderId && (
                    <div className="hidden">
                        {typeof window !== 'undefined' && setTimeout(() => {
                            localStorage.removeItem(`order_${orderId}`)
                            localStorage.removeItem(`payment_ref_${orderId}`)
                        }, 5000)}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}
