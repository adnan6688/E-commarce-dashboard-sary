import { createAsyncThunk } from "@reduxjs/toolkit";
import { bannerGetApi } from "./bannerApi";
import axios from "axios";
import type { IAddBanner, IBanner } from "./banner.type";
import { createAxiosSecure } from "../../../axios/axiosSequre";


// get banner
export const getBannerThunk = createAsyncThunk(
    "banner/getBannerThunk",
    async ({ token }: IBanner, { rejectWithValue }) => {
        try {
            if (token) {
                const response = await bannerGetApi({ token });
                return response;
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch banners");
        }
    }
);





// add banner 
export const AddNewBannerThunk = createAsyncThunk("banner/AddNewBannerThunk", async ({ token, image }: IAddBanner, { rejectWithValue }) => {
    const formData = new FormData()
    try {
        if (token && image) {
            formData.append('image', image)
            console.log("image file", image)

            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/banners`,
                formData,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                })
            return res.data
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
        console.log(err)
        return rejectWithValue(err.response?.data?.message || "Failed Add Banner!")
    }

})



// delete banner
interface IDeleteBanner {
    token: string | undefined;
    id: string | undefined;
}
export const DeleteBannerThunk = createAsyncThunk("banner/DeleteBanner", async ({ token, id }: IDeleteBanner, { rejectWithValue }) => {
    const axiosSequre = createAxiosSecure(token)
    try {

        if (token && id) {
         const res =    await axiosSequre.delete(`admin/banners/${id}`)
            return res.data
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch banners");
    }
})