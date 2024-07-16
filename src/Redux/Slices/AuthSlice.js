import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isLoggedIn:  localStorage.get('isLoggedIn') || false,
    role:localStorage.get('role') || "",
    data:localStorage.get('data') || {},
};

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
});

export const {} =authSlice.actions;
export default authSlice.reducer;
