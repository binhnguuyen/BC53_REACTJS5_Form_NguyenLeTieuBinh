import React from 'react'

export const ProductTable = () => {
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
