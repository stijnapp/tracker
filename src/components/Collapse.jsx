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
export default function Collapse({ title = "", subtitle = "", openByDefault = false, className = "", children }) {
    const [isOpened, setIsOpened] = useState(openByDefault)

    return (
        <article className="rounded-lg shadow dark:shadow-md bg-floating-light dark:bg-floating-dark theme-transition">
            <button onClick={() => setIsOpened(!isOpened)} aria-label={isOpened ? 'Close' : 'Expand'} className="flex justify-between items-center p-4 w-full text-start outline-none transition-[color] focus:text-primary" >
                <div>
                    <h1 className="font-semibold text-xl capitalize">{title}</h1>
                    {subtitle && <p className="-mt-0.5 text-base font-normal capitalize text-gray-500 dark:text-gray-400">- {subtitle}</p>}
                </div>
                <FontAwesomeIcon icon={faAngleDown} className={`${isOpened ? 'rotate-0' : 'rotate-90'} transition-[box-shadow,transform] mr-1 text-lg`} />
            </button>
            <AnimateInOut>
                {isOpened && <>
                    <HR className="px-4 h-auto" />
                    <div className={`${className} p-4`}>
                        {children}
                    </div>
                </>}
            </AnimateInOut>
        </article>
    )
}
