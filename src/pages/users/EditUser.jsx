import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_USER } from '../../ulti/constants';
import { EditUser } from '../../services/UserService';



export default function FormEditUser(props){
    let [userInfo, setUserInfo] = useState({})
    userInfo = useSelector(state => state.EditUserReducer.userEdit)
    let dispatch = useDispatch();
    let [useErr,setUserErr] = useState({
        id: "",
        passWord: "",
        email: "",
        name: "",
        phoneNumber: "",
        passConfirm: "",
    });
    const handleChange = (event) => {
        userInfo = {...userInfo,[event.target.name]:event.target.value}
        let action = {
            type: EDIT_USER,
            data: userInfo
        }
        dispatch(action)
        setUserInfo(userInfo);
    }
    
    const handleSubmit = () => {
        let kt =true;
        useErr = {
            id: "",
            passWord: "",
            email: "",
            name: "",
            phoneNumber: "",
            passConfirm: "",
        }
        for (const key in userInfo) {
            let value = userInfo[key];
            if (value === "") {
                useErr[key] = `${key} không được để trống`
            }
        }
        if (userInfo['passWord'] !== userInfo['passConfirm']) {
            useErr['passConfirm'] = 'Mật khẩu không trùng khớp'
        }
        useErr = {...useErr};
        setUserErr(useErr);
        for (const key in useErr) {
            if (useErr[key] !== "") {
                kt = false;
                return;
            }
        }
        if (kt) {
            let editUser = EditUser(userInfo)
            editUser.then(() => {
                props.getUserList();
            })
            editUser.catch((err) => {
                console.log(err)
            })
        }
    }
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">Id</label>
                                <input className="form-control" name='id' value={userInfo.id} disabled/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Name</label>
                                <input onChange={handleChange} className="form-control" name='name' value={userInfo.name} />
                                <p className='text-danger'>{useErr.name}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={handleChange} type="email" className="form-control" name='email' value={userInfo.email}/>
                                <p className='text-danger'>{useErr.email}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input onChange={handleChange} className="form-control" name='phoneNumber' value={userInfo.phoneNumber}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">Password</label>
                                <input type="password" onChange={handleChange} className="form-control" name='passWord' value={userInfo.passWord}/>
                                <p className='text-danger'>{useErr.passWord}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passConfirm">Confirm Password</label>
                                <input type="password" onChange={handleChange} className="form-control" name='passConfirm' value={userInfo.passConfirm}/>
                                <p className='text-danger'>{useErr.passConfirm}</p>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            handleSubmit()
                        }}>Update</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
