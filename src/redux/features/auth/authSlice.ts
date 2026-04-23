import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload, TAuth, TUser } from "../../../config/auth/auth";
import { LoginUserApi } from "./authAPI";


const initialState: TAuth = {
    user: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
};

//  Async thunk for login
export const loginUser = createAsyncThunk<TUser, LoginPayload, { rejectValue: string }>("auth/login", async (data, thunkAPI) => {
    try {
        const result = await LoginUserApi(data);
        return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return thunkAPI.rejectWithValue(`${error.response.data.message}` || "Login failed");
    }
}
);

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,

    //ync reducers
    reducers: {
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isError = false;
            state.errorMessage = "";
        },
    },
    //async reducers for createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {

        
                state.isLoading = false;
                state.user = action.payload;
                
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
            });
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
