import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAuthenticated: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userAuthenticated = true;
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            state.userAuthenticated = false;
            state.userData = null;
        },
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;