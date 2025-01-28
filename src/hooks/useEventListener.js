import { useEffect } from "react"

/**
 * @param {string} type - Event type
 * @param {function(Event): void} callback - Function to run when event is triggered
 * @param {HTMLElement} element - Element to attach event listener to. Default is window
 */
export default function useEventListener(type, callback, element = window) {
    useEffect(() => {
        if (!element) return

        element.addEventListener(type, callback)

        return () => {
            element.removeEventListener(type, callback)
        }
    }, [type, callback, element])
}