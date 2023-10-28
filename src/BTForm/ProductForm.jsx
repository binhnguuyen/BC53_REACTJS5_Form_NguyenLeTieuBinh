import React, { useState } from 'react'

export const ProductForm = () => {
    // lấy dữ liệu từ form về thì đặt state
    const [formValue, setFormValue] = useState({
        id: "",
        name: "",
        phone: "",
        mail: "",
    })
    console.log('formValue: ', formValue);

    return (
        // ở đây đặt là form, button đặt trong form nếu ko có type thì mặc định là submit
        // button có type là submit thì khi click vào sẽ chạy vào hàm onSubmit của form
        <form>
            <div className="row">
                <h2 className='p-3 bg-dark text-white'>Thông tin sinh viên</h2>
                <div className='col-6'>
                    <div className='mt-3'>
                        <label htmlFor="">Mã sinh viên</label>
                        <input type="text" name="" id="" className="form-control" 
                            // để lấy dữ liệu trên ô input cần thêm onChange
                            // mỗi sự kiện trong JS đề trả về 1 biến event
                            onChange={(e) => {
                                // để lấy dữ liệu trong ô nhập liệu thì .target.value
                                // console.log("event.target.value", e.target.value);
                                // sau khi lấy đc value lại rồi thì xét lại thuộc tính
                                setFormValue({
                                    // giữ lại các thuộc tính trước đó đã xét ko thì sẽ mất
                                    ...formValue,
                                    id: e.target.value,
                                })
                                // console.log('id: ', id);
                            }}
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Số điện thoại</label>
                        <input type="number" name="" id="" className="form-control" 
                            onChange={(e) => {
                                setFormValue({
                                    ...formValue,
                                    phone: e.target.value,
                                })
                                console.log('name: ', name);

                            }}
                        />
                    </div>
                </div>
                <div className='col-6'>
                    <div className='mt-3'>
                        <label htmlFor="">Họ tên</label>
                        <input type="text" name="" id="" className="form-control" 
                            onChange={(e) => {
                                setFormValue({
                                    ...formValue,
                                    name: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Email</label>
                        <input type="email" name="" id="" className="form-control" 
                            onChange={(e) => {
                                setFormValue({
                                    ...formValue,
                                    mail: e.target.value,
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <button className='btn btn-primary'>Create</button>
                <button className='btn btn-success ms-3'>Update</button>
            </div>
        </form>
    )
}
