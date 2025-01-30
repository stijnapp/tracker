export default function Select({ label, value, setValue, options, className = "", ...props }) {
    return (
        <div className="relative">
            <label>
                <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                    className={`${className} w-full p-2 rounded-md transition-[box-shadow] duration-200 bg-transparent placeholder-transparent outline-none border border-gray-400 dark:border-gray-500 focus:border-primary focus:ring-1 focus:ring-primary peer`}
                >
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <span className="absolute left-1.5 -top-2.5 peer-focus:-top-2.5 peer-placeholder-shown:top-2.5 text-sm peer-focus:text-sm peer-placeholder-shown:text-base px-0.5 text-inherit peer-placeholder-shown:text-gray-400 bg-floating-light dark:bg-floating-dark transition-[color,top,font-size] duration-200 peer-focus:text-primary peer-required:after:[*]">
                    {label}
                </span>
            </label>
        </div>
    )
}