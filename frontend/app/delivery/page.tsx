import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Clock, Shield, MapPin, Truck, CheckCircle } from "lucide-react"

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[oklch(0.65_0.18_45)] to-[oklch(0.55_0.22_10)] text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">FYNZA Delivery</h1>
              <p className="text-xl mb-2">Send parcels easily</p>
              <p className="text-lg opacity-90">
                Welcome to our Delivery Service! No matter how big or small your package is, we'll help you send it
                quickly and safely. Reach over 20,000,000+ customers daily. Get the chance of buyers calling you upon
                getting their package from you.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why people choose Fynza Delivery?</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-lg mb-2">Express Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Fast and reliable delivery service. Your packages arrive on time, every time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-lg mb-2">Nationwide Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  We deliver to all regions. No matter where you are, we've got you covered.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[oklch(0.65_0.18_45)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-[oklch(0.65_0.18_45)]" />
                </div>
                <h3 className="font-bold text-lg mb-2">Reliable Logistics</h3>
                <p className="text-muted-foreground text-sm">
                  Track your package in real-time. Know exactly where your shipment is at all times.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services Section */}
          <div className="bg-muted/30 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Services - Built Around You</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Nationwide Small Delivery</h3>
                <p className="text-muted-foreground mb-4">
                  Send anything in or out of Accra. Best used for cargo that wouldn't need the heavy lifting or renting
                  of a cargo van or truck.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_45)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Most suitable for small to medium-sized items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_45)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Door-to-door delivery service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_45)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Tracking available for all packages</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Interstate/Intercity Shipping</h3>
                <p className="text-muted-foreground mb-4">
                  Sending to other cities or between cities in Ghana? We make it easier to send across the country.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_45)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Coverage across all major cities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_45)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Secure packaging and handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.18_45)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Competitive pricing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Ship Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">How to Ship a Package</h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  icon: Package,
                  title: "Go to the nearest FYNZA pickup point /shop or call our hotline",
                  description: "Visit our location or give us a call to get started with your shipment.",
                },
                {
                  step: "2",
                  icon: MapPin,
                  title: "Drop/Package your Item(s)",
                  description:
                    "The shipping information is automatically generated with real-time location on the system and receipt.",
                },
                {
                  step: "3",
                  icon: Truck,
                  title: "Use Up Your Package Location And Send Real-Time Tracking",
                  description: "Track your package at all times with our real-time tracking system.",
                },
                {
                  step: "4",
                  icon: CheckCircle,
                  title: "Check real-time location of your package with our tracking system",
                  description: "Stay informed about your package location until it reaches its destination.",
                },
              ].map((item) => (
                <Card key={item.step}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[oklch(0.65_0.18_45)] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                      {item.step}
                    </div>
                    <item.icon className="h-8 w-8 text-[oklch(0.65_0.18_45)] mb-3" />
                    <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Delivery Pricing</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[oklch(0.65_0.18_45)] text-white">
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Zone 1</th>
                    <th className="p-3 text-left">Zone 2</th>
                    <th className="p-3 text-left">Zone 3</th>
                    <th className="p-3 text-left">Additional</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { zone: "Zone 1", z1: "10", z2: "15", z3: "20", add: "5" },
                    { zone: "Zone 2", z1: "15", z2: "15", z3: "20", add: "5" },
                    { zone: "Zone 3", z1: "20", z2: "20", z3: "20", add: "10" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="p-3 font-medium">{row.zone}</td>
                      <td className="p-3">GHC {row.z1}</td>
                      <td className="p-3">GHC {row.z2}</td>
                      <td className="p-3">GHC {row.z3}</td>
                      <td className="p-3">GHC {row.z4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              *Prices may vary based on package size and weight. Contact us for exact pricing.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Ship?</h2>
            <p className="text-muted-foreground mb-6">Get started with Fynza Delivery today</p>
            <Button size="lg" className="bg-[oklch(0.65_0.18_45)] hover:bg-[oklch(0.6_0.18_45)]">
              Start Shipping Now
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
