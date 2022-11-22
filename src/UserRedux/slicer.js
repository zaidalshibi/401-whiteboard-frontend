import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showEdit: false,
    posts: [],
    loading: false,
    error: "",
};

export const reduxApp = createSlice( {
    name: "redux",
    initialState,
    reducers: {
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
    showEdit,
    addPost,
    editPost,
    deletePost,
    addComment,
    fetchPosts,
    fetchPostsFailure,
    setLoading,
} = reduxApp.actions;

export default reduxApp.reducer;