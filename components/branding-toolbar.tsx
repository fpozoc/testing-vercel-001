"use client"

import { Type, Palette, Image as ImageIcon, LayoutTemplate, Settings2 } from "lucide-react"

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
            <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-[120px]">
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

            <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-9 w-9 cursor-pointer rounded-md border border-input p-1"
                    />
                    <span className="text-xs text-muted-foreground uppercase">{accentColor}</span>
                </div>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <Input
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Logo URL..."
                    className="h-9 w-[150px] md:w-[200px]"
                />
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                    <Input
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage(e.target.value)}
                        placeholder="Background URL..."
                        className="h-9 w-[150px] md:w-[200px]"
                        disabled={!showBackground}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Switch
                        id="show-background"
                        checked={showBackground}
                        onCheckedChange={setShowBackground}
                    />
                    <Label htmlFor="show-background" className="text-xs">
                        Bg
                    </Label>
                </div>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                        <Settings2 className="h-4 w-4" />
                        <span className="hidden md:inline">Layout</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Page Settings</h4>
                            <p className="text-sm text-muted-foreground">
                                Configure the PDF export layout.
                            </p>
                        </div>
                        <div className="grid gap-2">
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
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
