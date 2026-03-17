"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  FolderKanban,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  CreditCard,
  Receipt,
  FileText,
  ImageIcon,
  Search,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard, badge: "3" },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { name: "Organization", href: "/admin/organization", icon: Building2 },
      { name: "Projects", href: "/admin/projects", icon: FolderKanban, badge: "12" },
    ],
  },
  {
    title: "E-COMMERCE",
    items: [
      { name: "Products", href: "/admin/products", icon: Package, expandable: true },
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "5" },
      { name: "Customers", href: "/admin/customers", icon: Users, expandable: true },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
      { name: "Transactions", href: "/admin/transactions", icon: CreditCard, expandable: true },
      { name: "Invoices", href: "/admin/invoices", icon: Receipt, badge: "2" },
      { name: "Payments", href: "/admin/payments", icon: CreditCard, expandable: true },
    ],
  },
  {
    title: "CONTENT MANAGEMENT",
    items: [
      { name: "Pages", href: "/admin/pages", icon: FileText, expandable: true },
      { name: "Media", href: "/admin/media", icon: ImageIcon },
      { name: "SEO", href: "/admin/seo", icon: Search, badge: "New" },
    ],
  },
  {
    title: "TEAM & COMMUNICATION",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Help", href: "/admin/help", icon: HelpCircle },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-900">
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
          <span className="text-sm font-bold text-white">F</span>
        </div>
        <span className="text-lg font-semibold text-white">FynzaAdmin</span>
      </div>

      <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const isExpanded = expandedItems.includes(item.name)

                return (
                  <li key={item.name}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              isActive
                                ? "bg-white/20 text-white"
                                : item.badge === "New"
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-orange-500/10 text-orange-400",
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                      {item.expandable && (
                        <button
                          onClick={() => toggleExpand(item.name)}
                          className="ml-1 p-1 text-gray-400 hover:text-white"
                        >
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
