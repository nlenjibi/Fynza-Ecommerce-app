import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const sources = [
  { name: "Direct", value: 45, color: "bg-orange-500" },
  { name: "Organic Search", value: 30, color: "bg-blue-500" },
  { name: "Social Media", value: 15, color: "bg-purple-500" },
  { name: "Referral", value: 10, color: "bg-green-500" },
]

export function TrafficSources() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">{source.name}</span>
                <span className="font-medium text-gray-900">{source.value}%</span>
              </div>
              <Progress value={source.value} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-orange-50 p-4">
          <p className="text-sm font-medium text-orange-900">Total Visitors</p>
          <p className="mt-1 text-2xl font-bold text-orange-900">24,547</p>
          <p className="mt-1 text-xs text-orange-700">+12.5% from last month</p>
        </div>
      </CardContent>
    </Card>
  )
}
