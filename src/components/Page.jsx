import { useEffect } from "react"

/**
 * @param {{title?: string, className?: string, children?: React.ReactNode}} props
 */
export default function Page({ title = "", className = "", children }) {
    useEffect(() => {
        const formatTitle = title.charAt(0).toUpperCase() + title.slice(1)
        document.title = `Tracker - ${formatTitle}`
    }, [title])

    return (
        <>
            <header className="mb-4 text-4xl tracking-tight font-bold text-dark dark:text-light">
                {title}
            </header>
            <main className={className}>
                {children}
            </main>
        </>
    )
}