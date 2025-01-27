import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { getMsFromDuration } from "../helpers/stringManipulation";
import AnimateInOut from "./AnimateInOut";

/**
 * @param {{
 *  message: string | '' | null,
 *  setMessage: (value: string) => void, // required if isCloseable is true
 *  type?: 'danger' | 'warning' | 'success' | 'info',
 *  isCloseable?: boolean,
 *  autoClose?: boolean,
 *  className?: string
 * }} args
 * @returns {AnimateInOut}
 */
export default function Alert({ message, setMessage, /* type = "danger", */ isCloseable = true, autoClose = false, className = "" }) {
    // TODO: implement type
    const autoCloseAfterMs = 5000
    // `stepDuration` needs to be tailwind duration, e.g. 'duration-[300ms]'
    const stepDuration = 'duration-[100ms]'
    const progressBarRef = useRef()

    if (isCloseable && setMessage === undefined) {
        console.error('Alert component requires setMessage prop')
    }
    if (!isCloseable && autoClose) {
        console.error('Alert component cannot be autoClose without isCloseable')
    }

    const handleHide = () => {
        if (autoClose) {
            setMessage(null)
        } else {
            setMessage('')
        }
    }

    useEffect(() => {
        const updatesPerSecond = 1000 / getMsFromDuration(stepDuration)
        const startingWidth = 0
        const endingWidth = 100
        let interval

        if (autoClose && message) {
            let progress = startingWidth
            interval = setInterval(() => {
                progress += endingWidth / updatesPerSecond / (autoCloseAfterMs / 1000)
                progressBarRef.current.style.width = `${progress}%`

                if (progress >= endingWidth) handleHide()
            }, 1000 / updatesPerSecond)
        }

        return () => {
            clearInterval(interval)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    return (
        <AnimateInOut restartAnimationOnChange className="rounded-md border border-danger">
            {message && (
                <div className={`${className} flex items-center justify-between w-full px-4 py-2 gap-2 overflow-hidden bg-danger/5 backdrop-blur-2xl dark:backdrop-blur-3xl text-danger brightness-110 dark:brightness-125`} role="alert">
                    <div className="font-medium break-words brightness-[0.75]">
                        {message}
                    </div>
                    {autoClose && (
                        <div ref={progressBarRef} className={`absolute bottom-0 left-0 h-1 bg-danger transition-[width] ease-linear ${stepDuration}`} style={{ width: 0 }} />
                    )}
                    {isCloseable &&
                        <button onClick={handleHide} aria-label="Close" className="flex items-center justify-center h-10 w-10 aspect-square -mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-danger/80 hover:bg-danger/15 brightness-[0.75]">
                            <span className="sr-only">Close</span>
                            <FontAwesomeIcon icon={faXmark} className="text-lg" />
                        </button>
                    }
                </div>
            )}
        </AnimateInOut>
    )
}