import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function FileInput({ label, value, setValue, showPreview = false, className = "", ...props }) {
    const handleFileChange = (e) => {
        if (!e.target.files) return
        setValue(e.target.files[0])
    }

    // TODO: add remove button
    // TODO: improve preview
    return (
        <>
            <div className={`relative ${className}`}>
                <label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        {...props}
                        className="floating-label-input !p-0 peer file:px-2 file:py-1.5 file:mr-2 file:rounded-md file:transition-[border,box-shadow] file:duration-200 file:bg-transparent file:dark:text-light file:border-0 file:border-r file:border-white file:dark:border-gray-300 file:focus:border-primary file:focus:ring-2 file:focus:ring-primary"
                    />
                    <span className="floating-label">
                        {label}
                    </span>
                </label>
            </div>
            {value && showPreview && value.type.startsWith('image') && (
                <div>
                    <button className="btn-secondary" onClick={() => setValue(null)}><FontAwesomeIcon icon={faTrash} /></button>
                    Preview:
                    <img src={URL.createObjectURL(value)} alt={value.name} className="w-full rounded-md shadow-md" />
                    <ul>
                        <li>Name: {value.name}</li>
                        <li>Type: {value.type}</li>
                        <li>Size: {value.size} bytes</li>
                    </ul>
                </div>
            )}
        </>
    )
}