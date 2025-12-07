"use client"

import { useState } from "react"
import Link from "next/link"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Copy, Trash } from "lucide-react"
import { toast } from "sonner"

interface Document {
    id: string
    title: string
    status: string
    date: string
}

interface RecentDocumentsProps {
    documents: Document[]
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
    const [filter, setFilter] = useState("all")

    const filteredDocuments = documents.filter((doc) => {
        if (filter === "all") return true
        return doc.status.toLowerCase() === filter.toLowerCase()
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Published":
                return "default"
            case "Draft":
                return "secondary"
            case "Archived":
                return "outline"
            default:
                return "default"
        }
    }

    const handleDuplicate = (id: string) => {
        toast.success("Document duplicated")
    }

    const handleDelete = (id: string) => {
        toast.success("Document deleted")
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/documents/${doc.id}`} className="flex items-center cursor-pointer">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDuplicate(doc.id)} className="cursor-pointer">
                                                <Copy className="mr-2 h-4 w-4" />
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(doc.id)} className="text-red-600 cursor-pointer">
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
