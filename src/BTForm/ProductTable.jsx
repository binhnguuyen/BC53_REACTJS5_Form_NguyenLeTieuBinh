import React from 'react'
import { useSelector } from 'react-redux'

export const ProductTable = () => {
    const { productList } = useSelector(state => state.btForm)
    console.log('productList: ', productList);
  return (
    <div>
        <h2 className='p-3 bg-dark text-white mt-5'>Danh sách sinh viên</h2>
        <table className='table'>
            <thead>
                <tr>
                    <td>Mã sinh viên</td>
                    <td>Họ tên</td>
                    <td>Số điện thoại</td>
                    <td>Email</td>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
  )
}
