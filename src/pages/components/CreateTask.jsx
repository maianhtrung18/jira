import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Slider } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../ulti/constants';
import { useFormik } from 'formik';
import JoditEditor from 'jodit-react';
import { createTaskService, getPriorityService, getStatusService, getTaskTypeService, getUserByProject } from '../../services/createTaskService';
import { getAllProject } from '../../services/services';
import * as Yup from 'yup';

export default function CreateTask() {
    let [status, setStatus] = useState([])
    let [priority, setPriority] = useState([])
    let [taskType, setTaskType] = useState([])
    let [project, setProject] = useState([])
    let [options, setOptions] = useState([])
    useEffect(() => {
        getStatus();
        getPriority();
        getTaskType();
        getProject();
    }, [])
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
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: '1',
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 1,
            typeId: 1,
            priorityId: 1

        },
        validationSchema: Yup.object({
            taskName: Yup.string().required("Task name không được để trống "),
            description: Yup.string().required("Description không được để trống")
        }),
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            let promise = createTaskService(values);
            promise.then((res) => {
                console.log(res,"create task")
            })
            promise.catch((err) => {
                console.log(err, "err task")
            })
        },
    });

    let [timeTracking, setTimeTracKing] = useState({
        timeTotal: 0,
        timeSpend: 0,
    })

    const getStatus = () => {
        let promise = getStatusService();
        promise.then((res) => {
            // console.log(res.data.content);
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

    const getPriority = () => {
        getPriorityService().then((res) => {
            // console.log(res.data.content, "res prio")
            setPriority(res.data.content)
        })
        getPriorityService().catch((err) => {
            console.log(err, "err priority")
        })
    }

    const renderPriority = () => {
        return priority.map((pri) => {
            return <option key={pri.priorityId} value={pri.priorityId}>{pri.priority}</option>
        })
    }

    const getProject = () => {
        let promise = getAllProject();
        promise.then((res) => {
            // console.log(res.data.content)
            setProject(res.data.content)
        })
        promise.catch((err) => {
            console.log(err)
        })
    }

    const renderProject = () => {
        return project.map((pro) => {
            return <option key={pro.id} value={pro.id}>{pro.projectName}</option>
        })
    }

    const getTaskType = () => {
        let promise = getTaskTypeService();
        promise.then((res) => {
            // console.log(res.data.content)
            setTaskType(res.data.content)
        })
        promise.catch((err) => {
            console.log(err, "err tasktype")
        })
    }

    const renderTaskType = () => {
        return taskType.map((task) => {
            return <option key={task.id} value={task.id}>{task.taskType}</option>
        })
    }

    const projectOnChange = (event) => {
        let promise = getUserByProject(event.target.value);
        promise.then((res) => {
            console.log(res.data.content)

            let listUser = res.data.content.map((key) => {
                return {
                    value: key.userId,
                    label: key.name
                }
            })
            setOptions(listUser)
        })
        promise.catch((err) => {
            console.log(err)
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
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={formik.handleSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <form >
                    <div className="form-group">
                        <label htmlFor="">Project</label>
                        <select className="form-control" name="projectId" onChange={(e) => {
                            projectOnChange(e);
                            formik.handleChange(e);
                        }}>
                            <option>--Select Project--</option>
                            {renderProject()}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Task Name</label>
                        <input className='form-control'
                            name="taskName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.taskName}
                        />
                        {formik.errors.taskName ? (
                            <div className='text-danger'>{formik.errors.taskName}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Status</label>
                        <select className="form-control" name="statusId" onChange={formik.handleChange} value={formik.values.statusId} onBlur={formik.handleBlur}>
                            {renderStatus()}
                        </select>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <div style={{ width: '40%' }}>
                            <label htmlFor="">Priotity</label>
                            <select className="form-control" name="priorityId" onChange={formik.handleChange} value={formik.values.priorityId} onBlur={formik.handleBlur}>
                                {renderPriority()}
                            </select>
                        </div>

                        <div style={{ width: '40%' }}>
                            <label htmlFor="">Task type</label>
                            <select className="form-control" name="typeId" onChange={formik.handleChange} value={formik.values.typeId} onBlur={formik.handleBlur}>
                                {renderTaskType()}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Assigner</label>
                        <Select
                            mode="multiple"
                            // size={size}
                            placeholder="Please select"
                            style={{
                                width: '100%',
                            }}
                            options={options}

                            label="listUserAsign"
                            onChange={(values) => {
                                formik.setFieldValue("listUserAsign", values)
                            }}

                        />
                    </div>

                    <div>
                        <p>Time tracking</p>
                        <div className="form-group d-flex justify-content-between">
                            <div style={{ width: '40%' }}>
                                <label htmlFor="">Total Estimated Hours</label>
                                <input type="number" min={0} name='originalEstimate' className="form-control" onChange={(e) => {
                                    formik.handleChange(e);
                                    setTimeTracKing({ ...timeTracking, timeTotal: e.target.value });

                                }} onBlur={() => {
                                    console.log(formik.values.originalEstimate - formik.values.timeTrackingSpent);
                                    formik.setFieldValue("timeTrackingRemaining", formik.values.originalEstimate - formik.values.timeTrackingSpent)
                                }} />
                            </div>

                            <div style={{ width: '40%' }}>
                                <label htmlFor="">Hours spent</label>
                                <input type="number" min={0} className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    formik.handleChange(e);
                                    setTimeTracKing({ ...timeTracking, timeSpend: e.target.value });

                                }} onBlur={() => {
                                    console.log(formik.values.originalEstimate - formik.values.timeTrackingSpent)
                                    formik.setFieldValue("timeTrackingRemaining", formik.values.originalEstimate - formik.values.timeTrackingSpent)
                                }} />
                            </div>
                        </div>
                        <Slider
                            max={timeTracking.timeTotal}
                            value={timeTracking.timeSpend}
                        />
                        <div className='d-flex justify-content-between' style={{ fontWeight: '600' }}>
                            <p>{timeTracking.timeSpend} hour(s) spent</p>
                            <p>{timeTracking.timeTotal - timeTracking.timeSpend} hour(s) remaining</p>

                        </div>
                    </div>
                    <div>
                        <p>Description</p>
                        <JoditEditor name="description" onChange={(value) => formik.setFieldValue("description", value)} />
                        {formik.errors.description ? (
                            <div className='text-danger'>{formik.errors.description}</div>
                        ) : null}
                    </div>

                </form>


            </Drawer >
        </>
    )
}

