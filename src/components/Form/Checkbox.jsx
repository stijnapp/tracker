export default function Checkbox({ label, checked, setChecked, className = "", required = false, ...props }) {
    // TODO: fix hover + background color
    return (
        <label className="flex items-center gap-2">
            <input id="default-checkbox" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} required={required} {...props} className={`${className} w-4 h-4 accent-primary outline-none peer`} />
            <span>{label}{required && <span className="text-danger"> *</span>}</span>
        </label>
    )
}