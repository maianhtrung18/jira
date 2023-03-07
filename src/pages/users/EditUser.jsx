import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Radio } from 'antd';
import { useSelector } from 'react-redux';



export default function FormEditUser(){
    
    
    let [userInfo, setUserInfo] = useState(useSelector(state => state.EditUserReducer.userEdit))
    console.log(userInfo, "userInfo")
    const handleChange = (event) => {
        //console.log(event.target.value)
        userInfo = {...userInfo,[event.target.name]:event.target.value}
        setUserInfo(userInfo);
        console.log(userInfo,'onChange')
    }
    //useEffect((first) => { second })
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
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={handleChange} type="email" className="form-control" name='email' value={userInfo.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input onChange={handleChange} className="form-control" name='phoneNumber' value={userInfo.phoneNumber}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
