/**
 * @param {{
*  text?: string,
*  className?: string
* }} props
* @returns {JSX.Element}
*/
export default function HR({ text = null, className = "" }) {
    return (
        <div className={`relative flex gap-4 h-16 items-center ${className}`} role="separator">
            <hr className='flex-grow h-px bg-gray-500/50 border-0' aria-hidden />
            {text && <>
                <span className="text-sm text-gray-700 dark:text-gray-400 transition-[color] duration-200">{text}</span>
                <hr className='flex-grow h-px bg-gray-500/50 border-0' aria-hidden />
            </>}
        </div>
    )
}