


// product.types.ts
export interface TProduct {
    _id: string;
    name: string;
    description?: string;
    pricing?: {
        basePrice: number;
    };
    inventory?: {
        stock: number;
        lowStockAlert: number;
    };
    media?: {
        gallery: string[];
    };
    shipping?: {
        freeShipping: boolean;
    };
    variants?: Variant[];
    shop?: {
        _id: string;
        shopName: string;
    };
    isActive?: boolean;
    category?:{
_id : string;
name : string;
imageUrl : string;
    },
    approvalStatus?: "PENDING" | "APPROVED" | "REJECTED";
    createdAt?: string;
    updatedAt?: string;
}



export interface Variant {
    attributes: {
        size: string;
        color: string;
    };
    price: number;
    stock: number;
    sku: string;
    stripeProductId: string;
    stripePriceId: string;
}

interface IProduct {
    products: TProduct[],
    loading: boolean;
    error: string | null;
}

// // initailState 
// const initialState: IProduct = {
//     products: [],
//     loading: false,
//     error: null 
// }

//     // reducers: {

//     //     getBanner(state, action) {
//     //         state.image = action.payload
//     //     }
//     // },

// // product slice
// import { createSlice } from "@reduxjs/toolkit";
// import { getProductThunk } from "./product.thunk";

// const productSlice = createSlice({
//     name: "product",
//     initialState,
//     reducers: {
//         // getProduct (state,action){
//         //     state.
//         // }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getProductThunk.pending, (state) => {
//                 state.loading = true;
//             })

//             .addCase(getProductThunk.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.products = action.payload;
//             })

//             .addCase(getProductThunk.rejected, (state, action) => {
//                 state.loading = false;
//                 // state.error = action.payload || "Something went wrong";
//             });
//     }

// })

// // export const { setCategory } = productSlice.actions;
// // export default productSlice.reducer;