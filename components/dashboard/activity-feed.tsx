"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
    {
        user: {
            name: "Alice Smith",
            image: "https://github.com/shadcn.png",
            initials: "AS",
        },
        action: "edited",
        target: "Q3 Financial Report",
        time: "2 hours ago",
    },
    {
        user: {
            name: "Bob Jones",
            image: "",
            initials: "BJ",
        },
        action: "created",
        target: "Project Alpha Proposal",
        time: "4 hours ago",
    },
    {
        user: {
            name: "Charlie Brown",
            image: "",
            initials: "CB",
        },
        action: "commented on",
        target: "Marketing Strategy",
        time: "5 hours ago",
    },
    {
        user: {
            name: "Diana Prince",
            image: "",
            initials: "DP",
        },
        action: "published",
        target: "Brand Guidelines",
        time: "1 day ago",
    },
    {
        user: {
            name: "Evan Wright",
            image: "",
            initials: "EW",
        },
        action: "archived",
        target: "Old Q2 Notes",
        time: "2 days ago",
    },
]

export function ActivityFeed() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={activity.user.image} alt={activity.user.name} />
                                <AvatarFallback>{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.user.name}{" "}
                                    <span className="text-muted-foreground font-normal">
                                        {activity.action}
                                    </span>{" "}
                                    <span className="font-medium">{activity.target}</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
