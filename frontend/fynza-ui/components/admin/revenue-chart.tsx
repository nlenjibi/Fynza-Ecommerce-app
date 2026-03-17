"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 42000, orders: 245 },
  { month: "Feb", revenue: 48000, orders: 278 },
  { month: "Mar", revenue: 45000, orders: 261 },
  { month: "Apr", revenue: 55000, orders: 312 },
  { month: "May", revenue: 52000, orders: 298 },
  { month: "Jun", revenue: 63000, orders: 356 },
  { month: "Jul", revenue: 68000, orders: 384 },
  { month: "Aug", revenue: 72000, orders: 405 },
  { month: "Sep", revenue: 78000, orders: 432 },
  { month: "Oct", revenue: 84000, orders: 468 },
  { month: "Nov", revenue: 89000, orders: 492 },
  { month: "Dec", revenue: 95000, orders: 523 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
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
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6700" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF6700" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#FF6700"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
