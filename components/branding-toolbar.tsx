"use client"

import { Type, Palette, Image as ImageIcon, LayoutTemplate } from "lucide-react"

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
        </div>
    )
}
