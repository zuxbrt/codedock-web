import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";

        return () => {
            document.body.style.overflow = "hidden";
        }
    }, [isOpen])

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex justify-center items-center z-50"
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="p-6 rounded-lg shadow-lg relative max-w-md w-full border border-white rounded-md bg-black">
                            <button className="absolute top-2 right-2 text-lg px-2 cursor-pointer" onClick={onClose}>
                                &times;
                            </button>
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}