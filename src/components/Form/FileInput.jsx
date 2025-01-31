import { useMemo, useState } from "react"
import AnimateInOut from "../AnimateInOut"

export default function FileInput({ label, value, setValue, showPreview = false, className = "", ...props }) {
    const [isPreviewVisisible, setIsPreviewVisisible] = useState(false)

    const filePreview = useMemo(() => {
        if (!value) return null
        return URL.createObjectURL(value)
    }, [value])

    const handleFileChange = (e) => {
        if (!e.target.files) return
        setValue(e.target.files[0])
    }

    // TODO: add "remove file" button
    // TODO: add multiple file support
    return (
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

            {value && showPreview && value.type.startsWith('image') && (
                <div>
                    <button className="w-full mt-2 text-left text-primary" onClick={() => setIsPreviewVisisible(!isPreviewVisisible)}>{isPreviewVisisible ? 'Hide preview' : 'Show preview'}</button>
                    <AnimateInOut className="mt-2 rounded-md drop-shadow-md">
                        {isPreviewVisisible && <img src={filePreview} alt={value.name} className="w-full" />}
                    </AnimateInOut>
                    <p className="mt-1 text-sm text-gray-500">Loading large files may take a while</p>
                </div>
            )}
        </div >
    )
}