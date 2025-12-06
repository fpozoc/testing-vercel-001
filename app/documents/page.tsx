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

const mockDocuments = [
    { id: 1, title: "Project Proposal", date: "Just now", description: "Draft for the Q4 marketing initiative." },
    { id: 2, title: "Meeting Notes", date: "3 days ago", description: "Weekly sync with the engineering team." },
    { id: 3, title: "Quarterly Review", date: "1 week ago", description: "Performance review and goals for next quarter." },
    { id: 4, title: "Onboarding Guide", date: "2 weeks ago", description: "Resources for new team members." },
]

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
                {mockDocuments.map((doc) => (
                    <Card key={doc.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{doc.title}</CardTitle>
                            <CardDescription>Last edited {doc.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground">
                                {doc.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Open
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
