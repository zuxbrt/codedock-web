import { AuthState, User } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string, user: User}>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;