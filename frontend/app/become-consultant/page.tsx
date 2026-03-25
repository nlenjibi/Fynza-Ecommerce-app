"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Shield, Globe, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { ApplyForm } from "@/components/apply-form"

const benefits = [
  "Earn additional income on your schedule",
  "Access to exclusive training and resources",
  "Join a community of successful consultants",
  "Flexible work arrangements",
  "Performance bonuses and rewards",
  "Career growth opportunities",
]

const requirements = [
  "Minimum 18 years of age",
  "Smartphone with internet access",
  "Good communication skills",
  "Basic understanding of e-commerce",
  "Willingness to learn and grow",
  "Ability to work independently",
]

export default function BecomeConsultantPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading } = useAuth()
  const [showApplyForm, setShowApplyForm] = useState(false)

  useEffect(() => {
    const apply = searchParams.get("apply")
    if (apply === "consultant" && user) {
      setShowApplyForm(true)
    }
  }, [searchParams, user])

  const handleApplyNow = () => {
    if (!user) {
      router.push("/login?redirect=/become-consultant&apply=consultant")
      return
    }
    setShowApplyForm(true)
  }

  if (showApplyForm && user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => setShowApplyForm(false)}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-6"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Consultant Page
          </button>
          <ApplyForm type="consultant" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Fynza Consultant</h1>
          <p className="text-xl mb-8 opacity-90">
            Share products you love and earn commission on every sale
          </p>
          <Button 
            onClick={handleApplyNow}
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
              <p className="text-muted-foreground">
                Create your consultant account and get your unique referral link
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Share</h3>
              <p className="text-muted-foreground">
                Share products with your network through social media, chat, or any platform
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Earn</h3>
              <p className="text-muted-foreground">
                Earn commission on every sale made through your referral link
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Become a Consultant?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 text-sm font-bold">{index + 1}</span>
                </div>
                <span className="font-medium">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-xl">Active Consultants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">GHS 2M+</div>
              <div className="text-xl">Paid in Commissions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">50,000+</div>
              <div className="text-xl">Successful Referrals</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of consultants already earning with Fynza
          </p>
          <Button 
            onClick={handleApplyNow}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
          >
            Become a Consultant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
