import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { getMsFromDuration } from "../helpers/stringManipulation";

/**
 * @param {{
 *  message: string | '' | null,
 *  setMessage: (value: string) => void, // required if isCloseable is true
 *  type?: 'danger' | 'warning' | 'success' | 'info',
 *  isCloseable?: boolean,
 *  autoClose?: boolean,
 *  className?: string
 * }} args
 * @returns {JSX.Element | null}
 */
export default function Alert({ message, setMessage, /* type = "danger", */ isCloseable = true, autoClose = false, className = "" }) {
    // TODO: implement type
    const [isHiding, setIsHiding] = useState(true)
    const [cachedMessage, setCachedMessage] = useState('')
    // `duration` needs to be tailwind duration, e.g. 'duration-[200ms]'
    const duration = 'duration-[200ms]'
    const autoCloseAfterMs = 'duration-[5s]'
    const progressBarRef = useRef()

    if (isCloseable && setMessage === undefined) {
        console.error('Alert component requires setMessage prop')
    }
    if (!isCloseable && autoClose) {
        console.error('Alert component cannot be autoClose without isCloseable')
    }

    useEffect(() => {
        let progressBarHideTimeout

        if (message && !cachedMessage) {
            // new message
            setCachedMessage(message)
            setIsHiding(false)
        } else if (message && cachedMessage && cachedMessage !== message) {
            // message changed
            // TODO: progress bar doesn't reset when message changes
            setIsHiding(true)
        } else if (!message && cachedMessage) {
            // message cleared
            setIsHiding(true)
        } else {
            setCachedMessage(message)
            setIsHiding(!message)
        }

        if (isCloseable && message && autoClose) {
            setTimeout(() => {
                progressBarRef.current.style.width = '100%'
            }, 0)

            progressBarHideTimeout = setTimeout(() => {
                setMessage(null)
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
                if (message && cachedMessage && cachedMessage !== message) {
                    // message changed
                    setIsHiding(false)
                    setCachedMessage(message)
                } else if (message === null || autoClose) {
                    // message cleared
                    if (isCloseable) setMessage(null)
                    setCachedMessage(null)
                } else {
                    if (isCloseable) setMessage('')
                    setCachedMessage('')
                }
            }, getMsFromDuration(duration))
        }

        return () => {
            clearTimeout(messageClearTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHiding])

    if (isHiding && !message && !cachedMessage) return null

    return (
        <div className={`${className} ${isHiding ? 'opacity-0 h-0 py-0 ease-in' : 'opacity-100 h-auto py-2 ease-out'} flex items-center justify-between w-full px-4 gap-2 overflow-hidden rounded-md transition-[opacity,height,padding] ${duration} bg-danger/5 backdrop-blur-2xl dark:backdrop-blur-3xl border border-danger text-danger brightness-110 dark:brightness-125`} role="alert">
            <div className="font-medium break-words brightness-[0.75]">
                {cachedMessage}
            </div>
            {autoClose && (
                <div ref={progressBarRef} className={`absolute bottom-0 left-0 h-1 bg-danger transition-[width] ease-linear ${autoCloseAfterMs}`} style={{ width: 0 }} />
            )}
            {isCloseable &&
                <button onClick={() => setIsHiding(true)} aria-label="Close" className="flex items-center justify-center h-10 w-10 aspect-square -mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-danger/80 hover:bg-danger/15 brightness-[0.75]">
                    <span className="sr-only">Close</span>
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            }
        </div>
    )
}