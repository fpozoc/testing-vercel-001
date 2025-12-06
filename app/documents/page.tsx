import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { documents } from "@/app/lib/placeholder-data"

export default function DocumentsPage() {
    const getStatusColor = (status: string): "default" | "secondary" | "outline" | "destructive" => {
        switch (status) {
            case "Published":
                return "default" // Black/Primary
            case "Draft":
                return "secondary" // Gray/Secondary
            case "Archived":
                return "outline" // Outline
            default:
                return "secondary"
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">All Documents</h1>
                    <p className="text-muted-foreground">
                        Manage and organize your project documentation.
                    </p>
                </div>
                <Link href="/documents/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {documents.map((doc) => (
                    <Card
                        key={doc.id}
                        className="flex flex-col transition-all hover:shadow-md"
                    >
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between gap-4">
                                <CardTitle className="line-clamp-1 text-lg font-semibold">
                                    {doc.title}
                                </CardTitle>
                                <Badge variant={getStatusColor(doc.status)}>
                                    {doc.status}
                                </Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1 text-xs">
                                {doc.date}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4">
                            <p className="line-clamp-3 text-sm text-muted-foreground">
                                {doc.content.replace(/[#*`]/g, "")}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/documents/${doc.id}`} className="w-full">
                                <Button variant="outline" className="w-full">
                                    Open Document
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
