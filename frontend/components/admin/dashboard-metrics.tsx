import { FileText, Eye, MessageSquare, Users, FileCheck, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Articles",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    subtitle: "Published articles",
    icon: FileText,
  },
  {
    title: "Page Views",
    value: "89.2K",
    change: "+23.1%",
    trend: "up",
    subtitle: "This month",
    icon: Eye,
  },
  {
    title: "Comments",
    value: "2,847",
    change: "+8.2%",
    trend: "up",
    subtitle: "User engagement",
    icon: MessageSquare,
  },
  {
    title: "Authors",
    value: "24",
    change: "-3.1%",
    trend: "down",
    subtitle: "Active writers",
    icon: Users,
  },
  {
    title: "Scheduled Posts",
    value: "18",
    change: "+5.3%",
    trend: "up",
    subtitle: "Upcoming content",
    icon: FileCheck,
  },
  {
    title: "Media Files",
    value: "3,456",
    change: "+10.7%",
    trend: "up",
    subtitle: "Images & videos",
    icon: ImageIcon,
  },
]

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <metric.icon className="h-4 w-4" />
                  <span>{metric.title}</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{metric.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
