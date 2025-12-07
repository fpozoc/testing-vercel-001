"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

const documents = [
    {
        id: "1",
        title: "Q3 Financial Report",
        status: "Published",
        date: "2023-10-25",
    },
    {
        id: "2",
        title: "Engineering Onboarding",
        status: "Draft",
        date: "2023-11-01",
    },
    {
        id: "3",
        title: "Brand Guidelines",
        status: "Published",
        date: "2023-09-15",
    },
    {
        id: "4",
        title: "Product Roadmap 2024",
        status: "Draft",
        date: "2023-12-01",
    },
    {
        id: "5",
        title: "Meeting Notes: Design Sync",
        status: "Archived",
        date: "2023-12-05",
    },
    {
        id: "6",
        title: "Marketing Campaign Q4",
        status: "Published",
        date: "2023-11-20",
    },
]

export function RecentDocuments() {
    const [filter, setFilter] = useState("all")

    const filteredDocuments = documents.filter((doc) => {
        if (filter === "all") return true
        return doc.status.toLowerCase() === filter.toLowerCase()
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Published":
                return "default" // or "success" if available, default is usually primary
            case "Draft":
                return "secondary"
            case "Archived":
                return "outline"
            default:
                return "default"
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recent Documents</h3>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Documents</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Edited</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDocuments.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.title}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusColor(doc.status) as any}>
                                        {doc.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{doc.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
