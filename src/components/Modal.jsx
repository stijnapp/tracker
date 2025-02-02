import { useEffect, useRef, useState } from "react"
import { getMsFromDuration } from "../helpers/stringManipulation"
import useEventListener from "../hooks/useEventListener"
import HR from "./HR"

/**
 * A modal component using the html `<dialog />` element
 * @param {Object} props
 * @param {boolean} props.showModal - Whether to show the modal
 * @param {() => void} props.onClose - Function to set parent state to close the modal
 * @param {string} props.title - The title of the modal
 * @param {boolean} [props.hasCloseBtn=true] - Whether to show the close button
 * @param {JSX.Element} props.children - The content of the modal
 * @returns {JSX.Element} The modal component
 */
export default function Modal({ showModal, onClose, title, hasCloseBtn = true, children }) {
    const dialogRef = useRef(null)
    const dialogElement = dialogRef.current
    const [isVisible, setIsVisible] = useState(false)
    const duration = 'duration-[300ms]'

    useEffect(() => {
        if (!dialogElement) return

        if (showModal && !dialogElement.open) {
            dialogElement.showModal()
            document.body.style.overflow = 'hidden'
            setIsVisible(true)
        } else if (!showModal && dialogElement.open) {
            setIsVisible(false)
            setTimeout(() => {
                dialogElement.close()
                document.body.style.overflow = 'auto'
            }, getMsFromDuration(duration))
        }
    }, [showModal, dialogElement])

    useEventListener('close', () => {
        if (showModal) onClose()
        setIsVisible(false)
    }, dialogElement)

    useEventListener('keydown', (e) => {
        if (e.key === 'Escape' && showModal) {
            e.preventDefault()
            onClose()
        }
    })

    useEventListener('click', (e) => {
        if (e.target === dialogElement) onClose()
    }, dialogElement)

    return (
        <dialog ref={dialogRef} className={`
            ${isVisible ? 'opacity-100 translate-y-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm' : 'opacity-0 -translate-y-2 backdrop:bg-transparent backdrop:backdrop-blur-none'}
            ${duration} transition-[opacity,transform]
            backdrop:transition-[background-color,backdrop-filter] backdrop:duration-[inherit]
            w-full rounded-lg text-dark dark:text-light bg-floating-light dark:bg-floating-dark shadow-lg focus:outline-none
            `}>
            <div className="flex items-center justify-between p-4 rounded-t">
                <h3 className="text-xl font-semibold ">
                    {title}
                </h3>
                {hasCloseBtn &&
                    <button onClick={onClose} aria-label="Close" className="flex items-center justify-center h-10 w-10 -my-2 aspect-square rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400/50 hover:bg-gray-400/10 brightness-[0.75]">
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                }
            </div>
            <HR className="h-[0px] px-4" />
            <div className="flex flex-col gap-2 max-h-[calc(100dvh-12rem)] overflow-y-auto p-4">
                {children}
            </div>
        </dialog>
    )
}