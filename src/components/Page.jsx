export default function Page({ title = "", className = "", children }) {
    return (
        <>
            <header className="mb-4 text-4xl tracking-tight font-bold text-gray-900">
                {title}
            </header>
            <main className={className}>
                {children}
            </main>
        </>
    )
}