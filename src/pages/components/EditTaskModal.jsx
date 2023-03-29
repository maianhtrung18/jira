import { useEffect, useState } from 'react';
import React from 'react'
import { Collapse, Radio, Select, Space, Input, Slider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskService, getPriorityService, getStatusService, getTaskTypeService, getUserByProject } from '../../services/createTaskService';
import { getTaskDetailAction } from '../../redux/action/editTaskAction';
import { updateDesService, updatePrioService, updateStatusService } from '../../services/editTaskService';
import { projectDetailAction } from '../../redux/action/projectDetailAction';
import { notifiFunction } from '../../ulti/notification';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_DESC, UPDATE_TASKNAME } from '../../ulti/constants';
import {
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import JoditEditor from 'jodit-react';

export default function EditTaskModal(props) {
  const { Panel } = Collapse;
  const { Paragraph } = Typography;
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const options = [];
  let [status, setStatus] = useState([])
  let [priority, setPriority] = useState([])
  let [taskType, setTaskType] = useState([])
  let dispatch = useDispatch();
  useEffect(() => {
    getStatus();
    getPriority();
    getTaskType();
  }, [])

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

  const getPriority = () => {
    getPriorityService().then((res) => {
      console.log(res.data.content, "res prio")
      setPriority(res.data.content)
    })
    getPriorityService().catch((err) => {
      console.log(err, "err priority")
    })
  }

  const getTaskType = () => {
    let promise = getTaskTypeService();
    promise.then((res) => {
      console.log(res.data.content)
      setTaskType(res.data.content)
    })
    promise.catch((err) => {
      console.log(err, "err tasktype")
    })
  }

  let getProjectDetailInfo = (id) => {
    let action = projectDetailAction(id)
    dispatch(action)

  }
  let {getTaskDetail} = props
  
  const updateStatus = (task, status, idPro) => {
    let stt = updateStatusService(task, status);
    stt.then((res) => {
      console.log(res)
      getProjectDetailInfo(idPro)
    })
    stt.catch((err) => {
      console.log(err)
    })
  }

  const updatePrio = (task, prio, idPro) => {
    let stt = updatePrioService(task, prio);
    stt.then((res) => {
      console.log(res)
      getProjectDetailInfo(idPro)
    })
    stt.catch((err) => {
      console.log(err)
      getTaskDetail(task);
      notifiFunction("error",`${err.response.data.content}`)
    })
  }
  let userList = useSelector(state => state.taskReducer.userList)

  let taskDetail = useSelector(state => state.taskReducer.taskDetail)
  let assList = taskDetail.assigness.map((ass) => {
    return {label: ass.name, value: ass.id}
  })
  let [kt, setkt] = useState(false);
  let [ktDes, setktDes] = useState(false);

  const updateDescription = (taskId, desc, proId) => {
    let description = updateDesService(taskId, desc);
    description.then((res) => {
      console.log(res)
      getTaskDetail(proId)
    })
    description.catch((err) => {
      console.log(err)
      notifiFunction("error", err.response.data.content)
    })
  }
  let desUpdate = useSelector(state => state.taskReducer.desc)
  return (
    <div>

      <div>
        <div className="modal fade" id="taskModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ height: 'auto' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">

              <div className='container mt-3'>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {setkt(false); setktDes(false)}}>
                  <span aria-hidden="true">×</span>
                </button>
                <select className='form-control w-25' name>
                  {
                    taskType.map((task) => {
                      if (task.id === taskDetail.taskTypeDetail.id) {
                        return <option key={task.id} value={task.id} selected>{task.taskType}</option>
                      }
                      else {
                        return <option key={task.id} value={task.id}>{task.taskType}</option>
                      }
                    })
                  }
                </select>
              </div>

              <div className="modal-body">

                <div className="row">
                  <div className="col-7">
                    <div className="form-group">
                      <label htmlFor></label>
                      
                      
                      {kt ? <div><input type="text" className="form-control" value={taskDetail.taskName} name='taskName' onChange={
                        (e) => {
                          
                          let action = {
                            type: UPDATE_TASKNAME,
                            data: e.target.value,
                          }
                          console.log(e.target.value)
                          dispatch(action);
                        }
                      
                      } /><button className='btn btn-success'><CheckOutlined /></button>
                        <button className='btn btn-danger' onClick={() => {setkt(false); getTaskDetail(taskDetail.taskId)}}><CloseOutlined /></button></div> : <h5 style={{fontWeight:'700'}} onClick={() => {setkt(true)}}>{taskDetail.taskName} </h5> }
                    </div>
                    <div className="form-group">
                      <label htmlFor>Description</label>
                      {ktDes ?  <div>
                          <JoditEditor value={taskDetail.description} onChange={(value) => {
                              let action = {
                                type: UPDATE_DESC,
                                data: value
                              }
                              dispatch(action)
                          }}/>
                          <button className='btn btn-success mr-2' onClick={() => {
                            updateDescription(taskDetail.taskId, desUpdate,taskDetail.projectId);
                          }}>Save</button>
                          <button className='btn btn-danger' onClick={() => {setktDes(false)}}>Cancel</button>
                        </div> 
                        : <p onClick={() => {setktDes(true)}}>{taskDetail.description}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor>Comment</label>
                      <div className='d-flex'>
                        <img src="https://ui-avatars.com/api/?name=Thanh Quang Tran" alt="1" />
                        <input type="text" className="form-control" name placeholder='Add comment...' />
                      </div>

                    </div>

                  </div>
                  <div className='col-5'>


                    <div className="form-group w-50">
                      <label htmlFor />
                      <select className="form-control" name onChange={(event) => {
                        updateStatus(taskDetail.taskId, event.target.value, taskDetail.projectId);
                      }}>
                        {
                          status.map((stt) => {
                            if (stt.statusId === taskDetail.statusId) {
                              return <option key={stt.statusId} value={stt.statusId} selected>{stt.statusName}</option>
                            }
                            else {
                              return <option key={stt.statusId} value={stt.statusId}>{stt.statusName}</option>
                            }

                          })
                        }
                      </select>
                    </div>
                    <Collapse defaultActiveKey={['1']}>
                      <Panel header="Details" key="1">
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Assingees</p>
                          </div>
                          <div className="col-8">
                            <Select
                              mode="multiple"
                              placeholder="Choose Assignee"
                              style={{
                                width: '100%',
                              }}
                              options={
                                userList.map((ass) => {
                                  return { value: ass.userId, label: ass.name }
                                })

                              }
                              value={assList}
                              onChange={
                                (value) => {
                                  console.log(value)
                                }
                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <p className='font-weight-300'>Priority</p>
                          </div>
                          <div className="col-8">
                            <select className='form-control' name onChange={(event) => {
                             
                              updatePrio(taskDetail.taskId, event.target.value, taskDetail.projectId)
                            }}>
                              {
                                priority.map((pri) => {
                                  if (pri.priorityId === taskDetail.priorityId) {
                                    return <option key={pri.priorityId} value={pri.priorityId} selected>{pri.priority}</option>
                                  }
                                  else {
                                    return <option key={pri.priorityId} value={pri.priorityId}>{pri.priority}</option>
                                  }

                                })
                              }
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Estimate</p>
                          </div>
                          <div className="col-8">
                            <Input placeholder="" value={taskDetail.timeTrackingRemaining + taskDetail.timeTrackingSpent} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Time Spent</p>
                          </div>
                          <div className="col-8">
                            <Input placeholder="" value={taskDetail.timeTrackingSpent} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Time Tracking</p>
                          </div>
                          <div className="col-8">
                            <Slider max={taskDetail.timeTrackingRemaining + taskDetail.timeTrackingSpent}
                              value={taskDetail.timeTrackingSpent} />
                            <div className='d-flex justify-content-between'>
                              <p style={{ fontWeight: '600' }}> {taskDetail.timeTrackingSpent}(h) spent</p>
                              <p style={{ fontWeight: '600' }}>{taskDetail.timeTrackingRemaining}(h) remaining</p>
                            </div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

