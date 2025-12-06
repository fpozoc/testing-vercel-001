"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { useParams } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { documents } from "@/app/lib/placeholder-data"

export default function EditDocumentPage() {
    const params = useParams()
    const [markdown, setMarkdown] = useState("")
    const [title, setTitle] = useState("Loading...")

    useEffect(() => {
        if (params.id) {
            const doc = documents.find((d) => d.id === params.id)
            if (doc) {
                setMarkdown(doc.content)
                setTitle(doc.title)
            } else {
                setMarkdown("# Document Not Found")
                setTitle("Error")
            }
        }
    }, [params.id])

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 md:flex-row">
            <div className="flex h-full w-full flex-col gap-2 md:w-1/2">
                <h2 className="text-lg font-semibold">Editor: {title}</h2>
                <Textarea
                    className="h-full resize-none font-mono"
                    placeholder="Type your markdown here..."
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
            </div>
            <div className="flex h-full w-full flex-col gap-2 md:w-1/2">
                <h2 className="text-lg font-semibold">Preview</h2>
                <Card className="h-full overflow-y-auto bg-white shadow-sm dark:bg-zinc-950">
                    <CardContent className="prose prose-zinc max-w-none p-8 dark:prose-invert">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
