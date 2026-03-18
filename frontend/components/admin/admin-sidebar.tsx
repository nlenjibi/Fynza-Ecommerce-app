"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  FolderKanban,
  Users,
  Package,
  Tag,
  Percent,
  Receipt,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Building2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Zap,
  DollarSign,
  TrendingUp,
  Mail,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { name: "Performance", href: "/admin/performance", icon: TrendingUp },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "24", badgeColor: "orange" },
      { name: "Categories", href: "/admin/categories", icon: FolderKanban },
      { name: "Products", href: "/admin/products", icon: Package, badge: "8", badgeColor: "red" },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Sellers", href: "/admin/sellers", icon: Building2, badge: "5", badgeColor: "green" },
    ],
  },
  {
    title: "MARKETING",
    items: [
      { name: "Promotions", href: "/admin/promotions", icon: Percent },
      { name: "Coupons", href: "/admin/coupons", icon: Tag, badge: "12", badgeColor: "orange" },
      { name: "Flash Sales", href: "/admin/flash-sales", icon: Zap, badge: "2", badgeColor: "purple" },
      { name: "Tags", href: "/admin/tags", icon: Tag },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { name: "Refunds", href: "/admin/refunds", icon: Receipt, badge: "3", badgeColor: "red" },
      { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
      { name: "Reports", href: "/admin/reports", icon: FileText },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { name: "Contacts", href: "/admin/contacts", icon: MessageSquare, badge: "12", badgeColor: "blue" },
      { name: "Subscribers", href: "/admin/subscribers", icon: Mail, badge: "5", badgeColor: "green" },
      { name: "Notifications", href: "/admin/notifications", icon: Bell },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Activity Logs", href: "/admin/activity-logs", icon: TrendingUp },
      { name: "Tracking", href: "/admin/tracking", icon: Activity },
    ],
  },
]

const bottomNav = [
  { name: "Logout", href: "/", icon: LogOut },
]

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen: externalIsOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = onClose ? (value: boolean) => {
      if (!value) onClose();
  } : setInternalIsOpen

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-gray-900">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-800 px-5">
        <div>
          <span className="text-lg font-bold text-orange-500">FYNZA</span>
          <span className="text-xs text-gray-400 block">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100vh-8rem)] overflow-y-auto px-3 py-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            item.badgeColor === "orange" && "bg-orange-500/20 text-orange-400",
                            item.badgeColor === "red" && "bg-red-500/20 text-red-400",
                            item.badgeColor === "green" && "bg-green-500/20 text-green-400",
                            item.badgeColor === "blue" && "bg-blue-500/20 text-blue-400",
                            item.badgeColor === "purple" && "bg-purple-500/20 text-purple-400",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-gray-900 p-3">
        <ul className="space-y-1">
          {bottomNav.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
