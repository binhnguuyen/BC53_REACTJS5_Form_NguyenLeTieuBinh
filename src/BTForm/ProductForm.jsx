import React from 'react'

export const ProductForm = () => {
    return (
        // ở đây đặt là form, button đặt trong form nếu ko có type thì mặc định là submit
        // button có type là submit thì khi click vào sẽ chạy vào hàm onSubmit của form
        <form>
            <div className="row">
                <h2 className='p-3 bg-dark text-white'>Thông tin sinh viên</h2>
                <div className='col-6'>
                    <div className='mt-3'>
                        <label htmlFor="">Mã sinh viên</label>
                        <input type="text" name="" id="" className="form-control" />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Số điện thoại</label>
                        <input type="number" name="" id="" className="form-control" />
                    </div>
                </div>
                <div className='col-6'>
                    <div className='mt-3'>
                        <label htmlFor="">Họ tên</label>
                        <input type="text" name="" id="" className="form-control" />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Email</label>
                        <input type="email" name="" id="" className="form-control" />
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