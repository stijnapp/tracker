export default function ModalFooter({ children, ...props }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row-reverse mt-2" {...props}>
            {children}
        </div>
    )
}
