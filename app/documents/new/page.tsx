"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NewDocument() {
    const [markdown, setMarkdown] = useState("# Untitled Document\n\nStart typing...");

    return (
        <div className="flex h-screen flex-col bg-zinc-50 dark:bg-black md:flex-row">
            {/* Left Column: Input */}
            <div className="flex h-1/2 w-full flex-col border-b border-zinc-200 p-4 dark:border-zinc-800 md:h-full md:w-1/2 md:border-b-0 md:border-r">
                <h2 className="mb-4 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                    Editor
                </h2>
                <textarea
                    className="h-full w-full resize-none rounded-md border border-zinc-300 bg-white p-4 font-mono text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type your markdown here..."
                />
            </div>

            {/* Right Column: Preview */}
            <div className="flex h-1/2 w-full flex-col bg-zinc-100 p-8 dark:bg-zinc-950 md:h-full md:w-1/2">
                <h2 className="mb-4 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                    Preview
                </h2>
                <div className="h-full overflow-y-auto rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
                    <article className="prose prose-zinc max-w-none dark:prose-invert">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}
