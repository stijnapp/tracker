import { useEffect } from "react";
import useEventListener from "../../hooks/useEventListener";

export default function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    });

    return (
        <div className={`relative z-10 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} role="dialog" aria-modal="true" >
            <div className={`fixed inset-0 bg-gray-500/75 transition-opacity ${isOpen ? 'ease-out duration-300 opacity-100' : 'ease-in duration-200 opacity-0'}`} aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={onClose}>
                    <div className={`relative transform overflow-hidden rounded-lg bg-white text-center sm:text-left shadow-xl transition-all p-4 flex flex-col gap-2 sm:my-8 sm:w-full sm:max-w-lg ${isOpen ? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100' : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}`} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}
