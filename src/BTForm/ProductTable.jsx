import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const ProductTable = () => {
    const { productList } = useSelector(state => state.btForm)
    // console.log('productList: ', productList);

    // Thêm dispatch
    const dispatch = useDispatch()

  return (
    <div>
        <h2 className='p-3 bg-dark text-white mt-3'>Danh sách sinh viên</h2>
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
                                    <button className='btn btn-warning'
                                        onClick={() => {
                                            // delete thì chỉ cần đưa cái id lên store là OK
                                            dispatch(btFormActions.editProduct(product))
                                        }}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </button>
                                    <button className='btn btn-danger ms-3'
                                        onClick={() => {
                                            // delete thì chỉ cần đưa cái id lên store là OK
                                            dispatch(btFormActions.deleteProduct(product.id))
                                        }}
                                    >
                                        <i className="fa fa-trash-alt"></i>
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
