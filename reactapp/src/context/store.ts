import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import contactsReducer from "./slices/contactsSlice";
import chatsReducer from "./slices/chatsSlice";
import postsReducer from "./slices/postSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
        chats: chatsReducer,
        contacts: contactsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
