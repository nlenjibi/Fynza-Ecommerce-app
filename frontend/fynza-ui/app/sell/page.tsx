import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Shield, Gift, BarChart3, Headphones } from "lucide-react"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.65_0.18_45)] to-[oklch(0.55_0.22_10)] opacity-90" />
          <div className="relative container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">MAKE MONEY</h1>
              <p className="text-2xl mb-6">Sell To Over 20,000,000+ Customers</p>
              <Button size="lg" className="bg-white text-[oklch(0.65_0.18_45)] hover:bg-white/90 text-lg h-14 px-8">
                Start Selling On Fynza
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[oklch(0.65_0.18_45)] mb-2">20M+</div>
                <div className="text-muted-foreground">Active Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[oklch(0.65_0.18_45)] mb-2">50K+</div>
                <div className="text-muted-foreground">Successful Sellers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[oklch(0.65_0.18_45)] mb-2">500K+</div>
                <div className="text-muted-foreground">Orders Daily</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Sell Section */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell On Fynza</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-xl mb-3">CONNECT WITH MILLIONS OF BUYERS ONLINE</h3>
                <p className="text-muted-foreground">
                  Reach Millions Of Customers from all over Ghana. Over 500,000 Customers Visit Our Website Daily. Get
                  the chance of buyers calling you for more details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-xl mb-3">SELL MORE PRODUCTS</h3>
                <p className="text-muted-foreground">
                  With a user base that keeps growing, you can target everyone from our platform. Upload as many
                  products as you wish with no extra charges.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-xl mb-3">TOP-NOTCH SELLER SUPPORT</h3>
                <p className="text-muted-foreground">
                  Get professional seller support to help you reach an ever-growing customer base. We're here to help
                  you succeed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-xl mb-3">EXPERT PRODUCT DELIVERY</h3>
                <p className="text-muted-foreground">
                  No need to worry about logistics - we handle shipping and delivery. Focus on what you do best: selling
                  great products.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-xl mb-3">IMPROVE REVENUE</h3>
                <p className="text-muted-foreground">
                  Watch your business grow with detailed analytics. Track your sales, understand your customers, and
                  optimize your offerings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mb-4">
                  <Headphones className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-xl mb-3">FREE ONLINE/OFFLINE TRAINING</h3>
                <p className="text-muted-foreground">
                  Get access to free training sessions to help you become a better seller. Learn best practices and grow
                  your business.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How it Works */}
          <div className="bg-muted/30 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">HOW IT WORKS</h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Register Under 5 Minutes</h3>
                <p className="text-sm text-muted-foreground">
                  All you need is your ID, Phone Number and at least one sample of your product image. You're ready to
                  sell.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Become an E-commerce Expert</h3>
                <p className="text-sm text-muted-foreground">
                  Sign Up For Scheduled Online or Offline Trainings in a Fynza Office Nationwide. Learn from experts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">List Up Your Products And Set Your Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Create The Best Picture, Description Of Your product and watch them sell like crazy. Set competitive
                  prices.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Receive Payment From Our Promotions and Agents</h3>
                <p className="text-sm text-muted-foreground">
                  Sit Back, Relax and watch the magic of sales roll in through your inbox. Get paid on time.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">TESTIMONIALS</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic mb-4">
                    "Fynza Has Done Very Well For Our Business So Far And We Are Still Encouraged To Start New Business
                    Ventures And Products On The Platform."
                  </p>
                  <p className="font-semibold">Tayana Gouda - AC Limited</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic mb-4">
                    "Our Journey With Fynza Started Over 3 Years Ago And Though It Was Initially Rocky, We Have
                    Persevered And Been Able To Steady The Ship. The Experience Has Been Thoroughly Enjoyable And
                    Positive."
                  </p>
                  <p className="font-semibold">Joseph Quafe - My Gadget World</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[oklch(0.65_0.18_45)] to-[oklch(0.55_0.22_10)] text-white rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to start selling?</h2>
            <p className="text-xl mb-8">Join thousands of successful sellers on Fynza</p>
            <Button size="lg" className="bg-white text-[oklch(0.65_0.18_45)] hover:bg-white/90 text-lg h-14 px-8">
              Start Selling On Fynza
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
