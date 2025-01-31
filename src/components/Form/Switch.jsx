export default function Switch({ label, checked, setChecked, className = "", required = false, ...props }) {
    return (
        <label className={`${className} flex items-center gap-2`}>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} {...props} className="sr-only" />
            <div className={`${checked ? 'bg-primary' : 'bg-gray-500/50'} transition-[background-color] relative w-11 h-6 rounded-full`}>
                <div className={`${checked ? 'translate-x-full' : ''} transition-[transform] absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white`}></div>
            </div>
            <span>{label}{required && <span className="text-danger"> *</span>}</span>
        </label>
    )
}