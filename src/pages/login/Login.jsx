import React from 'react'
import { useFormik } from 'formik'
import { history } from '../../App';
import * as Yup from 'yup';
import { signIn } from '../../services/services';
import { loginAction } from '../../redux/action/loginAction';
import { useDispatch } from 'react-redux';


export default function Login() {
    let dispatch = useDispatch()
const formik = useFormik({
        initialValues: {
            email: '',
            passWord: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email không được để trống'),
            passWord: Yup.string().required('Password không được để trống'),
        }),
        onSubmit: values => {
            // console.log(values)
            let register = signIn(values)
            register.then((result) => {
                // console.log(result.data)
                let action = loginAction(result.data.content)
                dispatch(action)
                // alert(result.data.message)
                // history.push('/login')
                // history.go(0)
            }).catch((error) => {
                // console.log(error)
                alert(error.response.data.message)
            })
        },
    });

  return (
    <div className='login'>
        <div className='register'>
            <h2 className='register_Title'>Đăng nhập</h2>
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
            

                    <button type="submit" className="btn btn-primary">Đăng Nhập</button>
                </form>

            </div>
        </div>

    </div>
  )
}
