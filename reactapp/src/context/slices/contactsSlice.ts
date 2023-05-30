import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserState } from "../../utils/Types";

type InitialState = {
    contacts: UserState[];
};

const initialState: InitialState = {
    contacts: [],
};

export const userSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<UserState[] | null>) => {
            state.contacts = action.payload || [];
        },
    },
});

export const { setContacts } = userSlice.actions;

export const selectUser = (state: RootState): UserState[] =>
    state.contacts.contacts;

export default userSlice.reducer;
