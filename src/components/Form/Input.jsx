export default function Input({ type, label, value, setValue, className = "", ...props }) {
    return (
        <div className={`relative ${className}`}>
            <label>
                <input
                    type={type}
                    placeholder={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                    className={`${type === 'color' && 'h-12'} floating-label-input peer`}
                />
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}

