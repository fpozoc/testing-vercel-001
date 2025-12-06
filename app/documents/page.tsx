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
import { documents } from "@/app/lib/placeholder-data"

export default function DocumentsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">All Documents</h1>
                <Link href="/documents/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {documents.map((doc) => (
                    <Card key={doc.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{doc.title}</CardTitle>
                            <CardDescription>
                                {doc.date} • {doc.status}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="line-clamp-3 text-sm text-muted-foreground">
                                {doc.content.replace(/[#*`]/g, "")}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/documents/${doc.id}`} className="w-full">
                                <Button variant="outline" className="w-full">
                                    Open
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
