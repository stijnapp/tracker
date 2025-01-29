export default function FileInput({ label, setValue, className = "", ...props }) {
    const handleFileChange = (e) => {
        if (!e.target.files) return
        setValue(e.target.files[0])
    }

    // TODO: add styling
    return (
        <>
            {label}
            <input
                type="file"
                onChange={handleFileChange}
                {...props}
                className={`${className}`}
            />
        </>
    )
}