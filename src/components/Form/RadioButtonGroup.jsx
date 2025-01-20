/**
 * @param {{
 *  label: string,
 *  options: {value: string, label: string}[],
 *  value: string,
 *  setValue: (value: string) => void,
 *  className?: string
 * }} args
 * @returns {JSX.Element}
 */
export default function RadioButtonGroup({ label, options, value, setValue, className = "" }) {
    // TODO: go over classes
    return (
        <fieldset className={className}>
            <legend className="mb-2 font-semibold">{label}</legend>
            <ul className="items-center w-full text-sm font-medium bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600">
                {options.map(({ value: optionValue, label: optionLabel }) => (
                    // TODO: last item doesn't need border
                    // border-b border-gray-200 sm:border-b-0 sm:border-r
                    <li key={optionValue} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input type="radio" id={optionValue} name="list-radio" value={optionValue} checked={value === optionValue} onChange={() => setValue(optionValue)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor={optionValue} className="w-full py-3 ms-2 text-sm font-medium">{optionLabel}</label>
                        </div>
                    </li>
                ))}
            </ul>
        </fieldset>
    )
}

