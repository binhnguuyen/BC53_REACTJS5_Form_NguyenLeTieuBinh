import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentList: [
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
    studentEdit: undefined,
    searchResult: "",
}

const BTFormSlice = createSlice({
    name: "BTForm",
    initialState,
    reducers: {
        add: (state, action) => {
            // bóc tách payload trong action ra
            const { payload } = action;
            const stateProductList = state.studentList;
            stateProductList.push(payload);
        },
        delete: (state, action) => {
            const { payload } = action;
            // payload ở delete chính là id luôn
            state.studentList = state.studentList.filter((value) => value.id !== payload);
        },
        edit: (state, action) => {
            const { payload } = action;
            state.studentEdit = payload;
        },
        update: (state, action) => {
            const { payload } = action;
            // 

            // tìm trong studentList thằng nào có id giống id của studentEdit vừa truyền lên
            const productIndex = state.studentList.findIndex((item) => item.id === payload.id);

            // khi ko tìm thấy sp dựa vào id thì productIndex sẽ bằng -1
            // tốt nhất là nên thêm đk, vì lỡ có ai đó biết code vô vô hiệu hoá cái lệnh disable id thì họ sẽ sửa id đc, nên phải thêm vào đk này
            // nếu tìm thấy
            if (productIndex !== -1) {
                state.studentList[productIndex] = payload;

                // clear nó để nó ko ăn những đk ngoài luồng
                state.studentEdit = undefined;
            }
        },
        search: (state, { payload }) => {
            state.searchResult = payload.trim()?.toLocaleLowerCase();
            const result = state.studentList.filter((item) => {
                if ( state.searchResult !== "" ) {
                    return (
                        item.name.toLocaleLowerCase().includes(state.searchResult)
                    )
                }
            }
            )
            if ( result ) {
                state.searchResult = result;
            }
            else {
                state.searchResult = "";
            }
        }
    }
})

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice