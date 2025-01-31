export default function RadioButtonGroup({ label, options, value, setValue, hideLabel = false, className = "", required = false, ...props }) {
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
                                onChange={(e) => setValue(e.target.value)}
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