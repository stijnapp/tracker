import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

/**
 * 
 * @param {{
 *  message: string | '' | null,
 *  setMessage: (value: string) => void,
 *  type?: 'danger' | 'warning' | 'success' | 'info',
 *  isCloseable?: boolean,
 *  autoCloseAfterMs?: number | null,
 *  className?: string
 * }} props
 */
export default function Alert({ message, setMessage, type = "danger", isCloseable = true, autoCloseAfterMs = null, className = "" }) {
    // TODO: implement type
    // TODO: implement autoCloseAfterMs
    const [isHiding, setIsHiding] = useState(true)
    const duration = "duration-300"

    if (setMessage === undefined) {
        console.error('Alert component requires setMessage prop')
    }

    useEffect(() => {
        setIsHiding(!message)
    }, [message])

    useEffect(() => {
        let ignore = false

        if (isHiding) {
            const timeout = setTimeout(() => {
                if (ignore) return
                setMessage('')
                clearTimeout(timeout)
            }, duration.split('-')[1])
        }

        return () => {
            ignore = true
            clearTimeout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHiding])

    if (isHiding && !message) return null

    // TODO: animate height so content doesn't jump
    return (
        <div className={`${className} ${isHiding ? 'opacity-0 translate-x-10' : 'opacity-100'} flex items-center justify-between w-full py-2 px-4 gap-4 rounded-md transition-all ${duration} ease-out bg-danger/5 border border-danger text-danger`} role="alert">
            <div className="font-medium break-words brightness-[0.75]">
                {message}
            </div>
            {isCloseable &&
                <button onClick={() => setIsHiding(true)} className="flex items-center justify-center h-8 w-8 aspect-square -mr-1.5 rounded-md focus:ring-2 focus:ring-danger/80 hover:bg-danger/15 brightness-[0.75]" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            }
        </div>
    )
}