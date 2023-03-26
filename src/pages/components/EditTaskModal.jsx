import { useEffect, useState } from 'react';
import React from 'react'
import { Collapse, Radio, Select, Space, Input, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskService, getPriorityService, getStatusService, getTaskTypeService, getUserByProject } from '../../services/createTaskService';
import { getTaskDetailAction } from '../../redux/action/editTaskAction';


export default function EditTaskModal() {
  const { Panel } = Collapse;
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

 
  let taskDetail = useSelector(state => state.taskReducer.taskDetail)
  return (
    <div>

      <div>
        <div className="modal fade" id="taskModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ height: 'auto' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">

              <div className='container mt-3'>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                      <input type="text" className="form-control" value={taskDetail.taskName} />
                    </div>
                    <div className="form-group">
                      <label htmlFor>Description</label>
                      <input type="text" className="form-control" name value={taskDetail.description} />
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
                      <select className="form-control" name id>
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
                                taskDetail.assigness.map((ass) => {
                                  return {value:ass.id,label:ass.name}
                                })

                              }
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <p className='font-weight-300'>Priority</p>
                          </div>
                          <div className="col-8">
                            <select className='form-control' name>
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
                            <Input placeholder="" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <p className='font-weight-300'>Time Tracking</p>
                          </div>
                          <div className="col-8">
                            <Slider defaultValue={30} />
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

