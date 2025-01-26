import { useEffect, useState } from "react"

/**
 * @param {{title?: string, className?: string, children?: React.ReactNode}} args
 * @returns {JSX.Element}
 */
export default function Page({ title = "", className = "", children }) {
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        const formatTitle = title.charAt(0).toUpperCase() + title.slice(1)
        document.title = `Tracker - ${formatTitle}`
    }, [title])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div className={`${isScrolling ? 'border-b bg-floating-light/90 dark:bg-floating-dark/90 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'} transition-[background-color,border] fixed top-0 left-0 z-10 w-full border-gray-300 dark:border-white/20 theme-transition`}>
                <header className={`${isScrolling ? 'py-4 text-2xl' : 'py-8 text-4xl'} transition-[padding,font-size] max-w-[384px] mx-auto px-4 tracking-tight font-bold text-dark dark:text-light`}>
                    {title}
                </header>
            </div>
            <div className="h-14" />
            <main className={`flex flex-col gap-4 ${className}`}>
                {children}
            </main>
        </>
    )
}