/**
 * Switch component
 * @param {Object} props
 * @param {string} props.label - The label of the switch
 * @param {string} [props.className=""] - Optional styling for the switch
 * @returns {JSX.Element} The switch component
 */
export default function Switch({ label, className = "", ...props }) {
    return (
        <label className={`${className} flex items-center gap-2`}>
            <input type="checkbox" {...props} className="sr-only peer" />
            <div className="bg-gray-500/50 peer-checked:bg-primary transition-[background-color] relative w-11 h-6 rounded-full
                peer-checked:before:translate-x-full before:transition-[transform] before:absolute before:top-0.5 before:left-0.5 before:w-5 before:h-5 before:rounded-full before:bg-white"></div>
            <span className="peer-required:after:content-['_*'] peer-required:after:text-danger">{label}</span>
        </label>
    )
}