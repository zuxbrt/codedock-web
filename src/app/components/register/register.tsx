import { setAuth } from "@/redux/authSlice";
import { User } from "@/types/global";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface RegisterFormState {
    email: string;
    password: string;
    username: string;
}

interface RegisterProps {
    onSuccess: () => void
}

const REGISTER_MUTATION = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            token
            user{
                id
                username
                email
            }
        }
    }
`

export default function Register({ onSuccess }: RegisterProps) {

    const [formData, setFormData] = useState<RegisterFormState>({
        email: '',
        password: '',
        username: ''
    })

    const dispatch = useDispatch();

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_MUTATION);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleRegistration = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = formData.email;
        const password = formData.password;
        const username = formData.username;
        try {
            const response = await registerUser({ variables: { username, email, password }});
            
            dispatch(setAuth({
                token: response.data.register.token,
                user: response.data.register.user as User
            }))

            onSuccess();

        } catch (e) {
            console.error(e);
        }
    }

    return <>
        <div className="border-white">
            <form className="w-64 flex flex-col ml-auto mr-auto" onSubmit={handleRegistration}>
                <p className="mb-4 text-center text-xl">Register</p>

                <input 
                    className="border border-white rounded-sm px-2 mb-2 field-sizing-content" 
                    id="username" 
                    type="username" 
                    name="username" 
                    onChange={handleChange}
                    autoComplete="username" 
                    placeholder="username"></input>

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
                        register
                </button>

            </form>
        </div>
    </>
}