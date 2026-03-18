"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Truck,
  Plus,
  Trash2,
  Edit,
  Save,
  MapPin,
  DollarSign,
  Clock,
} from "lucide-react"

interface Region {
  id: number
  name: string
  code: string
  country: string
}

interface DeliveryFee {
  id: number
  townId: number
  townName: string
  method: string
  baseFee: number
  perKmFee: number
  estimatedDays: number
}

const initialRegions: Region[] = [
  { id: 1, name: "Greater Accra", code: "GA", country: "Ghana" },
  { id: 2, name: "Ashanti", code: "AH", country: "Ghana" },
  { id: 3, name: "Western", code: "WE", country: "Ghana" },
  { id: 4, name: "Eastern", code: "EA", country: "Ghana" },
  { id: 5, name: "Central", code: "CE", country: "Ghana" },
]

const initialFees: DeliveryFee[] = [
  { id: 1, townId: 101, townName: "Accra", method: "DIRECT_ADDRESS", baseFee: 15, perKmFee: 2, estimatedDays: 1 },
  { id: 2, townId: 102, townName: "Kumasi", method: "DIRECT_ADDRESS", baseFee: 20, perKmFee: 3, estimatedDays: 2 },
  { id: 3, townId: 103, townName: "Takoradi", method: "BUS_STATION", baseFee: 10, perKmFee: 1, estimatedDays: 3 },
  { id: 4, townId: 104, townName: "Cape Coast", method: "BUS_STATION", baseFee: 8, perKmFee: 1, estimatedDays: 2 },
  { id: 5, townId: 105, townName: "Tema", method: "DIRECT_ADDRESS", baseFee: 12, perKmFee: 2, estimatedDays: 1 },
]

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState<"regions" | "fees">("regions")
  const [regions, setRegions] = useState(initialRegions)
  const [fees, setFees] = useState(initialFees)
  const [success, setSuccess] = useState<string | null>(null)

  const [regionForm, setRegionForm] = useState({ name: "", code: "", country: "Ghana" })
  const [editingRegionId, setEditingRegionId] = useState<number | null>(null)

  const [feeForm, setFeeForm] = useState({
    townName: "",
    method: "DIRECT_ADDRESS",
    baseFee: "",
    perKmFee: "",
    estimatedDays: "2",
  })

  const handleSaveRegion = () => {
    if (!regionForm.name || !regionForm.code) {
      alert("Please fill in required fields")
      return
    }

    if (editingRegionId) {
      setRegions(regions.map((r) =>
        r.id === editingRegionId ? { ...r, ...regionForm } : r
      ))
      setEditingRegionId(null)
    } else {
      const newRegion: Region = {
        id: Date.now(),
        ...regionForm,
      }
      setRegions([...regions, newRegion])
    }

    setRegionForm({ name: "", code: "", country: "Ghana" })
    setSuccess("Region saved successfully")
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleEditRegion = (region: Region) => {
    setRegionForm({ name: region.name, code: region.code, country: region.country })
    setEditingRegionId(region.id)
  }

  const handleDeleteRegion = (id: number) => {
    if (confirm("Delete this region?")) {
      setRegions(regions.filter((r) => r.id !== id))
      setSuccess("Region deleted")
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  const handleSaveFee = () => {
    if (!feeForm.townName || !feeForm.baseFee) {
      alert("Please fill in required fields")
      return
    }

    const newFee: DeliveryFee = {
      id: Date.now(),
      townId: Math.floor(Math.random() * 1000),
      townName: feeForm.townName,
      method: feeForm.method,
      baseFee: Number(feeForm.baseFee),
      perKmFee: Number(feeForm.perKmFee) || 0,
      estimatedDays: Number(feeForm.estimatedDays) || 2,
    }

    setFees([...fees, newFee])
    setFeeForm({ townName: "", method: "DIRECT_ADDRESS", baseFee: "", perKmFee: "", estimatedDays: "2" })
    setSuccess("Delivery fee created successfully")
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleDeleteFee = (id: number) => {
    if (confirm("Delete this delivery fee?")) {
      setFees(fees.filter((f) => f.id !== id))
      setSuccess("Fee deleted")
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "DIRECT_ADDRESS":
        return "Direct Address"
      case "BUS_STATION":
        return "Bus Station"
      case "SHIPPING":
        return "Shipping"
      default:
        return method
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Delivery" subtitle="Manage regions and delivery fees" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Delivery Configuration</h1>
                <p className="text-sm text-gray-500">Manage regions and delivery fees</p>
              </div>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              ✓ {success}
            </div>
          )}

          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "regions" ? "default" : "outline"}
              className={activeTab === "regions" ? "bg-orange-500" : ""}
              onClick={() => setActiveTab("regions")}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Regions
            </Button>
            <Button
              variant={activeTab === "fees" ? "default" : "outline"}
              className={activeTab === "fees" ? "bg-orange-500" : ""}
              onClick={() => setActiveTab("fees")}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Delivery Fees
            </Button>
          </div>

          {activeTab === "regions" && (
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {editingRegionId ? "Edit Region" : "Add New Region"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Region Name *
                      </label>
                      <Input
                        value={regionForm.name}
                        onChange={(e) => setRegionForm({ ...regionForm, name: e.target.value })}
                        placeholder="e.g., Greater Accra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Region Code *
                      </label>
                      <Input
                        value={regionForm.code}
                        onChange={(e) => setRegionForm({ ...regionForm, code: e.target.value })}
                        placeholder="e.g., GA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <Input
                        value={regionForm.country}
                        onChange={(e) => setRegionForm({ ...regionForm, country: e.target.value })}
                        placeholder="e.g., Ghana"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveRegion}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingRegionId ? "Update Region" : "Create Region"}
                    </Button>
                    {editingRegionId && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setRegionForm({ name: "", code: "", country: "Ghana" })
                          setEditingRegionId(null)
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Name</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Code</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Country</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {regions.map((region) => (
                          <tr key={region.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium text-gray-900">{region.name}</td>
                            <td className="py-3 text-sm text-gray-600">{region.code}</td>
                            <td className="py-3 text-sm text-gray-600">{region.country}</td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditRegion(region)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleDeleteRegion(region.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Add Delivery Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Town Name *
                      </label>
                      <Input
                        value={feeForm.townName}
                        onChange={(e) => setFeeForm({ ...feeForm, townName: e.target.value })}
                        placeholder="e.g., Accra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Method
                      </label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-gray-300"
                        value={feeForm.method}
                        onChange={(e) => setFeeForm({ ...feeForm, method: e.target.value })}
                      >
                        <option value="DIRECT_ADDRESS">Direct Address</option>
                        <option value="BUS_STATION">Bus Station</option>
                        <option value="SHIPPING">Shipping</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Fee *
                      </label>
                      <Input
                        type="number"
                        value={feeForm.baseFee}
                        onChange={(e) => setFeeForm({ ...feeForm, baseFee: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Per KM Fee
                      </label>
                      <Input
                        type="number"
                        value={feeForm.perKmFee}
                        onChange={(e) => setFeeForm({ ...feeForm, perKmFee: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Est. Days
                      </label>
                      <Input
                        type="number"
                        value={feeForm.estimatedDays}
                        onChange={(e) => setFeeForm({ ...feeForm, estimatedDays: e.target.value })}
                        placeholder="2"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleSaveFee}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Delivery Fee
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Delivery Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Town</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Method</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Base Fee</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Per KM</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Est. Days</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {fees.map((fee) => (
                          <tr key={fee.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium text-gray-900">{fee.townName}</td>
                            <td className="py-3 text-sm text-gray-600">
                              <Badge variant="outline">{getMethodLabel(fee.method)}</Badge>
                            </td>
                            <td className="py-3 text-sm text-gray-600">${fee.baseFee.toFixed(2)}</td>
                            <td className="py-3 text-sm text-gray-600">
                              {fee.perKmFee > 0 ? `$${fee.perKmFee.toFixed(2)}` : "-"}
                            </td>
                            <td className="py-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {fee.estimatedDays} days
                              </div>
                            </td>
                            <td className="py-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteFee(fee.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
