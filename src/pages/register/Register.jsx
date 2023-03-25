
import { useFormik } from 'formik'
import React from 'react'

import * as Yup from 'yup';
import { history } from '../../App';
import { signUp } from '../../services/services';


export default function Register() {
    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
            name: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email không được để trống'),
            passWord: Yup.string().required('Password không được để trống'),
            name: Yup.string().required('Name không được để trống'),
            phoneNumber: Yup.string().required('Phone không được để trống')
        }),
        onSubmit: values => {
            let register = signUp(values)
            register.then((result) => {
                alert(result.data.message)
                history.push('/login')
                history.go(0)
            }).catch((error) => {
                alert(error.response.data.message)
            })
        },
    });

    return (
        <div className='register'>
            <h2 className='register_Title'>Đăng ký</h2>
            <div className='register_Container p-5'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name='email' onChange={formik.handleChange} />
                        {formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name='passWord' onChange={formik.handleChange} />
                        {formik.errors.passWord ? (
                            <div>{formik.errors.passWord}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name='name' onChange={formik.handleChange} />
                        {formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" name='phoneNumber' onChange={formik.handleChange} />
                        {formik.errors.phoneNumber ? (
                            <div>{formik.errors.phoneNumber}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="btn btn-primary">Đăng Ký</button>
                </form>

            </div>
        </div>
    )
}
