"use client"

import { Type, Palette, Settings, Image as ImageIcon, LayoutTemplate } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        <div className="sticky top-0 z-20 flex flex-col gap-4 border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex-row md:items-center">
            {/* Font Selector */}
            <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-[120px] h-9">
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
            <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-9 w-9 cursor-pointer rounded-md border border-input p-1"
                    />
                    <span className="text-xs text-muted-foreground uppercase font-mono">{accentColor}</span>
                </div>
            </div>

            <div className="flex-1" />

            {/* Page Design Menu */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="h-9 gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="hidden md:inline">Page Design</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                    <Tabs defaultValue="branding" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="branding">Branding</TabsTrigger>
                            <TabsTrigger value="layout">Layout</TabsTrigger>
                        </TabsList>

                        {/* Branding Tab */}
                        <TabsContent value="branding" className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Logo</Label>
                                <Select
                                    value={LOGO_PRESETS.some(p => p.value === logoUrl) ? logoUrl : "custom"}
                                    onValueChange={(val) => val !== "custom" && setLogoUrl(val)}
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue placeholder="Select Logo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {LOGO_PRESETS.map(p => (
                                            <SelectItem key={p.label} value={p.value}>{p.label}</SelectItem>
                                        ))}
                                        <SelectItem value="custom">Custom URL...</SelectItem>
                                    </SelectContent>
                                </Select>
                                {(!LOGO_PRESETS.some(p => p.value === logoUrl) || logoUrl === "") && (
                                    <Input
                                        value={logoUrl}
                                        onChange={(e) => setLogoUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="h-8"
                                    />
                                )}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Background</Label>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="show-bg" className="text-xs">Show</Label>
                                        <Switch
                                            id="show-bg"
                                            checked={showBackground}
                                            onCheckedChange={setShowBackground}
                                            className="scale-75"
                                        />
                                    </div>
                                </div>
                                <Select
                                    value={BG_PRESETS.some(p => p.value === backgroundImage) ? backgroundImage : "custom"}
                                    onValueChange={(val) => val !== "custom" && setBackgroundImage(val)}
                                    disabled={!showBackground}
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue placeholder="Select Pattern" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BG_PRESETS.map(p => (
                                            <SelectItem key={p.label} value={p.value}>{p.label}</SelectItem>
                                        ))}
                                        <SelectItem value="custom">Custom URL...</SelectItem>
                                    </SelectContent>
                                </Select>
                                {(!BG_PRESETS.some(p => p.value === backgroundImage) || backgroundImage === "") && (
                                    <Input
                                        value={backgroundImage}
                                        onChange={(e) => setBackgroundImage(e.target.value)}
                                        placeholder="https://..."
                                        className="h-8"
                                        disabled={!showBackground}
                                    />
                                )}
                            </div>
                        </TabsContent>

                        {/* Layout Tab */}
                        <TabsContent value="layout" className="space-y-4 pt-4">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="pageSize">Size</Label>
                                    <Select value={pageSize} onValueChange={setPageSize}>
                                        <SelectTrigger id="pageSize" className="col-span-2 h-8">
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="a4">A4 (210mm)</SelectItem>
                                            <SelectItem value="letter">Letter (8.5in)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="margins">Margins</Label>
                                    <Select value={margins} onValueChange={setMargins}>
                                        <SelectTrigger id="margins" className="col-span-2 h-8">
                                            <SelectValue placeholder="Select margins" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard (2.5cm)</SelectItem>
                                            <SelectItem value="compact">Compact (1.25cm)</SelectItem>
                                            <SelectItem value="wide">Wide (5cm)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </PopoverContent>
            </Popover>
        </div>
    )
}
