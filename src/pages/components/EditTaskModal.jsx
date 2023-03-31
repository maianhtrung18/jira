import { useEffect, useState } from 'react';
import React from 'react'
import { Collapse, Radio, Select, Space, Input, Slider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskService, getPriorityService, getStatusService, getTaskTypeService, getUserByProject } from '../../services/createTaskService';
import { getTaskDetailAction } from '../../redux/action/editTaskAction';
import { deleteCommentService, insertCommentService, updateCommentService, updateDesService, updateEstimateService, updatePrioService, updateStatusService, updateTimeTrackingService } from '../../services/editTaskService';
import { projectDetailAction } from '../../redux/action/projectDetailAction';
import { notifiFunction } from '../../ulti/notification';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_ASSIGNEE, UPDATE_COMMENT, UPDATE_DESC, UPDATE_ESTIMATE, UPDATE_TASKNAME, UPDATE_TIMETRACKING } from '../../ulti/constants';
import {
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import JoditEditor from 'jodit-react';

export default function EditTaskModal(props) {
  const { Panel } = Collapse;
  const {TextArea} = Input
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
  let { getTaskDetail } = props

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
      //getTaskDetail(task);
      notifiFunction("error", `${err.response.data.content}`)
    })
  }
  let userList = useSelector(state => state.taskReducer.userList)
  let taskDetail = useSelector(state => state.taskReducer.taskDetail)
  let [assList, setAssList] = useState([])
  assList = taskDetail.assigness.map((ass) => {
    return ass.id
  })

  const handleChange = (value) => {
    setAssList(value)
  }
  let [kt, setkt] = useState(false);
  let [ktDes, setktDes] = useState(false);
  let [ktEst, setktEst] = useState(false);

  const updateDescription = (taskId, desc) => {
    let description = updateDesService(taskId, desc);
    description.then((res) => {
      console.log(res)
      getTaskDetail(taskId)
    })
    description.catch((err) => {
      console.log(err)
      notifiFunction("error", err.response.data.content)
    })
  }
  let desUpdate = useSelector(state => state.taskReducer.desc)
  
  const updateEstimate = async (taskId, est, timeSpent) => {
    console.log(est)
    if (est !== 0) {
      try {
        let result = await updateEstimateService(taskId, est);
        console.log(result);
        let result2 = await updateTimeTrackingService(taskId, timeSpent, est-timeSpent )
        getTaskDetail(taskId);
      } catch (err) {
        console.log(err)
        notifiFunction("error", err.response.data.content)
      }
    }
  }
 
  const updateTimeTracking = (taskId, timeSpent, timeRemain) => {
    if (timeSpent !== 0) {
      let promise = updateTimeTrackingService(taskId, timeSpent, timeRemain);
      promise.then((res) => {
        console.log(res)
        getTaskDetail(taskId)
      })
      promise.catch((err) => {
        console.log(err)
        notifiFunction("error", err.response.data.content)
      })
    } 
  }
  let [ktTime, setktTime] = useState(false)

  let [ktCom, setktCom] = useState(0)
  const renderComment = () => {
    return taskDetail.lstComment.map((com, index) => {
      return <div className='d-flex mt-3' key={index}>
        <img src={com.avatar} className='comment' alt="avatar" />
        <div className='w-100'>
          <h6 className='font-weight-bold' style={{ marginBottom: '2px', fontSize: '14px' }}>{com.name}</h6>
          {(ktCom == com.id) ? <div className='d-flex'>
              <TextArea value={com.commentContent} onChange={(e) => {
                dispatch({
                  type: UPDATE_COMMENT,
                  data: {
                    value: e.target.value,
                    idCom: com.id
                  }
                })
              }}/> 
              <button className='btn btn-light mr-2' onClick={() => {setktCom(0); getTaskDetail(taskDetail.taskId)}}><CloseOutlined/></button>
              <button className='btn btn-light' onClick={() => {
                updateComment(com.id, com.commentContent, taskDetail.taskId)
                setktCom(0)
              }}><CheckOutlined/></button>
            
            </div> : 
            <p style={{ marginBottom: '2px' }}>{com.commentContent}</p>
          }
          
          <div className='comment_button mt-4'>
              <span className='mr-2 hoverButton' onClick={() => {setktCom(com.id)}} >Edit</span>
              <span className='hoverButton' onClick={() => {deleteComment(com.id, taskDetail.taskId)}}>Delete</span>
            
          </div>

        </div>
      </div>
    })
  }

  const insertComment = (idTask, comment) => {
    let promise = insertCommentService(idTask, comment)
    promise.then((res) => {
      console.log(res)
      getTaskDetail(idTask)
    })
    promise.catch((err) => {
      notifiFunction("error",err.response.data.content)
    })
  }

  const deleteComment = (idCom,idTask) => {
    let promise = deleteCommentService(idCom)
    promise.then((res) => {
      console.log(res)
      getTaskDetail(idTask)
    })
    promise.catch((err) => {
      notifiFunction("error", err.response.data.content)
    })
  }

  const updateComment = (idCom, content, taskId) => {
    let promise = updateCommentService(idCom, content);
    promise.then((res) => {
      getTaskDetail(taskId)
    })
    promise.catch((err) => {
      notifiFunction("error", err.response.data.content)
    })
  }

  return (
    <div>

      <div>
        <div className="modal fade" id="taskModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ height: 'auto' }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable"> 
            <div className="modal-content">

              <div className='container mt-3'>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { setkt(false); setktDes(false); setktEst(false) }}>
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

                <div className="row ">
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

                      } /><button className='btn btn-light'><CheckOutlined /></button>
                        <button className='btn btn-light' onClick={() => { setkt(false); getTaskDetail(taskDetail.taskId) }}><CloseOutlined /></button></div> : <h5 style={{ fontWeight: '700' }} onClick={() => { setkt(true) }}>{taskDetail.taskName} </h5>}
                    </div>
                    <div className="form-group">
                      <label style={{fontWeight:'600'}} htmlFor>Description</label>
                      {ktDes ? <div>
                        <JoditEditor value={taskDetail.description} onChange={(value) => {
                          let action = {
                            type: UPDATE_DESC,
                            data: value
                          }
                          dispatch(action)
                        }} />
                        <button className='btn btn-success mr-2' onClick={() => {
                          updateDescription(taskDetail.taskId, desUpdate, taskDetail.projectId);
                        }}>Save</button>
                        <button className='btn btn-danger' onClick={() => { setktDes(false) }}>Cancel</button>
                      </div>
                        : <p onClick={() => { setktDes(true) }}>{taskDetail.description.slice(3, taskDetail.description.length - 4)}</p>}
                    </div>
                    <div className="form-group">
                      <label style={{fontWeight:'600'}} htmlFor>Comment</label>
                      <div className='d-flex'>
                        <img src="https://ui-avatars.com/api/?name=Thanh Quang Tran" className='comment' alt="1" />
                        <Input type="text" className="form-control" name placeholder='Add comment...' onPressEnter={(e) => {
                          console.log(e.target.value)
                          insertComment(taskDetail.taskId, e.target.value)
                        }} />
                      </div>
                      {renderComment()}

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
                              value={assList}
                              placeholder="Choose Assignee"
                              style={{
                                width: '100%',
                              }}
                              options={
                                userList.map((ass) => {
                                  return { value: ass.userId, label: ass.name }
                                })
                              }
                              onChange={
                                (value) => { console.log(value) }
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
                            {ktEst ?
                              <div>
                                <Input type='number' value={taskDetail.originalEstimate} onChange={(e) => {
                                  console.log(taskDetail.originalEstimate, "onchange")
                                  dispatch({
                                    type: UPDATE_ESTIMATE,
                                    data: e.target.value
                                  })
                                }} />
                                <button className='btn btn-light mr-1' onClick={() => {
                                  console.log(taskDetail.originalEstimate, "originalEstimate")
                                  updateEstimate(taskDetail.taskId, taskDetail.originalEstimate, taskDetail.timeTrackingSpent)
                                  setktEst(false);
                                }}><CheckOutlined /></button>
                                <button className='btn btn-light' onClick={() => {
                                  setktEst(false);
                                  getTaskDetail(taskDetail.taskId)
                                }}><CloseOutlined /></button>
                              </div>
                              : <p style={{ fontWeight: '700' }} onClick={() => {
                                setktEst(true)
                              }}>{taskDetail.originalEstimate}h</p>
                            }

                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Time Spent</p>
                          </div>
                          <div className="col-8">
                            {ktTime ? <div>
                              <Input type='number' value={taskDetail.timeTrackingSpent} onChange={(e) => {
                              dispatch({
                                type: UPDATE_TIMETRACKING,
                                data: e.target.value
                              })
                            }} /> 
                              <button className='btn btn-light mr-2' onClick={() => {
                                updateTimeTracking(taskDetail.taskId, taskDetail.timeTrackingSpent, taskDetail.originalEstimate - taskDetail.timeTrackingSpent)
                              }}><CheckOutlined /></button>
                              <button className='btn btn-light' onClick={() => {
                                setktTime(false);
                                getTaskDetail(taskDetail.taskId)
                              }}><CloseOutlined /></button>
                            </div> 
                            : 
                              <p className='font-weight-bold' onClick={() => {setktTime(true)}}>{taskDetail.timeTrackingSpent}h</p>                           
                            }
                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Time Tracking</p>
                          </div>
                          <div className="col-8">
                            <Slider max={taskDetail.originalEstimate}
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

