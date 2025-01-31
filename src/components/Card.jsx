/**
 * A card component with a title and children
 * @param {Object} props
 * @param {string} [props.title=""] - The title of the card
 * @param {string} [props.className=""] - Optional styling for the card
 * @param {JSX.Element} props.children - The children of the card
 */
export default function Card({ title = "", className = "", children }) {
    return (
        <article className="flex flex-col gap-3 p-4 rounded-lg shadow dark:shadow-md bg-floating-light dark:bg-floating-dark theme-transition">
            {title && <h1 className="font-semibold text-xl">{title}</h1>}
            {children && <div className={className}>{children}</div>}
        </article>
    )
}