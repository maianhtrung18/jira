import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectDetail } from '../../services/services'
import { TOKEN } from '../../ulti/setting'
import { Input, Popover, Space, Table, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { OPEN_DRAWER } from '../../ulti/constants';
const { Search } = Input;

export default function ProjectDetail() {
    let projectId = useParams()
    let [projectInfo, setProjectInfo] = useState({})
    useEffect(() => {
        getProjectDetailInfo()
    }, [])

    let dispatch = useDispatch()

    let getProjectDetailInfo = () => {
        let token = localStorage.getItem(TOKEN)
        let projectDetail = getProjectDetail(token, projectId.id)
        projectDetail.then((result) => {
            console.log(result)
            setProjectInfo(result.data.content)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    let generateTypeOfTasks = () => {
        console.log(projectInfo.lstTask)
        if (projectInfo.lstTask) {
            return projectInfo.lstTask.map((element) => {
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
                console.log(task)
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
                <h3 className='projectDetail_Title'>{projectInfo.projectName}</h3>
                <div className='projectDetail_Description'>{projectInfo.description ? projectInfo.description.replace(/<\/?[^>]+(>|$)/g, "") : ''}</div>
                <div>
                    <Space className='searchInput' direction="vertical">
                        <Search
                            onChange={''}
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
