export default function Checkbox({ label, value, setValue, className = "", required = false, ...props }) {
    // TODO: fix colors
    return (
        <label className="flex items-center gap-2">
            <input id="default-checkbox" type="checkbox" value={value} onChange={(e) => setValue(e.target.checked)} required={required} {...props} className={`${className} w-4 h-4 accent-primary peer`} />
            {label}{required && <span className="text-danger"> *</span>}
        </label>
    )
}