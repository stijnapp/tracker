import { useEffect, useRef } from "react"
import HR from "./HR"

/**
 * @param {{
 *  showModal: boolean,
 *  onClose: () => void,
 *  title?: string,
 *  hasCloseBtn?: boolean,
 *  children?: React.ReactNode
 * }} args
 * @returns {JSX.Element}
 */
export default function Modal({ showModal, onClose, title = "", hasCloseBtn = true, children }) {
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialogElement = dialogRef.current

        if (showModal) {
            dialogElement.showModal()
            document.body.style.overflow = 'hidden'
        } else {
            dialogElement.close()
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    // TODO: maybe use custom hook like useEventListener('type', callback, element)
    useEffect(() => {
        const dialogElement = dialogRef.current

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        const handleOutsideClick = (e) => {
            if (e.target === dialogElement) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        dialogElement.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            dialogElement.removeEventListener('click', handleOutsideClick)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <dialog ref={dialogRef} className="z-50 w-full rounded-lg text-dark dark:text-light bg-floating-light dark:bg-floating-dark shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm focus:outline-none">
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