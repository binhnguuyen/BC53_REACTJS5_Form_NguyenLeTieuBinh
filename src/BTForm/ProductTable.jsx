import React from 'react'
import { useSelector } from 'react-redux'

export const ProductTable = () => {
    const { productList } = useSelector(state => state.btForm)
    // console.log('productList: ', productList);
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
                    <td>Chức năng</td>
                </tr>
            </thead>
            <tbody>
                {
                    productList.map( (product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.phone}</td>
                                <td>{product.mail}</td>
                                <td>
                                    <button className='btn btn-warning'><i class="fa fa-edit"></i></button>
                                    <button className='btn btn-danger ms-3'

                                    >
                                        <i class="fa fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
