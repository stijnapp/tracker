/**
 * Floating label input component
 * @param {Object} props
 * @param {string} props.type - The type of input
 * @param {string} props.label - The label of the input
 * @param {string} [props.className=""] - Optional styling for the input
 * @returns {JSX.Element} The input component
 */
export default function Input({ type, label, className = "", ...props }) {
    return (
        <div className={`relative ${className}`}>
            <label>
                <input
                    type={type}
                    placeholder={label}
                    {...props}
                    className={`${type === 'color' && 'h-12'} floating-label-input peer`}
                />
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}

