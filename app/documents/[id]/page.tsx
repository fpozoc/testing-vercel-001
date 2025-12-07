"use client"

import { useParams } from "next/navigation"
import { documents } from "@/app/lib/placeholder-data"
import { DocumentEditor } from "@/components/document-editor"

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
    return <DocumentEditor key={doc.id} initialData={doc} />
}
