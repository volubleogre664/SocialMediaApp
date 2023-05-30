import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserState } from "../../utils/Types";

const initialState = {
    user: {
        authUserId: localStorage.getItem("auth") || "",
        userId: 0,
        username: "",
        firstName: "",
        lastName: "",
        avatarUrl: "",
    } as UserState | null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState | null>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState): UserState =>
    state.user.user as UserState;

export default userSlice.reducer;
