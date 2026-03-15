"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { category: "Technology", articles: 152, color: "#3b82f6" },
  { category: "Business", articles: 138, color: "#10b981" },
  { category: "Health", articles: 95, color: "#f59e0b" },
  { category: "Sports", articles: 87, color: "#ef4444" },
  { category: "Entertainment", articles: 76, color: "#8b5cf6" },
  { category: "Politics", articles: 64, color: "#ec4899" },
  { category: "Science", articles: 52, color: "#06b6d4" },
]

export function ContentByCategory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Content by Category</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Articles</span>
          </div>
          <span className="text-xs text-gray-400">This year</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="articles" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
