import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../ulti/constants';
import { useFormik } from 'formik';
import JoditEditor from 'jodit-react';
import { getStatusService } from '../../services/createTaskService';

export default function CreateTask() {
    let [status, setStatus] = useState({})
    useEffect(() =>{
        getStatus()    
    },[])
    const { visible } = useSelector(state => state.createTaskReducer);
    let dispatch = useDispatch();
    const showDrawer = () => {
        dispatch({ type: OPEN_DRAWER });
    };
    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER });
    };
    const formik = useFormik({
        initialValues: {
            taskName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const getStatus = () => {
        let promise = getStatusService();
        promise.then((res) => {
            console.log(res.data.content);
            setStatus(res.data.content);
        })
        promise.catch((err) => {
            console.log(err)
        })
    }

    const renderStatus = () => {
        return status.map((stt) => {
            return <option key={stt.statusId} value={stt.statusId}>{stt.statusName}</option>
        })
    }
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title="Create a new task"
                width={720}
                onClose={onClose}
                open={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Project</label>
                        <select className="form-control" name="project" id>
                            <option></option>
                            <option></option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Task Name</label>
                        <input className='form-control'
                            name="taskName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Status</label>
                        <select className="form-control" name="statusId">
                            {renderStatus()}
                        </select>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <div style={{width:'40%'}}>
                            <label htmlFor="">Priotity</label>
                            <select className="form-control" name="priorityId" id>
                                <option></option>
                                <option></option>
                            </select>
                        </div>

                        <div style={{width:'40%'}}>
                            <label htmlFor="">Task type</label>
                            <select className="form-control" name="typeId" id>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Assigner</label>
                        <input className='form-control'
                            name="assigner"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>

                    <div>
                        <p>Time tracking</p>
                        <div className="form-group d-flex justify-content-between">
                        <div style={{width:'40%'}}>
                            <label htmlFor="">Total Estimated Hours</label>
                            <select className="form-control" name="originalEstimate" id>
                                <option></option>
                                <option></option>
                            </select>
                        </div>

                        <div style={{width:'40%'}}>
                            <label htmlFor="">Hours spent</label>
                            <select className="form-control" name="timeTrackingSpent" id>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                        <p>Description</p>
                        <JoditEditor/>  
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </Drawer >
        </>
    )
}

