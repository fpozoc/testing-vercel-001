import Link from "next/link"
import { Plus, FileText, Activity, Users, CreditCard } from "lucide-react"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AnalyticsChart, DocumentStatusChart } from "@/components/dashboard/analytics-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { auth } from "@/auth"
import { db } from "@/app/lib/db"

export default async function DocumentsPage() {
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/api/auth/signin")
    }

    const documents = await db.document.findMany({
        where: {
            authorId: session.user.id,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    // Transform dates to string for client components
    const formattedDocuments = documents.map((doc: any) => ({
        ...doc,
        date: doc.updatedAt.toISOString().split('T')[0],
        status: doc.status.charAt(0).toUpperCase() + doc.status.slice(1)
    }))

    const draftCount = documents.filter((d: any) => d.status === 'draft').length
    const publishedCount = documents.filter((d: any) => d.status === 'published').length

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/documents/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Documents
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{documents.length}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Drafts
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {draftCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {publishedCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <AnalyticsChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Document Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DocumentStatusChart />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 lg:col-span-5">
                    <RecentDocuments documents={formattedDocuments} />
                </div>
                <div className="col-span-3 lg:col-span-2">
                    <ActivityFeed />
                </div>
            </div>
        </div>
    )
}
