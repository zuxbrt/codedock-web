import Login from "@/app/components/login/login";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import { logout } from "@/redux/authSlice";
import Register from "@/app/components/register/register";

export default function AppHeader() {

    const pathname = usePathname();
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const [modalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode|null>(null);

    const openModal = ( content: React.ReactNode) => {
        setModalContent(content);
        setIsModalVisible(true);
    }

    const showLogin = () => {
        openModal(<Login openRegistration={showRegister} onSuccess={() => setIsModalVisible(false)}/>)
    }

    const showRegister = () => {
        openModal(
            <Register onSuccess={() => setIsModalVisible(false)}/>
        )
    }

    const logoutUser = () => {
        dispatch(logout());
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
            <header className="border border-white rounded-md py-2 px-1 m-4">
                <nav className="flex flex-row">
                    <Link href={{ pathname: '/' }} className={clsx(
                        "mx-2 border border-white rounded-md px-4 py-1", {
                        'bg-teal-700 font-medium': pathname == "/"
                    }
                    )}>/</Link>
                    <Link href={{ pathname: '/trending' }} className={clsx(
                        "mx-2 border border-white rounded-md px-4 py-1", {
                        'bg-teal-700 font-medium': pathname == "/trending"
                    }
                    )}>trending</Link>
                    <Link href={{ pathname: '/explore' }} className={clsx(
                        "mx-2 border border-white rounded-md px-4 py-1", {
                        'bg-teal-700 font-medium': pathname == "/explore"
                    }
                    )}>explore</Link>

                    { user ? 
                        <>
                            <span className="ml-auto mr-0 px-4 py-1 border-1 border-solid bg-teal-700">Hi, {user.username}</span>
                            <div onClick={() => logoutUser()} className="ml-2 mr-0 px-4 py-1 cursor-pointer">Logout</div>
                        </>
                        : 
                        <>
                            <div onClick={() => showLogin()} className="ml-auto mr-0 px-4 py-1 cursor-pointer">Login</div>
                        </>
                    }

                    
                </nav>
            </header>
            <Modal isOpen={modalVisible} onClose={() => setIsModalVisible(false)} children={modalContent} />
        </>
        
    )

}