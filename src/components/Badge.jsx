/**
 * @param {{
*  className?: string
*  children: JSX.Element | JSX.Element[]
* }} props
* @returns {JSX.Element}
*/
export default function Badge({ className = "", children }) {
    return (
        <span className={`px-2.5 py-0.5 rounded-md bg-primary/15 text-primary text-xs font-medium ${className}`}>
            <span className="brightness-75 dark:brightness-125">
                {children}
            </span>
        </span>
    )
}