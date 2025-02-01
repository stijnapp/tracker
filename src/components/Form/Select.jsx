/**
 * @typedef {Object} Option
 * @property {string} value - The value of the option
 * @property {string} label - The label of the option
 */

/**
 * Select component
 * @param {Object} props
 * @param {string} props.label - The label of the select
 * @param {Option[]} props.options - The options for the select
 * @param {string} [props.className=""] - Optional styling for the select
 * @returns {JSX.Element} The select component
 */
export default function Select({ label, options, className = "", ...props }) {
    // TODO: darkmode dropdown menu color
    return (
        <div className={`relative ${className}`}>
            <label>
                <select
                    {...props}
                    className="floating-label-input peer"
                >
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}