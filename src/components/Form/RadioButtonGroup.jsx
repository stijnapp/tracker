/**
 * @typedef {Object} Option
 * @property {string} value - The value of the option
 * @property {string} label - The label of the option
 */

/**
 * A radio button group component
 * @param {Object} props
 * @param {string} props.label - The label of the radio button group
 * @param {Option[]} props.options - The options for the radio button group
 * @param {string} props.value - The value of the currently selected radio button
 * @param {boolean} [props.hideLabel=false] - Whether to hide the label
 * @param {string} [props.className=""] - Optional styling for the radio button group
 * @param {boolean} [props.required=false] - Whether the radio button group is required
 * @returns {JSX.Element} The radio button group component
 */
export default function RadioButtonGroup({ label, options, value, hideLabel = false, className = "", required = false, ...props }) {
    return (
        <fieldset className={`relative ${className}`}>
            {!hideLabel && <legend className="mb-1">{label}{required && <span className="text-danger"> *</span>}</legend>}
            <ul className="flex flex-col gap-2">
                {options.map(({ value: optionValue, label: optionLabel }) => (
                    <li key={optionValue}>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value={optionValue}
                                checked={value === optionValue}
                                {...props}
                                required={required}
                                className="box-content h-1.5 w-1.5 appearance-none rounded-full border-4 border-floating-light dark:border-floating-dark bg-floating-light dark:bg-floating-dark bg-clip-padding outline-none ring-1 ring-black/20 dark:ring-white/10 checked:border-primary checked:ring-primary"
                            />
                            {optionLabel}
                        </label>
                    </li>
                ))}
            </ul>
        </fieldset>
    )
}