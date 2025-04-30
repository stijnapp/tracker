export default function ModalHeader({ children, ...props }) {
    return (
        <h3 className="text-base font-semibold text-gray-900" {...props}>
            {children}
        </h3>
    )
}
