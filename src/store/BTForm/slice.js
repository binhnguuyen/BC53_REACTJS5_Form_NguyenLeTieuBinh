import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [
        {
            id: "1",
            name: "Nguyễn Văn A",
            phone: "09721987941",
            mail: "leechiupin@gmail.com",
        },
        {
            id: "2",
            name: "Nguyễn Văn B",
            phone: "09721987941",
            mail: "leechiupin@gmail.com",
        },
        {
            id: "3",
            name: "Nguyễn Văn C",
            phone: "09721987941",
            mail: "leechiupin@gmail.com",
        },
    ],
    productEdit: [],
}

const BTFormSlice = createSlice({
    name: "BTForm",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            // bóc tách payload trong action ra
            const { payload } = action;
            const stateProductList = state.productList;
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
        },
        updateProduct: (state, action) => {
            const { payload } = action;
            // console.log('payload: ', payload);

            // tìm trong productList thằng nào có id giống id của productEdit vừa truyền lên
            const productIndex = state.productList.findIndex((item) => item.id === payload.id);

            // khi ko tìm thấy sp dựa vào id thì productIndex sẽ bằng -1
            // tốt nhất là nên thêm đk, vì lỡ có ai đó biết code vô vô hiệu hoá cái lệnh disable id thì họ sẽ sửa id đc, nên phải thêm vào đk này
            // nếu tìm thấy
            if (productIndex !== -1){
                console.log('productIndex: ', productIndex);
                state.productList[productIndex] = payload;

                // clear nó để nó ko ăn những đk ngoài luồng
                state.productEdit = undefined;
            }

        }
    }
})

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice