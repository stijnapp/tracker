import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @param {{
 *  label: string,
 *  options: {value: string, label: string, icon?: IconDefinition}[],
 *  value: string,
 *  setValue: (value: string) => void,
 *  hideLabel?: boolean,
 *  className?: string
 * }} args
 * @returns {JSX.Element}
 */
export default function RadioButtonGroup({ label, options, value, setValue, hideLabel = false, className = "" }) {
    return (
        <fieldset className={className}>
            <legend className={`mb-2 font-semibold ${hideLabel && 'sr-only'}`}>{label}</legend>
            <ul className="flex flex-col gap-1">
                {options.map(({ value: optionValue, label: optionLabel, icon }) => (
                    <li key={optionValue} >
                        <label htmlFor={optionValue} className="flex justify-between gap-4 items-center p-2 rounded-lg ring-1 ring-transparent has-[:checked]:ring-primary has-[:checked]:text-primary has-[:checked]:bg-primary/10">
                            {icon && <FontAwesomeIcon icon={icon} className="aspect-square" />}
                            <p className="flex-auto">{optionLabel}</p>
                            <input type="radio" name={label} id={optionValue} checked={value === optionValue} onChange={() => setValue(optionValue)} className="box-content h-2 w-2 appearance-none rounded-full border-[5px] border-floating-light dark:border-floating-dark bg-floating-light dark:bg-floating-dark bg-clip-padding outline-none ring-1 ring-black/20 dark:ring-white/10 checked:border-primary checked:ring-primary" />
                        </label>
                    </li>
                ))}
            </ul>
        </fieldset>
    )
}

