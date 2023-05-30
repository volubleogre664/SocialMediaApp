import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ChatState, UserState } from "../../utils/Types";

type InitialState = {
    chats: ChatState[];
};

const initialState: InitialState = {
    chats: [],
};

export const userSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<ChatState[] | null>) => {
            state.chats = action.payload || [];
        },
        addChat: (state, action: PayloadAction<ChatState>) => {
            state.chats.push(action.payload);
        },
    },
});

export const { setChats, addChat } = userSlice.actions;

export const selectUser = (state: RootState): ChatState[] => state.chats.chats;

export default userSlice.reducer;
