import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { db } from "@/app/lib/db"
import { DocumentEditor } from "@/components/document-editor"

interface EditDocumentPageProps {
    params: {
        id: string
    }
}

export default async function EditDocumentPage({ params }: EditDocumentPageProps) {
    const session = await auth()

    if (!session?.user?.id) {
        redirect("/api/auth/signin")
    }

    const doc = await db.document.findUnique({
        where: {
            id: params.id,
            authorId: session.user.id,
        },
    })

    if (!doc) {
        return (
            <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
                <h2 className="text-xl font-semibold text-muted-foreground">Document Not Found</h2>
            </div>
        )
    }

    // Transform date to string and ensure status is valid
    const formattedDoc = {
        ...doc,
        date: doc.updatedAt.toISOString().split('T')[0],
        status: doc.status as "draft" | "published" | "archived"
    }

    return <DocumentEditor key={doc.id} initialData={formattedDoc} />
}
