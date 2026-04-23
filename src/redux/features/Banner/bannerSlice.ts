import { createSlice } from "@reduxjs/toolkit";
import { AddNewBannerThunk, DeleteBannerThunk } from "./banner.thunk";






type IBanner = {
    image: string[];
    loading: boolean;
    error: string | null;
}



const initialState: IBanner = {
    image: [],
    loading: false,
    error: null,
}



const bannerSlice = createSlice({
    name: 'bannerItem',
    initialState,
    reducers: {

        getBanner(state, action) {
            state.image = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

            // add banner
            .addCase(AddNewBannerThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(AddNewBannerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.image = [...state.image, action.payload]
            })
            .addCase(AddNewBannerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update category";
            })


            // delete Banner
            // delete banner
            .addCase(DeleteBannerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(DeleteBannerThunk.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                // state.image = state.image.filter(
                //     (banner) => banner._id !== action.payload
                // );
            })

            .addCase(DeleteBannerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to delete banner";
            });


    }
})
export const { getBanner } = bannerSlice.actions;
export default bannerSlice.reducer;