import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import AnimateInOut from "./AnimateInOut"
import HR from "./HR"

/**
 * A collapsible component with a title and children
 * @param {Object} props
 * @param {string} [props.title=""] - The title of the collapse
 * @param {boolean} [props.openByDefault=false] - Whether the collapse is open by default
 * @param {string} [props.className=""] - Optional styling for the collapse
 * @param {JSX.Element} props.children - The children of the collapse
 */
export default function Collapse({ title = "", openByDefault = false, className = "", children }) {
    const [isOpened, setIsOpened] = useState(openByDefault)

    return (
        <article className="flex flex-col rounded-lg shadow dark:shadow-md bg-floating-light dark:bg-floating-dark theme-transition">
            <button onClick={() => setIsOpened(!isOpened)} aria-label={isOpened ? 'Close' : 'Expand'} className="flex justify-between items-center p-4 text-start outline-none transition-[color] focus:text-primary" >
                <h1 className="font-semibold text-xl">{title}</h1>
                <FontAwesomeIcon icon={faAngleDown} className={`${isOpened ? 'rotate-0' : 'rotate-90'} transition-[box-shadow,transform] mr-1 text-lg`} />
            </button>
            <AnimateInOut className={`${className} w-full flex flex-col gap-4 p-4 pt-0`}>
                {isOpened && <>
                    <HR className="h-auto mb-1.5" />
                    {children}
                </>}
            </AnimateInOut>
        </article>
    )
}
