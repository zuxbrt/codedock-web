import { AlertState } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: AlertState = {
    message: null,
    type: null,
    duration: 3000
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ message: string, type: string, duration?: number}>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            if(action.payload.duration) state.duration = action.payload.duration;
        },
        hideAlert: (state) => {
            state.message = null;
            state.type = null;
        }
    }
})

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;