export default function ModalBody({ children, ...props }) {
    return (
        <p className="text-sm text-gray-500" {...props}>
            {children}
        </p>
    )
}
