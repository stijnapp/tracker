import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { getMsFromDuration } from "../helpers/stringManipulation";

/**
 * 
 * @param {{
 *  message: string | '' | null,
 *  setMessage: (value: string) => void,
 *  type?: 'danger' | 'warning' | 'success' | 'info',
 *  isCloseable?: boolean,
 *  autoClose?: boolean,
 *  className?: string
 * }} props
 */
export default function Alert({ message, setMessage, /* type = "danger", */ isCloseable = true, autoClose = false, className = "" }) {
    // TODO: implement type
    const [isHiding, setIsHiding] = useState(true)
    const duration = 'duration-[200ms]'
    const autoCloseAfterMs = 'duration-[5s]'
    const progressBarRef = useRef()

    if (setMessage === undefined) {
        console.error('Alert component requires setMessage prop')
    }

    useEffect(() => {
        let progressBarHideTimeout

        setIsHiding(!message)

        if (message && autoClose) {
            setTimeout(() => {
                progressBarRef.current.style.width = '100%'
            }, 0)

            progressBarHideTimeout = setTimeout(() => {
                setIsHiding(true)
            }, getMsFromDuration(autoCloseAfterMs))
        }

        return () => {
            clearTimeout(progressBarHideTimeout)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    useEffect(() => {
        let messageClearTimeout

        if (isHiding) {
            messageClearTimeout = setTimeout(() => {
                setMessage('')
            }, getMsFromDuration(duration))
        }

        return () => {
            clearTimeout(messageClearTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHiding])

    if (isHiding && !message) return null

    // TODO: animate height so content doesn't jump
    return (
        <div className={`${className} ${isHiding ? 'opacity-0 translate-x-2/4 ease-in' : 'opacity-100 ease-out'} flex items-center justify-between w-full py-2 px-4 gap-2 overflow-hidden rounded-md transition-all ${duration} ease-out bg-danger/5 backdrop-blur-2xl dark:backdrop-blur-3xl border border-danger text-danger brightness-110 dark:brightness-125`} role="alert">
            <div className="font-medium break-words brightness-[0.75]">
                {message}
            </div>
            {autoClose && (
                <div ref={progressBarRef} className={`absolute bottom-0 left-0 h-1 bg-danger transition-all ease-linear ${autoCloseAfterMs}`} style={{ width: 0 }} />
            )}
            {isCloseable &&
                <button onClick={() => setIsHiding(true)} className="flex items-center justify-center h-10 w-10 aspect-square -mr-2 rounded-md focus:ring-2 focus:ring-danger/80 hover:bg-danger/15 brightness-[0.75]" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            }
        </div>
    )
}