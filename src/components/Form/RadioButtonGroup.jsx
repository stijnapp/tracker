/**
 * @param {{label: string, options: {value: string, label: string}[], value: string, setValue: (value: string) => void}} args
 * @returns {JSX.Element}
 */
export default function RadioButtonGroup({ label, options, value, setValue }) {
    return (
        <fieldset className="flex flex-col gap-2">
            <legend className="font-medium">{label}</legend>
            {options.map(({ value: optionValue, label: optionLabel }) => (
                <label key={optionValue} className="flex items-center gap-2">
                    <input type="radio" name={label} value={optionValue} checked={value === optionValue} onChange={() => setValue(optionValue)} />
                    <span>{optionLabel}</span>
                </label>
            ))}
        </fieldset>
    )
}

