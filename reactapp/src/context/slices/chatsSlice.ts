import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ChatState, UserState } from "../../utils/Types";

type InitialState = {
    chats: ChatState[];
    currentContact: UserState | null;
};

const initialState: InitialState = {
    chats: [],
    currentContact: null
};



export const userSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<ChatState[] | null>) => {
            state.chats = action.payload || [];
        },
        addChat: (state, action: PayloadAction<ChatState>) => {
             // state.chats.push(action.payload);
            if (!state.chats.find(_ => _.chatId === action.payload.chatId)) {
                state.chats.push(action.payload);
            }
        },
        setCurrentContact: (state, action: PayloadAction<UserState | null>) => {
            state.currentContact = action.payload;
        }
    },
});

export const { setChats, addChat, setCurrentContact } = userSlice.actions;

export const selectUser = (state: RootState): ChatState[] => state.chats.chats;

export const selectCurrentContact = (state: RootState): UserState | null => state.chats.currentContact;

export default userSlice.reducer;
