/**
 * @param {{
*  title?: string,
*  className?: string
*  children: JSX.Element | JSX.Element[]
* }} args
* @returns {JSX.Element}
*/
export default function Card({ title = "", className = "", children }) {
    return (
        <div className="p-4 rounded-lg shadow bg-floating-light dark:bg-floating-dark theme-transition">
            {title && <h1 className="font-semibold mb-2">{title}</h1>}
            <div className={className}>
                {children}
            </div>
        </div>
    )
}