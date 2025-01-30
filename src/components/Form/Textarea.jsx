export default function Textarea({ label, value, setValue, className = "", ...props }) {
    return (
        <div className={`relative ${className}`}>
            <label>
                <textarea
                    placeholder={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                    className="floating-label-input peer"
                />
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}