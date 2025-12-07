"use client"

import { useState, useRef, CSSProperties } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useRouter } from "next/navigation"
import { Save, Printer, User } from "lucide-react"
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
import { BrandingToolbar } from "@/components/branding-toolbar"

interface DocumentData {
    id: string
    title: string
    status: string
    content: string
    date: string
}

interface DocumentEditorProps {
    initialData?: DocumentData
}

export function DocumentEditor({ initialData }: DocumentEditorProps) {
    const router = useRouter()

    // State initialization
    const [markdown, setMarkdown] = useState(initialData?.content || "")
    const [title, setTitle] = useState(initialData?.title || "")
    const [status, setStatus] = useState(initialData?.status || "Draft")
    const [author, setAuthor] = useState("")

    // Branding State
    const [fontFamily, setFontFamily] = useState("sans")
    const [accentColor, setAccentColor] = useState("#000000")
    const [logoUrl, setLogoUrl] = useState("")
    const [backgroundImage, setBackgroundImage] = useState("")
    const [showBackground, setShowBackground] = useState(false)

    // Layout State
    const [pageSize, setPageSize] = useState("a4")
    const [margins, setMargins] = useState("standard")

    const contentRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: title || "Untitled Document",
    })

    const handleSave = () => {
        if (!initialData) {
            // Create Mode
            toast.success("Document created", {
                description: "Your new document has been successfully created.",
            })
            // Simulate redirect to the new document (in a real app, we'd get the ID from the API)
            router.push("/documents")
        } else {
            // Edit Mode
            toast.success("Document saved", {
                description: "Your changes have been successfully saved.",
            })
        }
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

    const getPageSizeStyle = (size: string) => {
        switch (size) {
            case "a4":
                return { width: "210mm", minHeight: "297mm" }
            case "letter":
                return { width: "8.5in", minHeight: "11in" }
            default:
                return { width: "210mm", minHeight: "297mm" }
        }
    }

    const getMarginClass = (margin: string) => {
        switch (margin) {
            case "standard":
                return "p-10" // ~2.5cm
            case "compact":
                return "p-5" // ~1.25cm
            case "wide":
                return "p-20" // ~5cm
            default:
                return "p-10"
        }
    }

    const previewStyle: CSSProperties = {
        "--tw-prose-headings": accentColor,
        "--tw-prose-links": accentColor,
        backgroundImage: showBackground && backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
    } as CSSProperties

    return (
        <div className="flex h-full flex-col">
            <BrandingToolbar
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
                backgroundImage={backgroundImage}
                setBackgroundImage={setBackgroundImage}
                showBackground={showBackground}
                setShowBackground={setShowBackground}
                pageSize={pageSize}
                setPageSize={setPageSize}
                margins={margins}
                setMargins={setMargins}
            />

            {/* Metadata Toolbar */}
            <div className="flex items-center justify-between border-b bg-muted/40 p-4 print:hidden">
                <div className="flex items-center gap-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-8 w-[200px] font-semibold"
                        placeholder="Document Title"
                    />
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="h-8 w-[150px]"
                            placeholder="Author"
                        />
                    </div>
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
                        {initialData ? "Save" : "Create"}
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
                <div className="w-1/2 bg-muted/20 p-8 print:w-full print:p-0 overflow-y-auto flex justify-center">
                    <div ref={contentRef}>
                        <Card
                            className={cn(
                                "shadow-lg print:shadow-none print:border-0 print:[print-color-adjust:exact]",
                                getFontFamilyClass(fontFamily)
                            )}
                            style={{
                                ...previewStyle,
                                ...getPageSizeStyle(pageSize),
                            }}
                        >
                            <CardContent className={cn("h-full", getMarginClass(margins))}>
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
