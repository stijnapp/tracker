/**
 * A simple badge component
 * @param {Object} props
 * @param {string} [props.className=""] - Optional styling for the badge
 * @param {JSX.Element} props.children - The content of the badge
 * @returns {JSX.Element} The badge component
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