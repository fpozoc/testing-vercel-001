"use server"

import { auth } from "@/auth"
import { db } from "@/app/lib/db"
import { revalidatePath } from "next/cache"

export async function saveDocument(data: {
    id?: string
    title: string
    content: string
    status: string
}) {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    try {
        let doc;
        if (data.id) {
            doc = await db.document.update({
                where: {
                    id: data.id,
                    authorId: session.user.id,
                },
                data: {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                },
            })
        } else {
            doc = await db.document.create({
                data: {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    authorId: session.user.id,
                },
            })
        }

        revalidatePath("/documents")
        if (data.id) {
            revalidatePath(`/documents/${data.id}`)
        }

        return { success: true, doc }
    } catch (error) {
        console.error("Failed to save document:", error)
        return { success: false, error: "Failed to save document" }
    }
}
