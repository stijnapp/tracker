export default function Checkbox({ label, value, setValue, className = "", required = false, ...props }) {
    // TODO: fix hover + background color
    return (
        <label className="flex items-center gap-2">
            <input id="default-checkbox" type="checkbox" value={value} onChange={(e) => setValue(e.target.checked)} required={required} {...props} className={`${className} w-4 h-4 accent-primary outline-none peer`} />
            {label}{required && <span className="text-danger"> *</span>}
        </label>
    )
}