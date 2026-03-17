"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", published: 45, views: 28 },
  { month: "Feb", published: 52, views: 32 },
  { month: "Mar", published: 48, views: 35 },
  { month: "Apr", published: 61, views: 38 },
  { month: "May", published: 55, views: 42 },
  { month: "Jun", published: 67, views: 45 },
  { month: "Jul", published: 72, views: 48 },
  { month: "Aug", published: 78, views: 52 },
  { month: "Sep", published: 84, views: 55 },
  { month: "Oct", published: 89, views: 58 },
  { month: "Nov", published: 85, views: 62 },
  { month: "Dec", published: 92, views: 68 },
]

export function ContentPerformance() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Content Performance</CardTitle>
        <Select defaultValue="12months">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Line
                type="monotone"
                dataKey="published"
                name="Articles Published"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="views"
                name="Page Views (K)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
