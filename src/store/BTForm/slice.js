import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
}

const BTFormSlice = createSlice({
    name: "BTForm",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const stateProductList = state.productList;
            const { payload } = action;
            // console.log('payload: ', payload);
            stateProductList.push(payload);
            console.log('stateProductList: ', stateProductList);
        }
    }
})

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice