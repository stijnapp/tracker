import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "../../components/Badge";

/**
 * @typedef {Object} Option
 * @property {string} value - The value of the option
 * @property {string} label - The label of the option
 * @property {IconDefinition} [icon] - The icon of the option (fontawesome icon)
 */

/**
 * A radio button group component
 * @param {Object} props
 * @param {string} props.label - The label of the radio button group
 * @param {Option[]} props.options - The options for the radio button group
 * @param {string} props.value - The value of the selected radio button
 * @param {Function} props.setValue - The function to set the value of the selected radio button
 * @param {string} [props.defaultValue=""] - The default value of the radio button group (will have a badge)
 * @param {boolean} [props.hideLabel=false] - Whether to hide the label
 * @param {string} [props.className=""] - Optional styling for the radio button group
 * @returns {JSX.Element} The radio button group component
 */
export default function RadioButtonGroup({ label, options, value, setValue, defaultValue = "", hideLabel = false, className = "" }) {
    return (
        <fieldset className={className}>
            <legend className={`mb-2 font-semibold ${hideLabel && 'sr-only'}`}>{label}</legend>
            <ul className="flex flex-col gap-1">
                {options.map(({ value: optionValue, label: optionLabel, icon }) => (
                    <li key={optionValue} >
                        <label htmlFor={optionValue} className="flex justify-between gap-4 items-center p-2 rounded-lg ring-1 ring-transparent has-[:checked]:ring-primary has-[:checked]:text-primary has-[:checked]:bg-primary/10">
                            {icon && <FontAwesomeIcon icon={icon} className="aspect-square" />}
                            <p className="flex-auto">{optionLabel}{optionValue === defaultValue && <Badge className="ml-2">Default</Badge>}</p>
                            <input type="radio" name={label} id={optionValue} checked={value === optionValue} onChange={() => setValue(optionValue)} className="box-content h-2 w-2 appearance-none rounded-full border-[5px] border-floating-light dark:border-floating-dark bg-floating-light dark:bg-floating-dark bg-clip-padding outline-none ring-1 ring-black/20 dark:ring-white/10 checked:border-primary checked:ring-primary" />
                        </label>
                    </li>
                ))}
            </ul>
        </fieldset>
    )
}
