import { useEffect, useState } from 'react'
import useEventListener from '../hooks/useEventListener'

/**
 * Component that wraps a page with a header and a main section
 * @param {Object} props
 * @param {string} props.title - The title of the page
 * @param {string} [props.className] - Optional styling for the main section
 * @param {JSX.Element} props.children - The content of the page
 * @returns {JSX.Element} The page component
 */
export default function Page({ title, className = "", children }) {
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        const formatTitle = title.charAt(0).toUpperCase() + title.slice(1)
        document.title = `Tracker - ${formatTitle}`
        window.scrollTo(0, 0)
    }, [title])

    useEventListener('scroll', () => {
        setIsScrolling(window.scrollY > 20)
    })

    return (
        <>
            <div className={`${isScrolling ? 'h-16 bg-floating-light/85 dark:bg-floating-dark/85 backdrop-blur border-gray-300 dark:border-white/20' : 'h-24 bg-transparent backdrop-blur-none'} flex items-center justify-center motion-safe:transition-[height,background-color,backdrop-filter,border] fixed top-0 left-0 z-10 w-full border-b border-transparent theme-transition`}>
                <header className={`${isScrolling ? 'text-2xl' : 'text-4xl'} motion-safe:transition-[padding,font-size] w-[384px] px-4 tracking-tight font-bold text-dark dark:text-light capitalize`}>
                    {title}
                </header>
            </div>
            <main className={`flex flex-col gap-4 pt-24 pb-40 ${className}`}>
                {children}
            </main>
        </>
    )
}