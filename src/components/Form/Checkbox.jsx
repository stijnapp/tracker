import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Checkbox({ label, checked, setChecked, className = "", required = false, ...props }) {
    return (
        <label className={`${className} relative flex items-center gap-2`}>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} required={required} {...props} className="h-5 w-5 cursor-pointer outline-none appearance-none rounded border border-gray-400 dark:border-gray-500 checked:bg-primary checked:border-primary transition-[background-color,border-color]" />
            <FontAwesomeIcon icon={faCheck} className={`${checked ? 'opacity-100' : 'opacity-0'} transition-[opacity] absolute h-4 w-4 left-0.5 text-white`} />
            <span>{label}{required && <span className="text-danger"> *</span>}</span>
        </label>
    )
}