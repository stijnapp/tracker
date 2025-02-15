/**
 * Floating label input component
 * @param {Object} props
 * @param {string} props.type - The type of input
 * @param {string} props.label - The label of the input
 * @param {string} [props.className=""] - Optional styling for the input
 * @param {React.Ref} props.inputRef - The ref of the input element
 * @returns {JSX.Element} The input component
 */
export default function Input({ type, label, className = "", inputRef, ...props }) {
    return (
        <div className={`relative ${className}`}>
            <label>
                <input
                    type={type}
                    placeholder={label}
                    ref={inputRef}
                    {...props}
                    className={`${type === 'color' ? 'h-12' : ''} floating-label-input peer`}
                />
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}

