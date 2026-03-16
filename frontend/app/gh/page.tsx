import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

const locations = [
  {
    name: "Fynza Headquarters",
    address: "Accra, Ghana",
    phone: "+233 30 274 0642",
    email: "info@fynza.com",
    hours: "Mon-Fri: 8AM - 6PM",
  },
  {
    name: "Kumasi Office",
    address: "Kumasi, Ashanti Region",
    phone: "+233 32 202 1234",
    email: "kumasi@fynza.com",
    hours: "Mon-Fri: 9AM - 5PM",
  },
  {
    name: "Takoradi Office",
    address: "Takoradi, Western Region",
    phone: "+233 31 202 5678",
    email: "takoradi@fynza.com",
    hours: "Mon-Fri: 9AM - 5PM",
  },
]

const services = [
  "Customer Support",
  "Vendor Support",
  "Delivery Services",
  "Partnership Inquiries",
  "Media & Press",
  "Careers",
]

export default function GhanaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fynza Ghana</h1>
          <p className="text-xl mb-8 opacity-90">
            Your Market. Your Way. Serving customers across Ghana
          </p>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6" />
            <span className="text-lg">Accra, Ghana</span>
          </div>
        </div>
      </section>

      {/* About Ghana */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Fynza in Ghana</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fynza is Ghana's leading e-commerce platform, connecting millions of shoppers with 
              thousands of vendors across the country. From electronics to fashion, groceries to 
              home essentials - we make shopping easy, affordable, and reliable for all Ghanaians.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">2M+</div>
                <div className="text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">50K+</div>
                <div className="text-muted-foreground">Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">100K+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">16</div>
                <div className="text-muted-foreground">Regions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Locations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-orange-500 mt-0.5" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-orange-500 mt-0.5" />
                    <span>{location.email}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                    <span>{location.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg text-center hover:border-orange-500 transition-colors">
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500">
                  <option>Select a subject</option>
                  <option>Customer Support</option>
                  <option>Vendor Support</option>
                  <option>Partnership</option>
                  <option>Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500 h-32"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Follow Us</h2>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}