import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    productEdit: [],
}

const BTFormSlice = createSlice({
    name: "BTForm",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const stateProductList = state.productList;
            const { payload } = action;
            stateProductList.push(payload);
        },
        deleteProduct: (state, action) => {
            const { payload } = action;
            // payload ở delete chính là id luôn
            state.productList = state.productList.filter((value) => value.id !== payload);
        },
        editProduct: (state, action) => {
            const { payload } = action;
            state.productEdit = payload;
        }
    }
})

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice