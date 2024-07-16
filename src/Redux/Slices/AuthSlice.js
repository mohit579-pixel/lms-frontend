import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageItem = (key, defaultValue) => {
    if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
};

const initialState = {
    isLoggedIn: getLocalStorageItem('isLoggedIn', false),
    role: getLocalStorageItem('role', ""),
    data: JSON.parse(getLocalStorageItem('data', '{}')),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
