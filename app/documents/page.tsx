import Link from "next/link";

const mockDocuments = [
    { id: 1, title: "Project Proposal", date: "2025-12-06" },
    { id: 2, title: "Meeting Notes", date: "2023-10-26" },
    { id: 3, title: "Quarterly Review", date: "2023-10-27" },
];

export default function DocumentsDashboard() {
    return (
        <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        Documents
                    </h1>
                    <Link
                        href="/documents/new"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                    >
                        Create New Document
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mockDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div>
                                <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                                    {doc.title}
                                </h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    Last edited: {doc.date}
                                </p>
                            </div>
                            <div className="mt-4">
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                    Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
