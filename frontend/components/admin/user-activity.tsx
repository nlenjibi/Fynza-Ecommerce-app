import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const users = [
  {
    name: "Sarah Johnson",
    role: "Editor",
    action: "Published 3 new articles",
    time: "5 minutes ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Michael Chen",
    role: "Author",
    action: "Updated product descriptions",
    time: "1 hour ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Emma Williams",
    role: "Admin",
    action: "Modified system settings",
    time: "3 hours ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "David Brown",
    role: "Author",
    action: "Uploaded 12 media files",
    time: "5 hours ago",
    avatar: "/placeholder-user.jpg",
  },
]

export function UserActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">User Activity</CardTitle>
        <button className="text-sm font-medium text-orange-600 hover:text-orange-700">View all</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {user.role}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{user.action}</p>
                <p className="mt-0.5 text-xs text-gray-500">{user.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
