import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const ProductTable = () => {
    const { studentList, searchResult } = useSelector(state => state.btForm)
    // console.log('studentList: ', studentList);

    // Thêm dispatch
    const dispatch = useDispatch()

    return (
        <div>
            {
                searchResult.length ? (
                    <h2 className='p-3 text-success mt-3'>Kết quả tìm được</h2>
                ) : (
                    <h2 className='p-3 bg-dark text-white mt-3'>Danh sách sinh viên</h2>
                )
            }

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
                        searchResult.length ?
                            (
                                searchResult.map((student) => {
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.mail}</td>
                                            <td>
                                                <button className='btn btn-warning'
                                                    onClick={() => {
                                                        // delete thì chỉ cần đưa cái id lên store là OK
                                                        dispatch(btFormActions.edit(student))
                                                    }}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button className='btn btn-danger ms-3'
                                                    onClick={() => {
                                                        // delete thì chỉ cần đưa cái id lên store là OK
                                                        dispatch(btFormActions.delete(student.id))
                                                    }}
                                                >
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                studentList.map((student) => {
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.mail}</td>
                                            <td>
                                                <button className='btn btn-warning'
                                                    onClick={() => {
                                                        // delete thì chỉ cần đưa cái id lên store là OK
                                                        dispatch(btFormActions.edit(student))
                                                    }}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button className='btn btn-danger ms-3'
                                                    onClick={() => {
                                                        // delete thì chỉ cần đưa cái id lên store là OK
                                                        dispatch(btFormActions.delete(student.id))
                                                    }}
                                                >
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )

                    }
                </tbody>
            </table>
        </div>
    )
}
