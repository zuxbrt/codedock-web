import { showAlert } from "@/redux/alertSlice";
import { setAuth } from "@/redux/authSlice";
import { User } from "@/types/global";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react"
import { useDispatch } from "react-redux";

interface LoginFormState {
    email: string;
    password: string;
}

interface LoginProps {
    openRegistration: () => void
    onSuccess: () => void
}

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                id
                username
                email
            }
        }
    }
`

export default function Login({ openRegistration, onSuccess }: LoginProps) {

    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    })

    const dispatch = useDispatch();

    const [loginUser, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = formData.email;
        const password = formData.password;
        try {
            const response = await loginUser({ variables: { email, password }});
            
            dispatch(setAuth({
                token: response.data.login.token,
                user: response.data.login.user as User
            }))

            dispatch(showAlert({ message: 'Welcome!', type: 'success', duration: 3000 }));

            onSuccess();

        } catch (e) {
            dispatch(showAlert({ message: 'Invalid credentials!', type: 'error', duration: 5000 }));
            console.error(e);
        }
    }

    return <>
        <div className="border-white">
            <form className="w-64 flex flex-col ml-auto mr-auto" onSubmit={handleLogin}>
                <p className="mb-4 text-center text-xl">Login</p>

                <input 
                    className="border border-white rounded-sm px-2 mb-2 field-sizing-content" 
                    id="email" 
                    type="email" 
                    name="email" 
                    onChange={handleChange}
                    autoComplete="email" 
                    placeholder="email"></input>

                <input
                    className="border border-white rounded-sm px-2 mb-2 field-sizing-content"
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="current-password" 
                    placeholder="password"></input>

                <button 
                    className="rounded-sm bg-teal-700 w-32 mt-2 text-center ml-auto mr-auto cursor-pointer" 
                    type="submit">
                        login
                </button>

                <div className="flex flex-row mt-5 justify-center">
                    <p>No account?</p>&nbsp;
                    <span className="underline underline-offset-2 cursor-pointer" onClick={() => openRegistration()}>Register</span>
                </div>

            </form>
        </div>
    </>
}