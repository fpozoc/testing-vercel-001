"use client"

import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { useParams } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Save, Printer } from "lucide-react"
import { toast } from "sonner"
import { useReactToPrint } from "react-to-print"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { documents } from "@/app/lib/placeholder-data"

// Sub-component to handle state with key-based reset
function DocumentEditor({ doc }: { doc: typeof documents[0] }) {
    const [markdown, setMarkdown] = useState(doc.content)
    const [title, setTitle] = useState(doc.title)
    const [status, setStatus] = useState(doc.status)
    const [date, setDate] = useState<Date | undefined>(new Date(doc.date))

    const contentRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: title,
    })

    const handleSave = () => {
        toast.success("Document saved", {
            description: "Your changes have been successfully saved.",
        })
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
            {/* Metadata Toolbar */}
            <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between print:hidden">
                <div className="flex flex-1 items-center gap-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-9 text-lg font-semibold md:w-[300px]"
                        placeholder="Document Title"
                    />
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="In Review">In Review</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => handlePrint()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Editor & Preview */}
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
                <div className="flex h-full w-full flex-col gap-2 md:w-1/2 print:hidden">
                    <h2 className="text-sm font-medium text-muted-foreground">Markdown Input</h2>
                    <Textarea
                        className="h-full resize-none font-mono"
                        placeholder="Type your markdown here..."
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>
                <div className="flex h-full w-full flex-col gap-2 md:w-1/2 print:w-full">
                    <h2 className="text-sm font-medium text-muted-foreground print:hidden">Preview</h2>
                    <div ref={contentRef}>
                        <Card className="h-full overflow-y-auto bg-white shadow-sm dark:bg-zinc-950 print:h-auto print:shadow-none print:border-0">
                            <CardContent className="prose prose-zinc max-w-none p-8 dark:prose-invert min-h-[297mm] print:min-h-0">
                                <ReactMarkdown>{markdown}</ReactMarkdown>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function EditDocumentPage() {
    const params = useParams()

    // Find the document synchronously
    const doc = documents.find((d) => d.id === params.id)

    if (!doc) {
        return (
            <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
                <h2 className="text-xl font-semibold text-muted-foreground">Document Not Found</h2>
            </div>
        )
    }

    // Use key to force remount when doc.id changes, resetting state in DocumentEditor
    return <DocumentEditor key={doc.id} doc={doc} />
}
