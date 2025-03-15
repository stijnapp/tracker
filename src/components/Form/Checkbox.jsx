import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * A checkbox component
 * @param {Object} props
 * @param {string} props.label - The label of the checkbox
 * @param {string} [props.className=""] - Optional styling for the checkbox
 * @returns {JSX.Element} The checkbox component
 */
export default function Checkbox({ label, className = "", ...props }) {
    return (
        <label className={`${className} relative flex items-center gap-2`}>
            <input type="checkbox" {...props} className="peer h-5 w-5 cursor-pointer outline-none appearance-none rounded border border-gray-400 dark:border-gray-500 checked:bg-primary checked:border-primary motion-safe:transition-[background-color,border-color] disabled:opacity-50 disabled:cursor-not-allowed" />
            <FontAwesomeIcon icon={faCheck} className="opacity-0 peer-checked:opacity-100 peer-disabled:peer-checked:opacity-50 motion-safe:transition-[opacity] absolute h-4 w-4 left-0.5 text-white peer-disabled:cursor-not-allowed" />
            <span className="peer-required:after:content-['_*'] peer-required:after:text-danger peer-disabled:opacity-50 peer-disabled:cursor-not-allowed">{label}</span>
        </label>
    )
}