/**
 * Textarea component
 * @param {Object} props
 * @param {string} props.label - The label of the textarea
 * @param {string} [props.className=""] - Optional styling for the textarea
 * @returns {JSX.Element} The textarea component
 */
export default function Textarea({ label, className = "", ...props }) {
    return (
        <div className={`relative ${className}`}>
            <label>
                <textarea
                    placeholder={label}
                    {...props}
                    rows="2"
                    className="floating-label-input peer field-sizing-content min-h-[4.1rem] max-h-[50svh] -mb-1.5"
                />
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}