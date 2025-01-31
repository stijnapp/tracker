export default function Select({ label, options, className = "", ...props }) {
    // TODO: darkmode dropdown menu color
    return (
        <div className={`relative ${className}`}>
            <label>
                <select
                    {...props}
                    className="floating-label-input peer"
                >
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}