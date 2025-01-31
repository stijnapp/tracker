import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Checkbox({ label, className = "", ...props }) {
    return (
        <label className={`${className} relative flex items-center gap-2`}>
            <input type="checkbox" {...props} className="peer h-5 w-5 cursor-pointer outline-none appearance-none rounded border border-gray-400 dark:border-gray-500 checked:bg-primary checked:border-primary transition-[background-color,border-color]" />
            <FontAwesomeIcon icon={faCheck} className="opacity-0 peer-checked:opacity-100 transition-[opacity] absolute h-4 w-4 left-0.5 text-white" />
            <span className="peer-required:after:content-['_*'] peer-required:after:text-danger">{label}</span>
        </label>
    )
}