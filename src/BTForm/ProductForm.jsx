import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { btFormActions } from '../store/BTForm/slice';

export const ProductForm = () => {
    const dispatch = useDispatch();

    // lấy studentEdit từ store về
    const { studentEdit, searchResult } = useSelector(state => state.btForm)
    // lấy dữ liệu từ form về thì đặt state
    const [formValue, setFormValue] = useState({
        id: "",
        name: "",
        phone: "",
        mail: "",
    })
    // console.log('formValue: ', formValue);

    // tạo 1 state mới quản lý validation
    const [formError, setFormError] = useState({
        id: "",
        name: "",
        phone: "",
        mail: "",
    })

    // tạo 1 state mới quản lý ô giá trị tìm kiếm
    const [searchValue, setSearchValue] = useState("");


    // tạo hàm validate có 2 tham số là name(id, name, phone, mai) và value(giá trị trong ô input)
    const validate = (name, value) => {
        switch (name) {
            case "id":
                // .trim() để bỏ hết các ký tự space (rỗng) ra
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin"
                }
                else {
                    return "";
                }
            // xài return rồi ko cần dùng break nữa
            case "name":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin"
                }
                else if (!value.trim().match(new RegExp("[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔƠÙÚĂĐàáâãèéêìíòóôơùúăđĨĩỨứỪừỬửỰựỞờỈỉỬửỦủỨứỄỂẰằẮắẶặẲẳẴẵỔổỞởỢợỚớỒồỘộỐốỖỗỈỉỊịỮữỷÝỲỵỴỸỹ]"))) {
                    return "Vui lòng chỉ nhập ký tự"
                }
                else {
                    return "";
                }
            case "mail":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin"
                }
                else if (!value.match(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))) {
                    return "Email không hợp lệ"
                }
                else {
                    return "";
                }
            case "phone":
                if (value.trim() === "") {
                    return "Vui lòng nhập thông tin"
                }
                else if (!value.match(new RegExp("^[0-9]*$"))) {
                    return "Số điện thoại không hợp lệ"
                }
                else {
                    return "";
                }
            default:
                return "";

        }
    }

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
        // kiểm tra dữ liệu đầu vào
        // name ở đây là: id, name, phone, mail
        // các đk xét lỗi mình tạo trong hàm validate dựa vào nội dung bên trong ô input chính là tham số e.target.value
        // trong HTML phía dưới phải có value = {} thì ở đây mới lấy ra đc
        setFormError({ ...formError, [name]: validate(name, e.target.value) })

        // kiểm tra xong rồi thì setForm
        setFormValue({
            ...formValue,
            [name]: e.target.value,
        })
    }

    const handleInputValue = (e) => {
        let {value} = e.target;
        setSearchValue(value);
    }
    const handleSearchValue = () => {
        dispatch(btFormActions.search(searchValue))
    }


    // useEffect cũng là 1 hook của React giống như useState
    // cứ mỗi lần studentEdit thay đổi thì callback serFromValue sẽ chạy lại (TH3 trong demo)
    // dùng useEffect ngay đây sẽ giúp sữa lỗi dù mình có sửa giá trị của studentEdit đc render ra UI thì giá trị render ra UI cũng ko bị thay đổi
    useEffect(() => {
        // do lần đầu render nó vẫn chạy, nên mình cần xét if ngay đây để xem nó có ko
        if (studentEdit) {
            // console.log('studentEdit: ', studentEdit);
            // set form trên UI lại mỗi khi studentEdit thay đổi
            setFormValue(studentEdit)
        }
    }, [studentEdit])

    // useEffect(() => {
    //     if (searchResult) {
    //         // console.log('searchResult: ', searchResult);
    //         // setSearchValue(searchResult)
    //     }
    // }, [searchResult])

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

                // Validate khi ấn sau khi ấn nút Create và cũng phải setState để render lỗi ra UI cho user biết
                // nên phải biến nó thành 1 cái obj mới
                // thằng Object.keys này giúp mình biến những cái key và gom chung về 1 mảng
                // tạo 1 obj rỗng để xét state
                const validationError = {};
                Object.keys(formValue).forEach((key) => {
                    // key: id, name, phone, mail
                    const err = validate(key, formValue[key]);
                    // gán nội dung err vào obj rỗng đã định nghĩa phía trên
                    // QUAN TRỌNG: đây là cách thêm các key cho 1 object (comment bên dưới)
                    // do lúc đầu nó chưa có key, làm thế này nó sẽ đc thêm key
                    // nếu có error
                    if (err && err.length > 0) {
                        // biến mảng error thành obj
                        validationError[key] = err;
                    }
                })

                /*
                 * a = {name: "A"}
                 * b = {...a, age: 12} // {name: "A", age: 12}
                 * b[gender] = "Name"  // {name: "A", age: 12, gender: "Nam"}
                 */

                // nếu có lỗi thì mình clone lại và setFormError để nó re-render lại ra UI
                if (Object.keys(validationError).length > 0) {
                    setFormError({ ...validationError });
                    return;
                }


                // do mình ko có type trong các button nên sẽ chạy vào trong onSubmit này và chạy tính năng của mình
                if (studentEdit) {
                    dispatch(btFormActions.update(formValue))
                }
                else {
                    dispatch(btFormActions.add(formValue))
                }

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
                        // gán giá trị của studentEdit khi ấn nút edit
                        // dấu ? là do ban đầu khi chưa ấn edit nó sẽ là undefined, cứ vậy mà chấm tới thuộc tính nó sẽ lỗi
                        // value={studentEdit?.id}
                        // do mình đã useEffect ở trên rồi nên ngay đây mình sẽ ko lấy giá trị từ studentEdit nữa mà lấy trực tiếp từ formValue, vì mình sửa là sửa giá trị trong ô input của formValue chứ ko phải giá trị của studentEdit
                        value={formValue.id}
                        // ko cho sửa id nên mình so sánh nếu bằng thì disable
                        disabled={studentEdit?.id && formValue.id === studentEdit?.id}
                    />
                    {formError.id && (
                        <p>
                            <small className='text-danger'>{formError.id}</small>
                        </p>
                    )
                    }

                </div>
                <div className='mt-3'>
                    <label htmlFor="">Số điện thoại</label>
                    <input type="tel" name="" id="" className="form-control"
                        onChange={handelFormValue("phone")}
                        // value={studentEdit?.phone}
                        value={formValue.phone}
                    />
                    {formError.phone && (
                        <p>
                            <small className='text-danger'>{formError.phone}</small>
                        </p>
                    )}

                </div>
            </div>
            <div className='col-6'>
                <div className='mt-3'>
                    <label htmlFor="">Họ tên</label>
                    <input type="text" name="" id="" className="form-control"
                        onChange={handelFormValue("name")}
                        // value={studentEdit?.name}
                        value={formValue.name}
                    />
                    {formError.name && (
                        <p>
                            <small className='text-danger'>{formError.name}</small>
                        </p>
                    )}

                </div>
                <div className='mt-3'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="" id="" className="form-control"
                        onChange={handelFormValue("mail")}
                        // value={studentEdit?.mail}
                        value={formValue.mail}
                    />
                    {formError.mail && (
                        <p>
                            <small className='text-danger'>{formError.mail}</small>
                        </p>
                    )}
                </div>
            </div>

            <div className='mt-3'>
                {/* chỗ này muốn là nếu có giá trị studentEdit thì chỉ hiển thị nút Update */}
                {/* nếu ko có thì hiện nút Create */}
                {
                    studentEdit ?
                        (<button className='btn btn-success'>
                            Update
                        </button>)
                        :
                        (<button className='btn btn-primary'
                        // onClick={() => {
                        //     dispatch(btFormActions.add(formValue))
                        // }}
                        >
                            Create
                        </button>)
                }
            </div>
            <div className='mt-3'>
                <h3 htmlFor="">Tìm kiếm tên sinh viên</h3>
                <div className='row d-flex justify-content-left'>
                    <div className='col-5'>
                        <input id='' type="text" className='form-control' placeholder='Ví dụ: Nguyễn Văn A'
                            style={{
                                width: "100%",
                                height: 30,
                                alignItems: "center",
                                lineHeight: 30,
                                border: "solid 1px #000",
                                borderRadius: 5,
                            }}
                            // value ngay đây phải đưa vào nếu ko event.target.value sẽ bị undefined
                            value={searchValue}
                            // ngay đây dùng onInput={} cũng đc
                            onChange={handleInputValue}
                        />
                    </div>
                    <div className='col-1'>
                        <button type='button' className="btn btn-success fa fa-search ms-2 d-flex"
                            style={{
                                border: "solid 1px #000",
                                borderRadius: 5,
                                width: 50,
                                height: 30,
                                cursor: "pointer",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onClick={handleSearchValue}
                        ></button>
                    </div>
                    <div className='row mt-2'>
                        {
                            searchResult ?
                                (
                                    <div>
                                        <h5 className='text-success'>Kết quả tìm kiếm</h5>
                                        <table className='col-12'>
                                            <thead>
                                                <td style={{
                                                    width: "25%"
                                                }}>Mã sinh viên</td>
                                                <td style={{
                                                    width: "25%"
                                                }}>Họ tên</td>
                                                <td style={{
                                                    width: "25%"
                                                }}>Số điện thoại</td>
                                                <td>Email</td>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <span></span>
                                )
                        }
                        {
                            searchResult ?
                                (searchResult.map((student) => (
                                    <div key={student.id}>
                                        <table className='col-12'>
                                            <thead></thead>
                                            <tbody>
                                                <td style={{
                                                    width: "25%",
                                                }}>{student.id}</td>
                                                <td style={{
                                                    width: "25%"
                                                }}>{student.name}</td>
                                                <td style={{
                                                    width: "25%"
                                                }}>{student.phone}</td>
                                                <td>{student.mail}</td>
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                                ) : (
                                    <span></span>
                                )
                        }
                    </div>
                </div>


            </div>
        </form>

        // ví dụ nút ngoài form thì DOM tới ID của form
        // <button form="btForm">Submit</button>

    )
}
