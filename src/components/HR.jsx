/**
 * @param {{
*  text?: string,
*  className?: string
* }} args
* @returns {JSX.Element}
*/
export default function HR({ text = null, className = "" }) {
    return (
        <div className="relative">
            <hr className={`h-px my-6 bg-gray-500/50 border-0 ${className}`} />
            {text && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-floating-light dark:bg-floating-dark text-sm text-gray-500 dark:text-gray-400 theme-transition">{text}</span>}
        </div>
    )
}