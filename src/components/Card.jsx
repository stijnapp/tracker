/**
 * @param {{
*  title?: string,
*  showLine?: boolean,
*  className?: string
*  children: JSX.Element | JSX.Element[]
* }} args
* @returns {JSX.Element}
*/
export default function Card({ title = "", showLine = false, className = "", children }) {
    return (
        <article className="p-4 rounded-lg shadow dark:shadow-md bg-floating-light dark:bg-floating-dark theme-transition">
            {title &&
                <>
                    <h1 className="mb-3 font-semibold text-xl">{title}</h1>
                    {showLine && <hr className="h-px mb-4 bg-gray-400/30 border-0" />}
                </>
            }
            <div className={className}>
                {children}
            </div>
        </article>
    )
}