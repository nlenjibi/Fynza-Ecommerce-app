"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Briefcase,
  MapPin,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  salary: string
  requirements: string
  status: "active" | "closed"
  applicants: number
  postedAt: string
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    salary: "",
    requirements: ""
  })

  useEffect(() => {
    const stored = localStorage.getItem("fynza_jobs")
    
    if (!stored) {
      const sampleJobs: Job[] = [
        {
          id: "JOB-001",
          title: "Software Engineer",
          department: "Engineering",
          location: "Accra, Ghana",
          type: "Full-time",
          description: "Build and maintain our e-commerce platform",
          salary: "GHS 8,000 - 12,000",
          requirements: "3+ years experience, React, Node.js",
          status: "active",
          applicants: 12,
          postedAt: new Date().toISOString()
        },
        {
          id: "JOB-002",
          title: "Marketing Manager",
          department: "Marketing",
          location: "Accra, Ghana",
          type: "Full-time",
          description: "Lead marketing campaigns and brand initiatives",
          salary: "GHS 10,000 - 15,000",
          requirements: "5+ years experience in digital marketing",
          status: "active",
          applicants: 8,
          postedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "JOB-003",
          title: "Customer Service Representative",
          department: "Customer Support",
          location: "Accra, Ghana",
          type: "Full-time",
          description: "Provide excellent support to our customers",
          salary: "GHS 3,000 - 5,000",
          requirements: "Good communication skills, customer focus",
          status: "active",
          applicants: 25,
          postedAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: "JOB-004",
          title: "Logistics Coordinator",
          department: "Operations",
          location: "Accra, Ghana",
          type: "Full-time",
          description: "Manage delivery operations and partnerships",
          salary: "GHS 5,000 - 8,000",
          requirements: "2+ years logistics experience",
          status: "active",
          applicants: 6,
          postedAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: "JOB-005",
          title: "Product Designer",
          department: "Design",
          location: "Remote",
          type: "Full-time",
          description: "Design intuitive user experiences",
          salary: "GHS 9,000 - 14,000",
          requirements: "Figma, UI/UX design experience",
          status: "active",
          applicants: 15,
          postedAt: new Date(Date.now() - 345600000).toISOString()
        }
      ]
      localStorage.setItem("fynza_jobs", JSON.stringify(sampleJobs))
      setJobs(sampleJobs)
    } else {
      setJobs(JSON.parse(stored))
    }
  }, [])

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSave = () => {
    if (editingJob) {
      const updated = jobs.map(j => 
        j.id === editingJob.id ? { ...formData, id: editingJob.id, status: editingJob.status, applicants: editingJob.applicants, postedAt: editingJob.postedAt } : j
      )
      setJobs(updated)
      localStorage.setItem("fynza_jobs", JSON.stringify(updated))
    } else {
      const newJob: Job = {
        ...formData,
        id: `JOB-${Date.now()}`,
        status: "active",
        applicants: 0,
        postedAt: new Date().toISOString()
      }
      const updated = [...jobs, newJob]
      setJobs(updated)
      localStorage.setItem("fynza_jobs", JSON.stringify(updated))
    }
    setShowModal(false)
    setEditingJob(null)
    setFormData({ title: "", department: "", location: "", type: "Full-time", description: "", salary: "", requirements: "" })
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      salary: job.salary,
      requirements: job.requirements
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      const updated = jobs.filter(j => j.id !== id)
      setJobs(updated)
      localStorage.setItem("fynza_jobs", JSON.stringify(updated))
    }
  }

  const handleToggleStatus = (job: Job) => {
    const updated = jobs.map(j => 
      j.id === job.id ? { ...j, status: j.status === "active" ? "closed" : "active" } : j
    )
    setJobs(updated)
    localStorage.setItem("fynza_jobs", JSON.stringify(updated))
  }

  const activeJobs = jobs.filter(j => j.status === "active").length
  const totalApplicants = jobs.reduce((sum, j) => sum + j.applicants, 0)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Careers</h1>
              <p className="text-gray-600 mt-1">Manage job postings and applications</p>
            </div>
            <Button onClick={() => setShowModal(true)} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Job
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{jobs.length}</p>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeJobs}</p>
                    <p className="text-sm text-gray-600">Active Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalApplicants}</p>
                    <p className="text-sm text-gray-600">Total Applicants</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{Math.floor(totalApplicants / Math.max(activeJobs, 1))}</p>
                    <p className="text-sm text-gray-600">Avg Applicants/Job</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search jobs by title or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <Card>
            <CardContent className="p-0">
              {filteredJobs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No jobs found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{job.title}</p>
                              <Badge variant={job.status === "active" ? "default" : "secondary"}>
                                {job.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" />
                                {job.department}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {job.type}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right mr-4">
                            <p className="font-medium text-gray-900">{job.applicants}</p>
                            <p className="text-xs text-gray-500">applicants</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleStatus(job)}
                          >
                            {job.status === "active" ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {editingJob ? "Edit Job" : "Add New Job"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <Input
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      placeholder="e.g., Engineering"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Job Type</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Accra, Ghana"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Salary Range</label>
                    <Input
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      placeholder="e.g., GHS 5,000 - 8,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Job description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Requirements</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    placeholder="Job requirements..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSave} className="flex-1 bg-orange-500 hover:bg-orange-600">
                  {editingJob ? "Update Job" : "Create Job"}
                </Button>
                <Button variant="outline" onClick={() => { setShowModal(false); setEditingJob(null); }}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
