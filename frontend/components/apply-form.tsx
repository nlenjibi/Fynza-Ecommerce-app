"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Store, Users, Loader2 } from "lucide-react"

interface ApplyFormProps {
  type: "seller" | "consultant"
}

export function ApplyForm({ type }: ApplyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    storeName: "",
    businessType: "",
    description: "",
    phone: "",
    idNumber: "",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store application in localStorage (in real app, send to backend)
    const applications = JSON.parse(localStorage.getItem("fynza_applications") || "[]")
    applications.push({
      ...formData,
      id: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      status: "pending",
      submittedAt: new Date().toISOString(),
    })
    localStorage.setItem("fynza_applications", JSON.stringify(applications))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your {type === "seller" ? "seller" : "consultant"} application has been received and is pending approval.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 text-left space-y-1">
                <li>• Our team will review your application within 24-48 hours</li>
                <li>• You will receive an SMS notification once approved</li>
                <li>• You will also receive an email with your approval status</li>
                <li>• Once approved, you can start {type === "seller" ? "selling" : "earning"} on Fynza</li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push("/")} variant="outline">
                Back to Home
              </Button>
              <Button onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              {type === "seller" ? (
                <Store className="w-6 h-6 text-orange-600" />
              ) : (
                <Users className="w-6 h-6 text-orange-600" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Apply as {type === "seller" ? "Seller" : "Consultant"}
              </h2>
              <p className="text-gray-600">Fill in your details to get started</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">
                  {type === "seller" ? "Store Name" : "Business Name"}
                </Label>
                <Input
                  id="storeName"
                  name="storeName"
                  placeholder={type === "seller" ? "e.g., TechZone Ghana" : "e.g., John's Consulting"}
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  name="businessType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="individual">Individual / Sole Proprietor</option>
                  <option value="company">Registered Company</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., +233 50 123 4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number (Ghana Card / Passport)</Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Full address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {type === "seller" ? "What will you sell?" : "Brief description of your services"}
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder={type === "seller" ? "e.g., Electronics, Fashion, Home goods..." : "Describe your consulting services..."}
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> After submitting, our team will review your application within 24-48 hours. 
                You will receive an SMS and email notification once approved.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                `Submit ${type === "seller" ? "Seller" : "Consultant"} Application`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
