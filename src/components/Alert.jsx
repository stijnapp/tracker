import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { getMsFromDuration } from "../helpers/stringManipulation";
import AnimateInOut from "./AnimateInOut";

/**
 * An alert component that displays a message to the user
 * @param {Object} props
 * @param {string} props.message - The message to display inside the alert
 * @param {Function} props.setMessage - The function to set the message state
 * @param {'danger' | 'warning' | 'success' | 'info'} [props.type="danger"] - The type of alert (used for styling)
 * @param {boolean} [props.isCloseable=true] - Whether the alert can be closed by the user
 * @param {boolean} [props.autoClose=false] - Whether the alert should close automatically
 * @param {string} [props.className=""] - Optional styling for the alert
 * @returns {AnimateInOut} The alert component
 */
export default function Alert({ message, setMessage, type = "danger", isCloseable = true, autoClose = false, className = "" }) {
    const autoCloseAfterMs = 5000
    // ? `stepDuration` needs to be tailwind duration, e.g. 'duration-[300ms]'
    const stepDuration = 'duration-[100ms]'
    const progressBarRef = useRef()

    const typeColors = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        danger: 'text-danger',
        warning: 'text-warning',
        success: 'text-success',
        info: 'text-info',
    }
    const textColor = typeColors[type] || typeColors.danger

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
        <AnimateInOut restartAnimationOnChange className={`rounded-md border ${textColor} bg-current border-current`}>
            {message && (
                <div className={`${className} flex items-center justify-between w-full px-4 py-4 gap-2 overflow-hidden bg-floating-light/95 dark:bg-floating-dark/95 brightness-110 dark:brightness-125`} role="alert">
                    <div className="font-medium break-words brightness-[0.75]">
                        {message}
                    </div>
                    {autoClose && (
                        <div ref={progressBarRef} className={`absolute bottom-0 left-0 h-1 bg-current transition-[width] ease-linear ${stepDuration}`} style={{ width: 0 }} />
                    )}
                    {isCloseable &&
                        <button onClick={handleHide} aria-label="Close" className="flex items-center justify-center h-10 w-10 -my-2 aspect-square -mr-2 rounded-md transition-[--ring] focus:outline-none focus:ring-2 focus:ring-current brightness-[0.75]">
                            <span className="sr-only">Close</span>
                            <FontAwesomeIcon icon={faXmark} className="text-lg" />
                        </button>
                    }
                </div>
            )}
        </AnimateInOut>
    )
}