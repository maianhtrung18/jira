import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectDetail } from '../../services/services'
import { SEARCH_TASKS, TOKEN } from '../../ulti/setting'
import { Input, Popover, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_DRAWER } from '../../ulti/constants';
import { projectDetailAction } from '../../redux/action/projectDetailAction';
const { Search } = Input;


export default function ProjectDetail() {

    let projectId = useParams()
    // let [projectInfo, setProjectInfo] = useState({})

    let projectInfo = useSelector(state => state.projectReducer)
    useEffect(() => {
        getProjectDetailInfo()
    }, [])

    let dispatch = useDispatch()

    let getProjectDetailInfo = () => {
        let action = projectDetailAction(projectId.id)
        dispatch(action)

    }

    let generateTypeOfTasks = () => {
        if (projectInfo[1]) {
            return projectInfo[1].map((element) => {
                return <div className='col-3 boardContainer'>
                    <div className='taskBoard'>
                        <h6 className='taskBoard_Title'>{element.statusName}</h6>
                        {
                            generateTaskDetail(element)
                        }
                    </div>
                </div>
            })
        }
    }

    let generateTaskMember = (assignees) => {
        return assignees.map((member) => {
            return <img key={member.id} className='taskAva' src={member.avatar} alt="" />
        })
    }

    let generateTaskDetail = (element) => {
        if (element.lstTaskDeTail) {
            return element.lstTaskDeTail.map((task) => {
                return <div className='taskContainer' onClick={() => {
                    dispatch({ type: OPEN_DRAWER })
                }}>
                    <div className='taskContainer_Task' >
                        <h6 className='taskContainer_TaskTitle'>{task.taskName}</h6>
                        <div className='taskContainer_TaskInfo'>
                            <div className='taskPriority'>
                                <p className='taskPriority_Content'>{task.priorityTask.priority}</p>
                            </div>
                            <div className='taskMember'>
                                {generateTaskMember(task.assigness)}
                            </div>
                        </div>
                    </div>
                </div>
            })
        }
    }

    return (
        <div className='projectDetail'>
            <div className='projectDetail_Container'>
                <h3 className='projectDetail_Title'>{projectInfo[0].projectName ? projectInfo[0].projectName : ''}</h3>
                <div className='projectDetail_Description'>{projectInfo[0].description ? projectInfo[0].description.replace(/<\/?[^>]+(>|$)/g, "") : ''}</div>
                <div>
                    <Space className='searchInput' direction="vertical">
                        <Search
                            onChange={(event)=> {
                                dispatch({
                                    type: SEARCH_TASKS,
                                    data: event.target.value
                                })
                            }}
                            placeholder="input search text"
                            onSearch={(value, event) => {
                            }}
                            style={{
                                width: 200,
                            }}
                        />
                    </Space>
                </div>

                <div className='ProjectDetail_Tasks row'>
                    {generateTypeOfTasks()}
                </div>
            </div>
        </div>
    )
}
