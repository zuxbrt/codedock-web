import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { hideAlert } from "@/redux/alertSlice";
import { AnimatePresence, motion } from "framer-motion"

interface AlertTypes {
    [type:string]: string
}

export default function Alert() {

    const { message, type, duration } = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch();

    const alertTypes: AlertTypes = {
        success: 'bg-green-100 text-green-800 border border-green-200',
        error: 'bg-red-100 text-red-800 border border-red-200',
        info: 'bg-blue-100 text-blue-800 border border-blue-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    };

    useEffect(() => {
        if (message) {
          const timer = setTimeout(() => {
            dispatch(hideAlert());
          }, duration);
    
          return () => clearTimeout(timer);
        }
      }, [message, dispatch]);

    if (!message) return null;

    return (
        <div>
            <AnimatePresence mode="wait">
                {(message && type) && (
                    <motion.div
                        key="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.5 }
                        }}
                        transition={{ duration: 0.5 }}
                        >
                        <div
                            className={`flex row absolute transform translate-x-[-50%] absolute top-1 left-1/2 m-4 px-8 py-2 rounded-lg select-none justify-center ${
                                alertTypes[type] || 'bg-gray-100 text-gray-800'
                            }`} 
                            onClick={() => dispatch(hideAlert())}>
                            <p className="font-medium">{message}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );


}