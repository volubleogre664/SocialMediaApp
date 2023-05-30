import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import contactsReducer from "./slices/contactsSlice";
import chatsReducer from "./slices/chatsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        // posts: postsReducer,
        // comments: commentsReducer,
        chats: chatsReducer,
        contacts: contactsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
