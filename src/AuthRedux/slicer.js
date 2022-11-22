import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: {},
    token: "",
    error: "",
};

export const reduxApp1 = createSlice( {
    name: "redux1",
    initialState,
    reducers: {
        loginSuccess: ( state, action ) => {
            state.isAuth = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = "";
        },
        loginFailure: ( state, action ) => {
            state.isAuth = false;
            state.user = {};
            state.token = "";
            state.error = action.payload.message;
        },
        logout: ( state ) => {
            state.isAuth = false;
            state.user = {};
            state.token = "";
            state.error = "";
        },
        signupSuccess: ( state, action ) => {
            state.isAuth = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = "";
        },
        signupFailure: ( state, action ) => {
            state.isAuth = false;
            state.user = {};
            state.token = "";
            state.error = action.payload.message;
        },
    }
} );

export const { 
    loginSuccess, 
    loginFailure, 
    logout, 
    signupSuccess, 
    signupFailure
} = reduxApp1.actions;

export default reduxApp1.reducer;