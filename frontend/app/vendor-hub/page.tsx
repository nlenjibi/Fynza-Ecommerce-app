import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Store, BarChart3, Package, Users, Truck, Headphones, ArrowRight, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Store,
    title: "Easy Store Setup",
    description: "Create your online store in minutes with our intuitive dashboard",
  },
  {
    icon: Package,
    title: "Product Management",
    description: "Upload and manage unlimited products with ease",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track sales, inventory, and performance in real-time",
  },
  {
    icon: Truck,
    title: "Logistics Support",
    description: "Integrated delivery solutions across Ghana",
  },
  {
    icon: Users,
    title: "Customer Reach",
    description: "Access millions of active shoppers on our platform",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated vendor support team to help you succeed",
  },
]

const steps = [
  {
    step: "1",
    title: "Create Account",
    description: "Sign up and verify your business credentials",
  },
  {
    step: "2",
    title: "Set Up Store",
    description: "Add your brand, products, and pricing",
  },
  {
    step: "3",
    title: "Start Selling",
    description: "Go live and reach customers across Ghana",
  },
]

export default function VendorHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vendor Hub</h1>
          <p className="text-xl mb-8 opacity-90">
            Grow your business with Ghana's leading e-commerce platform
          </p>
          <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
            Start Selling Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Why Sell on Fynza */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell on Fynza?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg hover:border-orange-500 transition-colors">
                <feature.icon className="w-10 h-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How to Start Selling</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {steps.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="max-w-3xl mx-auto">
            <div className="p-8 border-2 border-orange-500 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Standard Plan</h3>
              <div className="text-4xl font-bold text-orange-500 mb-2">0%</div>
              <p className="text-muted-foreground mb-6">Commission on your first GHS 1,000 in sales</p>
              <ul className="text-left space-y-3 mb-8 max-w-xs mx-auto">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Unlimited products</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Analytics dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Customer support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Payment processing</span>
                </li>
              </ul>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg w-full">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Seller Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg">
              <p className="text-lg mb-4 italic">"Fynza helped me grow my fashion business from a small shop to a nationwide brand."</p>
              <div className="font-semibold">Sarah K.</div>
              <div className="text-orange-500">Fashion Vendor</div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <p className="text-lg mb-4 italic">"The logistics support is amazing. I can focus on my products while Fynza handles delivery."</p>
              <div className="font-semibold">Michael A.</div>
              <div className="text-orange-500">Electronics Vendor</div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <p className="text-lg mb-4 italic">"Best decision I made. My sales increased by 300% in just 3 months."</p>
              <div className="font-semibold">Grace N.</div>
              <div className="text-orange-500">Beauty & Skincare</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Store?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of successful vendors on Fynza
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
            Start Selling
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}