import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserState } from "../../utils/Types";

const initialState = {
    contacts: Array<UserState>() as UserState[],
};

export const contactSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<UserState | null>) => {
            state.contacts = state.contacts.push(...action.payload);
        },
    },
});

export const { setUser } = contactSlice.actions;

export const selectContacts = (state: RootState): UserState =>
    state.contacts as UserState[];

export default userSlice.reducer;
