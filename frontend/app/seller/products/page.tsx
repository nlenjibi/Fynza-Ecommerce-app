"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
  Edit2,
  Trash2,
  Eye,
  Plus,
  Search,
  MoreVertical,
  Package,
  Image,
  DollarSign,
  Tag,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  rating: number;
  sales: number;
  status: "active" | "draft" | "out_of_stock";
  images: string[];
  variants?: ProductVariant[];
  featured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  specifications?: Record<string, string>;
  createdAt: string;
}

export default function SellerProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds Pro",
      description: "High-quality wireless earbuds with active noise cancellation",
      brand: "SoundTech",
      category: "Electronics",
      sku: "WBE-PRO-001",
      price: 189.99,
      discountPrice: 159.99,
      stock: 45,
      rating: 4.8,
      sales: 156,
      status: "active",
      images: ["/placeholder-1.jpg"],
      variants: [
        { id: "v1", name: "Black", sku: "WBE-BLK-001", price: 189.99, stock: 15 },
        { id: "v2", name: "White", sku: "WBE-WHT-001", price: 189.99, stock: 15 },
        { id: "v3", name: "Navy Blue", sku: "WBE-NVY-001", price: 199.99, stock: 15 },
      ],
      featured: true,
      isNew: false,
      isBestseller: true,
      specifications: { "Battery Life": "24 hours", "Connectivity": "Bluetooth 5.2" },
      createdAt: "Jan 5, 2024",
    },
    {
      id: 2,
      name: "USB-C Hub 7-in-1",
      description: "Multi-port USB-C hub for laptops and tablets",
      brand: "LinkPro",
      category: "Accessories",
      sku: "USB-HUB-7IN1",
      price: 49.99,
      stock: 120,
      rating: 4.5,
      sales: 89,
      status: "active",
      images: ["/placeholder-2.jpg"],
      featured: false,
      isNew: false,
      isBestseller: false,
      createdAt: "Jan 4, 2024",
    },
    {
      id: 3,
      name: "Phone Case Premium Clear",
      description: "Shockproof transparent phone case",
      brand: "ProtectMax",
      category: "Accessories",
      sku: "PC-PREM-CLR",
      price: 29.99,
      stock: 0,
      rating: 4.6,
      sales: 234,
      status: "out_of_stock",
      images: ["/placeholder-3.jpg"],
      variants: [
        { id: "v1", name: "iPhone 14", sku: "PC-IP14-CLR", price: 29.99, stock: 0 },
        { id: "v2", name: "iPhone 14 Pro", sku: "PC-IP14P-CLR", price: 29.99, stock: 0 },
        { id: "v3", name: "iPhone 14 Pro Max", sku: "PC-IP14PM-CLR", price: 32.99, stock: 0 },
      ],
      featured: false,
      isNew: false,
      isBestseller: true,
      createdAt: "Jan 3, 2024",
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      description: "Advanced smartwatch with health monitoring",
      brand: "TechWear",
      category: "Electronics",
      sku: "SW-S5-001",
      price: 450.0,
      stock: 25,
      rating: 4.9,
      sales: 67,
      status: "active",
      images: ["/placeholder-4.jpg"],
      variants: [
        { id: "v1", name: "Silver/45mm", sku: "SW-S5-SLV-45", price: 450.0, stock: 10 },
        { id: "v2", name: "Gold/44mm", sku: "SW-S5-GLD-44", price: 470.0, stock: 8 },
        { id: "v3", name: "Space Gray/45mm", sku: "SW-S5-GRY-45", price: 450.0, stock: 7 },
      ],
      featured: true,
      isNew: true,
      isBestseller: false,
      specifications: { "Display": "AMOLED", "Water Resistance": "50m" },
      createdAt: "Jan 2, 2024",
    },
    {
      id: 5,
      name: "Laptop Stand Adjustable",
      description: "Ergonomic aluminum laptop stand",
      brand: "ErgoDesk",
      category: "Office",
      sku: "LS-ADJ-001",
      price: 89.99,
      stock: 78,
      rating: 4.7,
      sales: 112,
      status: "active",
      images: ["/placeholder-5.jpg"],
      featured: false,
      isNew: false,
      isBestseller: true,
      specifications: { "Material": "Aluminum", "Height Range": "15-45cm" },
      createdAt: "Jan 1, 2024",
    },
    {
      id: 6,
      name: "Wireless Charger Pad",
      description: "Fast wireless charging for Qi-enabled devices",
      brand: "PowerUp",
      category: "Electronics",
      sku: "WC-PAD-001",
      price: 35.99,
      stock: 0,
      rating: 4.4,
      sales: 0,
      status: "draft",
      images: ["/placeholder-6.jpg"],
      featured: false,
      isNew: true,
      isBestseller: false,
      specifications: { "Output": "15W", "Compatibility": "Qi-enabled devices" },
      createdAt: "Dec 30, 2023",
    },
    {
      id: 7,
      name: "Wireless Mouse Ergonomic",
      description: "Comfortable wireless mouse with adjustable DPI",
      brand: "TechGear",
      category: "Electronics",
      sku: "WM-ERG-001",
      price: 45.99,
      stock: 200,
      rating: 4.6,
      sales: 345,
      status: "active",
      images: ["/placeholder-7.jpg"],
      featured: false,
      isNew: false,
      isBestseller: true,
      createdAt: "Dec 28, 2023",
    },
    {
      id: 8,
      name: "Mechanical Keyboard RGB",
      description: "Gaming keyboard with RGB backlighting",
      brand: "GamePro",
      category: "Electronics",
      sku: "KB-MECH-RGB",
      price: 129.99,
      stock: 55,
      rating: 4.8,
      sales: 189,
      status: "active",
      images: ["/placeholder-8.jpg"],
      variants: [
        { id: "v1", name: "Blue Switch", sku: "KB-BLU-RGB", price: 129.99, stock: 20 },
        { id: "v2", name: "Red Switch", sku: "KB-RED-RGB", price: 129.99, stock: 20 },
        { id: "v3", name: "Brown Switch", sku: "KB-BRN-RGB", price: 134.99, stock: 15 },
      ],
      featured: true,
      isNew: false,
      isBestseller: true,
      specifications: { "Switch Type": "Mechanical", "Backlighting": "RGB" },
      createdAt: "Dec 25, 2023",
    },
  ];

  const categories = ["All", "Electronics", "Accessories", "Office", "Fashion", "Home"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || product.status === filterStatus;
    const matchesCategory = filterCategory === "all" || product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert(`Product ${id} would be deleted (demo mode)`);
    }
  };

  const handleSaveProduct = (product: Product) => {
    alert('Product saved successfully (demo mode)!');
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />

      <main className={`flex-1 overflow-auto ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'}`}>
        {/* Sidebar Toggle Header - Shows when sidebar is collapsed */}
        {!sidebarOpen && (
          <div className="hidden lg:flex bg-white border-b border-gray-200 px-4 py-3 items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>
            <span className="font-semibold text-gray-900">Products</span>
          </div>
        )}

        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
          <span className="font-semibold text-gray-900">Products</span>
          <div className="w-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
              <p className="text-gray-600 mt-1">Manage your product catalog</p>
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={18} />
              Add Product
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Products", value: products.length.toString(), icon: Package, color: "bg-blue-100 text-blue-600" },
              { label: "Active Products", value: products.filter(p => p.status === "active").length.toString(), icon: Check, color: "bg-green-100 text-green-600" },
              { label: "Out of Stock", value: products.filter(p => p.status === "out_of_stock").length.toString(), icon: AlertTriangle, color: "bg-red-100 text-red-600" },
              { label: "Draft", value: products.filter(p => p.status === "draft").length.toString(), icon: Edit2, color: "bg-gray-100 text-gray-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {["all", "active", "draft", "out_of_stock"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filterStatus === status
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {status.replace("_", " ")}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Flags
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Image className="text-gray-400" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                            {product.variants && product.variants.length > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                                {product.variants.length} variants
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
                      <td className="px-6 py-4 text-right">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            GH₵ {product.discountPrice || product.price}
                          </p>
                          {product.discountPrice && (
                            <p className="text-xs text-gray-500 line-through">
                              GH₵ {product.price}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                            }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {product.sales}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-gray-900 font-medium">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {product.featured && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs" title="Featured">★</span>
                          )}
                          {product.isNew && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs" title="New">N</span>
                          )}
                          {product.isBestseller && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs" title="Bestseller">B</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                            className="gap-1"
                          >
                            <Eye size={16} />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 gap-1"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditing(true);
                            }}
                          >
                            <Edit2 size={16} />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50 gap-1"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Product Details/Edit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Product' : 'Product Details'}
                </h2>
                <p className="text-gray-600 text-sm">SKU: {selectedProduct.sku}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEditing(false);
                }}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {isEditing ? (
                /* Edit Mode */
                <>
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedProduct.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          id="edit-name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          defaultValue={selectedProduct.description}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                          id="edit-description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedProduct.brand}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            id="edit-brand"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select 
                            defaultValue={selectedProduct.category}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            id="edit-category"
                          >
                            <option value="Electronics">Electronics</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Office">Office</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home">Home</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <select 
                            defaultValue={selectedProduct.status}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            id="edit-status"
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="out_of_stock">Out of Stock</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SKU
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedProduct.sku}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            id="edit-sku"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Flags */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Product Flags</h3>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={selectedProduct.featured} 
                          className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" 
                          id="edit-featured"
                        />
                        <span className="text-sm text-gray-700">Featured</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={selectedProduct.isNew} 
                          className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" 
                          id="edit-new"
                        />
                        <span className="text-sm text-gray-700">New Arrival</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={selectedProduct.isBestseller} 
                          className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" 
                          id="edit-bestseller"
                        />
                        <span className="text-sm text-gray-700">Bestseller</span>
                      </label>
                    </div>
                  </div>

                  {/* Pricing & Inventory */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pricing & Inventory</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Regular Price (GH₵)
                        </label>
                        <input
                          type="number"
                          defaultValue={selectedProduct.price}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          id="edit-price"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Discount Price (GH₵)
                        </label>
                        <input
                          type="number"
                          defaultValue={selectedProduct.discountPrice || ''}
                          placeholder="Optional"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          id="edit-discount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          defaultValue={selectedProduct.stock}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          id="edit-stock"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => {
                        const updatedProduct: Product = {
                          ...selectedProduct,
                          name: (document.getElementById('edit-name') as HTMLInputElement).value,
                          description: (document.getElementById('edit-description') as HTMLTextAreaElement).value,
                          brand: (document.getElementById('edit-brand') as HTMLInputElement).value,
                          category: (document.getElementById('edit-category') as HTMLSelectElement).value,
                          sku: (document.getElementById('edit-sku') as HTMLInputElement).value,
                          status: (document.getElementById('edit-status') as HTMLSelectElement).value as "active" | "draft" | "out_of_stock",
                          price: parseFloat((document.getElementById('edit-price') as HTMLInputElement).value) || 0,
                          discountPrice: parseFloat((document.getElementById('edit-discount') as HTMLInputElement).value) || undefined,
                          stock: parseInt((document.getElementById('edit-stock') as HTMLInputElement).value) || 0,
                          featured: (document.getElementById('edit-featured') as HTMLInputElement).checked,
                          isNew: (document.getElementById('edit-new') as HTMLInputElement).checked,
                          isBestseller: (document.getElementById('edit-bestseller') as HTMLInputElement).checked,
                        };
                        handleSaveProduct(updatedProduct);
                      }}
                    >
                      <Check size={16} className="mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                /* View Mode */
                <>
                  {/* Product Info */}
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image className="text-gray-400" size={40} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{selectedProduct.description}</p>
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {selectedProduct.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {selectedProduct.brand}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            selectedProduct.status
                          )}`}
                        >
                          {selectedProduct.status}
                        </span>
                        {selectedProduct.featured && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            Featured
                          </span>
                        )}
                        {selectedProduct.isNew && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            New
                          </span>
                        )}
                        {selectedProduct.isBestseller && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                            Bestseller
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Inventory */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Regular Price</p>
                      <p className="text-xl font-bold text-gray-900">GH₵ {selectedProduct.price}</p>
                    </div>
                    {selectedProduct.discountPrice && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm green-600 mb-1">Discount Price</p>
                        <p className="text-xl font-bold text-green-600">GH₵ {selectedProduct.discountPrice}</p>
                      </div>
                    )}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Stock Level</p>
                      <p className="text-xl font-bold text-gray-900">{selectedProduct.stock}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                      <p className="text-xl font-bold text-gray-900">{selectedProduct.sales}</p>
                    </div>
                  </div>

                  {/* Variants */}
                  {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Variants</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Variant</th>
                              <th className="px-4 py-2 text-left text-xs font-sem-gray-700">SKU</th>
                              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Price</th>
                              <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Stock</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {selectedProduct.variants.map((variant) => (
                              <tr key={variant.id}>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{variant.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{variant.sku}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 text-right">GH₵ {variant.price}</td>
                                <td className="px-4 py-3 text-center">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${variant.stock > 10
                                      ? "bg-green-100 text-green-800"
                                      : variant.stock > 0
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                      }`}
                                  >
                                    {variant.stock}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit Product
                    </Button>
                    <Button variant="outline">
                      <Eye size={16} className="mr-2" />
                      View on Store
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      id="add-name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter product description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                      id="add-description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      placeholder="Enter brand name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      id="add-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" id="add-category">
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="accessories">Accessories</option>
                      <option value="office">Office</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., PROD-001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      id="add-sku"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Pricing & Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regular Price (GH₵) *
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      id="add-price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Price (GH₵)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      id="add-discount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      id="add-stock"
                    />
                  </div>
                </div>
              </div>

              {/* Product Flags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Flags</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" id="add-featured" />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" id="add-new" />
                    <span className="text-sm text-gray-700">New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" id="add-bestseller" />
                    <span className="text-sm text-gray-700">Bestseller</span>
                  </label>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" id="add-status">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Image className="mx-auto text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">
                    Drag and drop images here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Variants Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Product Variants</h3>
                  <Button variant="outline" size="sm">
                    <Plus size={16} className="mr-1" />
                    Add Variant
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Add variants like size, color, or storage capacity.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    const name = (document.getElementById('add-name') as HTMLInputElement).value;
                    const description = (document.getElementById('add-description') as HTMLTextAreaElement).value;
                    const brand = (document.getElementById('add-brand') as HTMLInputElement).value;
                    const category = (document.getElementById('add-category') as HTMLSelectElement).value;
                    const sku = (document.getElementById('add-sku') as HTMLInputElement).value;
                    const price = parseFloat((document.getElementById('add-price') as HTMLInputElement).value) || 0;
                    const discount = parseFloat((document.getElementById('add-discount') as HTMLInputElement).value) || 0;
                    const stock = parseInt((document.getElementById('add-stock') as HTMLInputElement).value) || 0;
                    const featured = (document.getElementById('add-featured') as HTMLInputElement).checked;
                    const isNew = (document.getElementById('add-new') as HTMLInputElement).checked;
                    const isBestseller = (document.getElementById('add-bestseller') as HTMLInputElement).checked;
                    const status = (document.getElementById('add-status') as HTMLSelectElement).value as "active" | "draft" | "out_of_stock";
                    
                    if (!name || !price) {
                      alert('Please fill in required fields (Name and Price)');
                      return;
                    }

                    const newProduct: Product = {
                      id: products.length + 1,
                      name,
                      description,
                      brand,
                      category: category.charAt(0).toUpperCase() + category.slice(1),
                      sku,
                      price,
                      discountPrice: discount || undefined,
                      stock,
                      rating: 0,
                      sales: 0,
                      status: stock === 0 ? "out_of_stock" : status,
                      images: ["/placeholder.jpg"],
                      featured,
                      isNew,
                      isBestseller,
                      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    };
                    
                    handleSaveProduct(newProduct);
                    setShowAddModal(false);
                  }}
                >
                  <Check size={16} className="mr-2" />
                  Add Product
                </Button>
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
