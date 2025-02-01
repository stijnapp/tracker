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
 * @param {string} props.value - The value of the currently selected option
 * @param {string} [props.className=""] - Optional styling for the select
 * @returns {JSX.Element} The select component
 */
export default function Select({ label, options, value, className = "", ...props }) {
    // TODO: darkmode dropdown menu color
    // TODO: search (https://preline.co/docs/advanced-select.html#search-inside-dropdown)
    return (
        <div className={`relative ${className}`}>
            <label>
                <select
                    className="floating-label-input peer"
                    defaultValue={value}
                    {...props}
                >
                    {options.map(({ value: optionValue, label: optionLabel }) => (
                        <option key={optionValue} value={optionValue}>{optionLabel}</option>
                    ))}
                </select>
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}