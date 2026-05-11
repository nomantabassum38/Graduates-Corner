"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface AnalyticsChartsProps {
  stats: {
    students: number
    universities: number
    companies: number
    theses: number
    programs: number
    blogs: number
  }
}

export function AnalyticsCharts({ stats }: AnalyticsChartsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const userRoleData = [
    { name: "Students", value: stats.students, color: "hsl(var(--primary))" },
    { name: "Universities", value: stats.universities, color: "hsl(var(--accent))" },
    { name: "Companies", value: stats.companies, color: "hsl(var(--chart-3, 173 58% 39%))" },
  ]

  const contentTypeData = [
    { name: "Theses", value: stats.theses, color: "hsl(var(--chart-1, 220 70% 50%))" },
    { name: "Programs", value: stats.programs, color: "hsl(var(--chart-2, 160 60% 45%))" },
    { name: "Blogs", value: stats.blogs, color: "hsl(var(--chart-4, 43 74% 66%))" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Users Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">User Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userRoleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Content Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
