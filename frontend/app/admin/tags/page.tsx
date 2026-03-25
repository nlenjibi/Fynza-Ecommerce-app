"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  X,
  Tag,
  Search,
  Package,
  Trash2,
} from "lucide-react"

const initialTags = [
  { id: 1, name: "New Arrivals", slug: "new-arrivals", productCount: 45 },
  { id: 2, name: "Best Sellers", slug: "best-sellers", productCount: 32 },
  { id: 3, name: "Featured", slug: "featured", productCount: 28 },
  { id: 4, name: "Sale", slug: "sale", productCount: 56 },
  { id: 5, name: "Trending", slug: "trending", productCount: 23 },
  { id: 6, name: "Summer Collection", slug: "summer-collection", productCount: 18 },
  { id: 7, name: "Winter Sale", slug: "winter-sale", productCount: 34 },
  { id: 8, name: "Electronics", slug: "electronics", productCount: 67 },
  { id: 9, name: "Fashion", slug: "fashion", productCount: 89 },
  { id: 10, name: "Home & Garden", slug: "home-garden", productCount: 41 },
]

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }

  const handleAddTag = () => {
    if (!newTagName.trim()) return

    const newTag = {
      id: Date.now(),
      name: newTagName.trim(),
      slug: generateSlug(newTagName.trim()),
      productCount: 0,
    }

    setTags([...tags, newTag])
    setNewTagName("")
    setIsModalOpen(false)
  }

  const handleDeleteTag = (id: number) => {
    if (confirm("Are you sure you want to delete this tag?")) {
      setTags(tags.filter((tag) => tag.id !== id))
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Tags" subtitle="Manage product tags for better organization" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Tags</h1>
                <p className="text-sm text-gray-500">Manage tags for better product organization</p>
              </div>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Tag</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tag Name *
                    </label>
                    <Input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="Enter tag name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <Input
                      type="text"
                      value={generateSlug(newTagName)}
                      placeholder="auto-generated-slug"
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddTag}
                      disabled={!newTagName.trim()}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Create Tag
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                All Tags ({filteredTags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTags.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No tags found</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {filteredTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full group hover:bg-gray-200 transition-colors"
                    >
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{tag.name}</span>
                      <span className="text-sm text-gray-500">({tag.productCount})</span>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="ml-1 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredTags.length} of {tags.length} tags
          </p>
        </main>
      </div>
    </div>
  )
}
