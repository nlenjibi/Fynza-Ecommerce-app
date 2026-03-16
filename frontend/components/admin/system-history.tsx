import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const activities = [
  {
    type: "Plugin Activated",
    status: "success",
    description: "SEO Plugin activated successfully",
    time: "10 minutes ago",
  },
  {
    type: "System Update",
    status: "info",
    description: "CMS updated to version 2.5.1",
    time: "2 hours ago",
  },
  {
    type: "Database Backup",
    status: "success",
    description: "Automatic backup completed",
    time: "5 hours ago",
  },
  {
    type: "Security Scan",
    status: "warning",
    description: "2 vulnerabilities detected",
    time: "1 day ago",
  },
]

export function SystemHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">System History</CardTitle>
        <button className="text-sm font-medium text-orange-600 hover:text-orange-700">View all</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 rounded-lg border border-gray-200 p-4">
              <div className="mt-0.5">
                <Badge
                  variant={activity.status === "success" ? "default" : "secondary"}
                  className={
                    activity.status === "success"
                      ? "bg-green-100 text-green-700"
                      : activity.status === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                  }
                >
                  {activity.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.type}</p>
                <p className="mt-0.5 text-sm text-gray-600">{activity.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
