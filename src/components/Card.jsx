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
        <div className={`bg-floating-light dark:bg-floating-dark shadow rounded-lg p-4 ${className}`}>
            {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
            {children}
        </div>
    )
}