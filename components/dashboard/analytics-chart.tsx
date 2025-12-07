"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 50) + 10,
    },
]

const statusData = [
    { name: "Published", value: 12, color: "#10b981" }, // emerald-500
    { name: "Draft", value: 5, color: "#f59e0b" }, // amber-500
    { name: "Archived", value: 3, color: "#64748b" }, // slate-500
]

export function AnalyticsChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export function DocumentStatusChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    )
}
