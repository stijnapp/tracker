export default function FileInput({ label, value, setValue, className = "", ...props }) {
    const handleFileChange = (e) => {
        if (!e.target.files) return
        setValue(e.target.files[0])
    }

    // TODO: add styling
    // TODO: add remove button
    return (
        <>
            {label}
            <input
                type="file"
                onChange={handleFileChange}
                {...props}
                className={`${className}`}
            />
            {value && <>
                Preview:
                <img src={URL.createObjectURL(value)} alt={value.name} className="w-full rounded-md shadow-md" />
                <ul>
                    <li>Name: {value.name}</li>
                    <li>Type: {value.type}</li>
                    <li>Size: {value.size} bytes</li>
                </ul>
            </>}
        </>
    )
}