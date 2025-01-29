import { useEffect, useState } from "react"
import useEventListener from "../hooks/useEventListener"

/**
 * Component that wraps a page with a header and a main section
 * @param {Object} props
 * @param {string} props.title - The title of the page
 * @param {string} [props.className] - Optional styling for the main section
 * @param {React.ReactNode} props.children - The content of the page
 * @returns {JSX.Element} The page component
 */
export default function Page({ title, className = "", children }) {
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        const formatTitle = title.charAt(0).toUpperCase() + title.slice(1)
        document.title = `Tracker - ${formatTitle}`
    }, [title])

    useEventListener('scroll', () => {
        setIsScrolling(window.scrollY > 20)
    })

    return (
        <>
            <div className={`${isScrolling ? 'border-b bg-floating-light/85 dark:bg-floating-dark/85 backdrop-blur' : 'bg-transparent backdrop-blur-none'} transition-[background-color,border] fixed top-0 left-0 z-10 w-full border-gray-300 dark:border-white/20 theme-transition`}>
                <header className={`${isScrolling ? 'py-4 text-2xl' : 'py-7 text-4xl'} transition-[padding,font-size] max-w-[384px] mx-auto px-4 tracking-tight font-bold text-dark dark:text-light`}>
                    {title}
                </header>
            </div>
            <main className={`flex flex-col gap-4 pt-24 pb-40 ${className}`}>
                {children}
            </main>
        </>
    )
}