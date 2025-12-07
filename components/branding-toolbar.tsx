"use client"

import { Type, Palette, Image as ImageIcon, LayoutTemplate, Settings2 } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

interface BrandingToolbarProps {
    fontFamily: string
    setFontFamily: (value: string) => void
    accentColor: string
    setAccentColor: (value: string) => void
    logoUrl: string
    setLogoUrl: (value: string) => void
    backgroundImage: string
    setBackgroundImage: (value: string) => void
    showBackground: boolean
    setShowBackground: (value: boolean) => void
    pageSize: string
    setPageSize: (value: string) => void
    margins: string
    setMargins: (value: string) => void
}

const LOGO_PRESETS = [
    { label: "None", value: "" },
    { label: "Abstract Cube", value: "https://img.logoipsum.com/243.svg" },
    { label: "Hexagon", value: "https://img.logoipsum.com/296.svg" },
    { label: "Circle Tech", value: "https://img.logoipsum.com/286.svg" },
]

const BG_PRESETS = [
    { label: "None", value: "" },
    { label: "Cubes", value: "https://www.transparenttextures.com/patterns/cubes.png" },
    { label: "Stardust", value: "https://www.transparenttextures.com/patterns/stardust.png" },
    { label: "Graph Paper", value: "https://www.transparenttextures.com/patterns/graphy.png" },
]

export function BrandingToolbar({
    fontFamily,
    setFontFamily,
    accentColor,
    setAccentColor,
    logoUrl,
    setLogoUrl,
    backgroundImage,
    setBackgroundImage,
    showBackground,
    setShowBackground,
    pageSize,
    setPageSize,
    margins,
    setMargins,
}: BrandingToolbarProps) {
    return (
        <div className="sticky top-0 z-20 flex flex-col gap-4 border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex-row md:items-center overflow-x-auto">
            {/* Font Selector */}
            <div className="flex items-center gap-2 min-w-fit">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-[100px] h-8 text-xs">
                        <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sans">Sans</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Mono</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            {/* Color Picker */}
            <div className="flex items-center gap-2 min-w-fit">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-8 w-8 cursor-pointer rounded-md border border-input p-1"
                    />
                </div>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            {/* Logo Preset */}
            <div className="flex items-center gap-2 min-w-fit">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <Select
                    value={LOGO_PRESETS.some(p => p.value === logoUrl) ? logoUrl : "custom"}
                    onValueChange={(val) => val !== "custom" && setLogoUrl(val)}
                >
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue placeholder="Logo" />
                    </SelectTrigger>
                    <SelectContent>
                        {LOGO_PRESETS.map(p => (
                            <SelectItem key={p.label} value={p.value}>{p.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            {/* Background Preset */}
            <div className="flex items-center gap-2 min-w-fit">
                <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                <Select
                    value={BG_PRESETS.some(p => p.value === backgroundImage) ? backgroundImage : "custom"}
                    onValueChange={(val) => {
                        if (val !== "custom") {
                            setBackgroundImage(val)
                            setShowBackground(!!val)
                        }
                    }}
                >
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue placeholder="Background" />
                    </SelectTrigger>
                    <SelectContent>
                        {BG_PRESETS.map(p => (
                            <SelectItem key={p.label} value={p.value}>{p.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            {/* Layout Settings */}
            <div className="flex items-center gap-2 min-w-fit">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger className="w-[90px] h-8 text-xs">
                        <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={margins} onValueChange={setMargins}>
                    <SelectTrigger className="w-[100px] h-8 text-xs">
                        <SelectValue placeholder="Margins" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="wide">Wide</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
