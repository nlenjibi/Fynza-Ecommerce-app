"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, CreditCard, ShieldAlert, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentCancelledPage() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="max-w-lg mx-auto text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
                    <p className="text-muted-foreground mb-2">
                        Your Paystack payment was cancelled. No charges have been made to your account.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        You may have closed the payment window or clicked the back button during the payment process.
                    </p>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="font-semibold mb-4">What would you like to do?</h2>

                        {/* Retry Paystack Payment */}
                        {orderId && (
                            <Link href={`/checkout?retry=${orderId}`} className="block mb-3">
                                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Paystack Payment Again
                                </Button>
                            </Link>
                        )}

                        {/* Go to Checkout */}
                        <Link href="/checkout" className="block mb-3">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Checkout
                            </Button>
                        </Link>

                        {/* Choose Another Payment Method */}
                        <Link href="/checkout" className="block mb-3">
                            <Button variant="outline" className="w-full">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Choose Another Payment Method
                            </Button>
                        </Link>

                        {/* Continue Shopping */}
                        <Link href="/" className="block">
                            <Button variant="ghost" className="w-full">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="text-left">
                                <p className="font-medium text-blue-900">Need help?</p>
                                <p className="text-sm text-blue-700 mt-1">
                                    If you experienced any issues during payment, you can try again or contact our support team for assistance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>
                            Need assistance? <Link href="/contact" className="text-orange-500 hover:underline font-medium">Contact Support</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
