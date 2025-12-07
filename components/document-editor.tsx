"use client"

import { useState, useRef, CSSProperties } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useRouter } from "next/navigation"
import { Save, Printer, User, Check, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useReactToPrint } from "react-to-print"
import Link from "next/link"

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
    const [isSaving, setIsSaving] = useState(false)

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
        setIsSaving(true)
        setTimeout(() => {
            if (!initialData) {
                // Create Mode
                toast.success("Document created", {
                    description: "Your new document has been successfully created.",
                })
                router.push("/documents")
            } else {
                // Edit Mode
                toast.success("Document saved", {
                    description: "Your changes have been successfully saved.",
                })
            }
            setIsSaving(false)
        }, 800) // Simulate network delay
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
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/documents">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-8 w-[200px] font-semibold bg-background"
                        placeholder="Document Title"
                    />
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="h-8 w-[150px] bg-background"
                            placeholder="Author"
                        />
                    </div>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="h-8 w-[120px] bg-background">
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
                    <Button size="sm" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {initialData ? "Save" : "Create"}
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Editor & Preview */}
            <div className="grid grid-cols-2 h-[calc(100vh-140px)] w-full overflow-hidden">
                {/* Left: Markdown Input */}
                <div className="h-full overflow-y-auto border-r border-gray-200 bg-white min-w-0">
                    <Textarea
                        className="w-full h-full resize-none p-6 outline-none font-mono bg-transparent text-sm leading-relaxed border-0 focus-visible:ring-0"
                        placeholder="# Start writing your document..."
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>

                {/* Right: Preview Workspace */}
                <div className="h-full overflow-y-auto bg-slate-100/50 p-8 min-w-0">
                    <div ref={contentRef} className="my-4">
                        <Card
                            className={cn(
                                "bg-white shadow-lg mx-auto min-h-[297mm] w-full max-w-[210mm] p-10 mb-10 print:shadow-none print:border-0 print:[print-color-adjust:exact] text-slate-950",
                                getFontFamilyClass(fontFamily)
                            )}
                            style={{
                                ...previewStyle,
                                ...getPageSizeStyle(pageSize),
                            }}
                        >
                            <CardContent className={cn("h-full p-0", getMarginClass(margins))}>
                                {logoUrl && (
                                    <div className="mb-8">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
                                    </div>
                                )}
                                <div className="prose prose-sm max-w-none break-words overflow-hidden">
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
