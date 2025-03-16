import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    useEffect(() => {
        if(isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";

        return () => {
            document.body.style.overflow = "hidden";
        }
    }, [isOpen])

    if(!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black-500/50">
            <div className="p-6 rounded-lg shadow-lg relative max-w-md w-full border border-white rounded-md">
                <button className="absolute top-2 right-2 text-lg px-2 cursor-pointer" onClick={onClose}>
                &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}