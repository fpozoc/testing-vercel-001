"use client"

import { useState, useRef, CSSProperties } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useParams } from "next/navigation"
import { Save, Printer } from "lucide-react"
import { toast } from "sonner"
import { useReactToPrint } from "react-to-print"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { DesignToolbar } from "@/components/document/design-toolbar"

// Sub-component to handle state with key-based reset
function DocumentEditor({ doc }: { doc: typeof documents[0] }) {
    const [markdown, setMarkdown] = useState(doc.content)
    const [title, setTitle] = useState(doc.title)
    const [status, setStatus] = useState(doc.status)

    // Branding State
    const [fontFamily, setFontFamily] = useState("sans")
    const [brandColor, setBrandColor] = useState("#000000")
    const [logoUrl, setLogoUrl] = useState("")

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

    const getFontFamilyClass = (font: string) => {
        switch (font) {
            case "serif":
                return "font-serif"
            case "mono":
                return "font-mono"
            default:
                return "font-sans"
        }
    }

    const previewStyle: CSSProperties = {
        "--tw-prose-headings": brandColor,
        "--tw-prose-links": brandColor,
    } as CSSProperties

    return (
        <div className="flex h-full flex-col">
            <DesignToolbar
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                brandColor={brandColor}
                setBrandColor={setBrandColor}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
            />

            {/* Metadata Toolbar */}
            <div className="flex items-center justify-between border-b bg-muted/40 p-4 print:hidden">
                <div className="flex items-center gap-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-8 w-[200px] font-semibold"
                    />
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="h-8 w-[120px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handlePrint()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                </div>
            </div>

            {/* Editor & Preview */}
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/2 border-r bg-background p-4 print:hidden overflow-y-auto">
                    <Textarea
                        className="h-full min-h-[500px] resize-none border-0 p-0 focus-visible:ring-0 font-mono"
                        placeholder="Type your markdown here..."
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>
                <div className="w-1/2 bg-muted/20 p-8 print:w-full print:p-0 overflow-y-auto">
                    <div ref={contentRef}>
                        <Card
                            className={cn(
                                "min-h-[297mm] shadow-lg print:shadow-none print:border-0 print:[print-color-adjust:exact]",
                                getFontFamilyClass(fontFamily)
                            )}
                            style={previewStyle}
                        >
                            <CardContent className="p-12">
                                {logoUrl && (
                                    <div className="mb-8">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
                                    </div>
                                )}
                                <div className="prose prose-slate max-w-none dark:prose-invert print:prose-sm">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                                </div>
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
