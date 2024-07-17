import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

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

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        let res = axiosInstance.post("user/register", data);

        toast.promise(res, {
            loading: "Wait! Creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account",
        });

        // getting response resolved here
        res = await res;
        console.log(res.data);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const { } = authSlice.actions;
export default authSlice.reducer;
