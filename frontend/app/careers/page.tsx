import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

const jobs = [
  {
    title: "Software Engineer",
    department: "Engineering",
    location: "Accra, Ghana",
    type: "Full-time",
    description: "Build and maintain our e-commerce platform",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Accra, Ghana",
    type: "Full-time",
    description: "Lead marketing campaigns and brand initiatives",
  },
  {
    title: "Customer Service Representative",
    department: "Customer Support",
    location: "Accra, Ghana",
    type: "Full-time",
    description: "Provide excellent support to our customers",
  },
  {
    title: "Logistics Coordinator",
    department: "Operations",
    location: "Accra, Ghana",
    type: "Full-time",
    description: "Manage delivery operations and partnerships",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive user experiences",
  },
]

const benefits = [
  "Competitive Salary",
  "Health Insurance",
  "Remote Work Options",
  "Professional Development",
  "Team Building Events",
  "Flexible Hours",
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl mb-8 opacity-90">
            Build your career with Ghana's leading e-commerce platform
          </p>
          <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work at Fynza?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Career</h3>
              <p className="text-muted-foreground">
                Fast-paced environment with opportunities for advancement
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
              <p className="text-muted-foreground">
                Flexible hours and remote work options
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impactful Work</h3>
              <p className="text-muted-foreground">
                Help shape the future of e-commerce in Africa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="p-6 border rounded-lg hover:border-orange-500 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't see the right role?</h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for talented people. Send us your CV!
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-6 text-lg">
            Send Us Your CV
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}