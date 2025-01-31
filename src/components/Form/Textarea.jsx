export default function Textarea({ label, className = "", ...props }) {
    return (
        <div className={`relative ${className}`}>
            <label>
                <textarea
                    placeholder={label}
                    {...props}
                    className="floating-label-input peer -mb-1.5"
                />
                <span className="floating-label">
                    {label}
                </span>
            </label>
        </div>
    )
}