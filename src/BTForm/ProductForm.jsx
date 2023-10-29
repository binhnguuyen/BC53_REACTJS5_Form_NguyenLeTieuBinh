import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { btFormActions } from '../store/BTForm/slice';

export const ProductForm = () => {
    const dispatch = useDispatch();

    // lấy productEdit từ store về
    const { productEdit } = useSelector(state => state.btForm)
    console.log('productEdit: ', productEdit);

    // lấy dữ liệu từ form về thì đặt state
    const [formValue, setFormValue] = useState({
        id: "",
        name: "",
        phone: "",
        mail: "",
    })
    console.log('formValue: ', formValue);

    // để lấy dữ liệu trên ô input cần thêm onChange.
    // mỗi sự kiện trong JS đề trả về 1 biến event.
    // const handelFormValue = (e, name) => {
    //     // e là event, name là cái tên của thuộc tính
    //     setFormValue({
    //         // giữ lại các thuộc tính trước đó đã xét ko thì sẽ mất 
    //         ...formValue,
    //         // console.log("event.target.value", e.target.value);
    //         // sau khi lấy đc value lại rồi thì xét lại thuộc tính
    //         [name]: e.target.value,
    //     })
    // }

    // hàm currying funtion trả về 1 cái hàm khác
    // cách viết tắt bỏ return
    const handelFormValue = (name) => (e) => {
        setFormValue({
            ...formValue,
            [name]: e.target.value,
        })
    }


    // useEffect cũng là 1 hook của React giống như useState
    // cứ mỗi lần productEdit thay đổi thì callback serFromValue sẽ chạy lại (TH3 trong demo)
    // dùng useEffect ngay đây sẽ giúp sữa lỗi dù mình có sửa giá trị của productEdit đc render ra UI thì giá trị render ra UI cũng ko bị thay đổi
    useEffect(() => {
        // do lần đầu render nó vẫn chạy, nên mình cần xét if ngay đây để xem nó có ko
        if (productEdit) {
            // console.log('productEdit: ', productEdit);
            // set form trên UI lại mỗi khi productEdit thay đổi
            setFormValue(productEdit)
        }
    }, [productEdit])

    return (
        // ở đây đặt là form, button đặt trong form nếu ko có type thì mặc định là submit.
        // button có type là submit thì khi click vào sẽ chạy vào hàm onSubmit của form.
        <form className="row" id="btForm"
            // tạo hàm onSubmit để khi click vào button nó sẽ chạy vào đây.
            // trong onSubmit này phải ngăn sự kiện reload của browser vì tính chất của <form> là sẽ bĩ reload lại mội khi ấn nút gì đó trong <form> mà ko có type.
            // cụ thể trong bài này là nút "Create".
            onSubmit={(event) => {
                // console.log('event: ', event);
                // ngăn sự kiện reload của browser khi submit
                event.preventDefault()

                // do mình ko có type trong các button nên sẽ chạy vào trong onSubmit này và chạy tính năng của mình
                dispatch(btFormActions.addProduct(formValue))

                // setFormValue lại để làm trống các ô input sau khi thêm sp
                setFormValue({
                    id: "",
                    name: "",
                    phone: "",
                    mail: "",
                })
            }}
        >
            <h2 className='p-3 bg-dark text-white'>Thông tin sinh viên</h2>
            <div className='col-6'>
                <div className='mt-3'>
                    <label htmlFor="">Mã sinh viên</label>
                    <input type="text" name="" id="" className="form-control"
                        onChange={handelFormValue("id")}
                        // gán giá trị của productEdit khi ấn nút edit
                        // dấu ? là do ban đầu khi chưa ấn edit nó sẽ là undefined, cứ vậy mà chấm tới thuộc tính nó sẽ lỗi
                        // value={productEdit?.id}
                        // do mình đã useEffect ở trên rồi nên ngay đây mình sẽ ko lấy giá trị từ productEdit nữa mà lấy trực tiếp từ formValue, vì mình sửa là sửa giá trị trong ô input của formValue chứ ko phải giá trị của productEdit
                        value={formValue.id}
                        // ko cho sửa id nên mình so sánh nếu bằng thì disable
                        disabled={productEdit?.id && formValue.id === productEdit?.id}
                    />
                </div>
                <div className='mt-3'>
                    <label htmlFor="">Số điện thoại</label>
                    <input type="tel" name="" id="" className="form-control"
                        onChange={handelFormValue("phone")}
                        // value={productEdit?.phone}
                        value={formValue.phone}
                    />
                </div>
            </div>
            <div className='col-6'>
                <div className='mt-3'>
                    <label htmlFor="">Họ tên</label>
                    <input type="text" name="" id="" className="form-control"
                        onChange={handelFormValue("name")}
                        // value={productEdit?.name}
                        value={formValue.name}
                    />
                </div>
                <div className='mt-3'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="" id="" className="form-control"
                        onChange={handelFormValue("mail")}
                        // value={productEdit?.mail}
                        value={formValue.mail}
                    />
                </div>
            </div>

            <div className='mt-3'>
                {/* chỗ này muốn là nếu có giá trị productEdit thì chỉ hiển thị nút Update */}
                {/* nếu ko có thì hiện nút Create */}
                {
                    productEdit ?
                        (<button className='btn btn-success ms-3'>
                            Update
                        </button>)
                        :
                        (<button className='btn btn-primary'
                        // onClick={() => {
                        //     dispatch(btFormActions.addProduct(formValue))
                        // }}
                        >
                            Create
                        </button>)
                }
            </div>
        </form>

        // ví dụ nút ngoài form thì DOM tới ID của form
        // <button form="btForm">Submit</button>

    )
}
