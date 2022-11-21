import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: {},
    token: "",
    error: "",
    showEdit: false,
    posts: [],
    loading: false,
};

export const reduxApp = createSlice( {
    name: "redux",
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
        showEdit: ( state, action ) => {
            state.showEdit = action.payload;
        },
        addPost: ( state, action ) => {
            state.posts = [ ...state.posts, action.payload ];
        },
        editPost: ( state, action ) => {
            state.posts = state.posts.map( post => {
                if ( post._id === action.payload._id ) {
                    return action.payload;
                }
                return post;
            } );
        },
        deletePost: ( state, action ) => {
            state.posts = state.posts.filter( post => post.id !== action.payload );
        },
        addComment: ( state, action ) => {
            state.posts = state.posts.map( post => {
                if ( post.id === action.payload.id ) {
                    return action.payload;
                }
                return post;
            } );
        },
        fetchPosts: ( state, action ) => {
            state.posts = action.payload;
        },
        fetchPostsFailure: ( state, action ) => {
            state.error = action.payload;
        },
        setLoading: ( state, action ) => {
            state.loading = action.payload;
        }
    }
} );

export const { 
    loginSuccess, 
    loginFailure, 
    logout, 
    signupSuccess, 
    signupFailure, 
    showEdit, 
    editPost, 
    addPost, 
    deletePost,
    addComment,
    fetchPosts,
    fetchPostsFailure,
    setLoading,
} = reduxApp.actions;

export default reduxApp.reducer;