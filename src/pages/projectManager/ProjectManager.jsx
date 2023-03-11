import React, { useEffect, useState } from 'react'
import { Input, Popover, Space, Table, Tag } from 'antd';
import { createProject, deleteProject, getProjectCategory, getProjectInfo, getUsers, updateProject } from '../../services/services';
import { SEARCH_PROJECT, TOKEN } from '../../ulti/setting';
import JoditEditor from 'jodit-react';
import { number } from 'yup';
import MembersListProject from '../components/MembersListProject';
import AddUser from '../components/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { projectManagerAction } from '../../redux/action/projectManagerAction';
const { Search } = Input;


export default function ProjectManager() {

    let nullInfo = {
        "lstTask": [
        ],
        "members": [],
        "creator": {
            "id": number,
            "name": ""
        },
        "id": 'Auto generate',
        "projectName": "",
        "description": "",
        "projectCategory": {
            "id": number,
            "name": ""
        },
        "alias": "",
        "create": true,
    }

    let dispatch = useDispatch()
    let [projectIdEdit, setProjectIdEdit] = useState(nullInfo)
    useEffect(() => {
        getAllProjectList();
        getCategory();
        getArrUsers();
    }, [])

    let [category, setCategory] = useState([])
    let projectList = useSelector(state => state.ProjectManagementReducer[0])
    let [users, setUsers] = useState([])

    let content = (projectId) => {
        return <AddUser users={users} projectId={projectId} />
    }

    let getArrUsers = () => {
        let token = localStorage.getItem(TOKEN)
        let getListUser = getUsers(token)
        getListUser.then((result) => {
            setUsers(result.data.content)
        })
    }

    let getCategory = () => {
        let projectCategory = getProjectCategory()
        projectCategory.then((result) => {
            setCategory(result.data.content)
        })
    }

    let generateProjectCategory = () => {
        return category.map((element) => {
            return <option value={element.id}>{element.projectCategoryName}</option>
        })
    }

    let getAllProjectList = () => {
        let action = projectManagerAction()
        dispatch(action)
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Category name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: 'Members',
            key: 'members',
            dataIndex: 'member',
            render: (_, { tags: members }) => (
                <>
                    {members[0].length > 3 ?
                        <>
                            <div className='memberList'>
                                <Tag key={members[0][0].userId}>
                                    {members[0][0].name.charAt(0).toUpperCase()}
                                </Tag>
                                <Tag key={members[0][1].userId}>
                                    {members[0][1].name.charAt(0).toUpperCase()}
                                </Tag>
                                <Tag key={members[0][2].userId}>
                                    ...
                                </Tag>

                                <div className='members'>
                                    <MembersListProject member={members} />
                                </div>
                            </div>

                            <div className='addMembers'>
                                <Popover placement="rightTop" title={'Add user'} content={content(members[1])} trigger="click">
                                    <Tag key={members[0].userId + 1} style={{ cursor: 'pointer' }}>  <div >+</div></Tag>
                                </Popover>
                            </div>
                        </>
                        :
                        <>
                            <div className='memberList'>
                                {members[0].map((member) => {
                                    return (
                                        <Tag key={member.userId}>
                                            {member.name.charAt(0).toUpperCase()}
                                        </Tag>
                                    );
                                })}
                                <div className='members'>
                                    {/* {console.log(members)} */}
                                    <MembersListProject member={members} />
                                </div>
                            </div>

                            <Popover placement="rightTop" title={'Add user'} content={content(members[1])} trigger="click">
                                <Tag key={members[0].userId + 1} style={{ cursor: 'pointer' }}>
                                    <div>+</div>
                                </Tag>
                            </Popover>

                        </>
                    }
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (id) => (
                <Space size="middle">
                    <button className='btn btn-primary btn-sm' data-toggle="modal" data-target="#exampleModal" onClick={() => {
                        let token = localStorage.getItem(TOKEN)
                        let getProInfo = getProjectInfo(id, token)
                        getProInfo.then((result) => {
                            setProjectIdEdit(result.data.content)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }}>
                        E
                    </button>
                    <button className='btn btn-danger btn-sm' onClick={() => {
                        let token = localStorage.getItem(TOKEN)
                        if (window.confirm("Bạn có chắc muốn xoá không")) {
                            let deletePro = deleteProject(id, token)
                            deletePro
                                .then(() => {
                                    alert('Xoá thành công')
                                    getAllProjectList()
                                })
                                .catch((error) => {
                                    alert(error.response.data.content)
                                })
                        }
                    }}>D</button>
                </Space>
            ),
        },
    ];

    // const data = [
    //     {
    //         key: '1',
    //         id: '123',
    //         name: 'John Brown',
    //         age: 32,
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         tags: ['cool', 'teacher'],
    //     },
    // ];

    let handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            "projectName": projectIdEdit.projectName,
            "description": projectIdEdit.description,
            "categoryId": projectIdEdit.projectCategory.id
        }

        if (projectIdEdit.projectName !== '') {
            let token = localStorage.getItem(TOKEN)
            if (projectIdEdit.create === true) {
                let create = createProject(token, data)
                create.then((result) => {
                    getAllProjectList()
                })
                    .catch((error) => {
                        alert('Create project không thành công')
                    })
            } else {
                let update = updateProject(projectIdEdit.id, token, data)
                update.then((result) => {
                    getAllProjectList()
                })
                    .catch((error) => {
                        alert('Update project không thành công')
                    })
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin')
        }
    }

    let handleChangeForm = (e) => {
        setProjectIdEdit({ ...projectIdEdit, [e.target.name]: e.target.value })
    }

    return (
        <div className='projectManager'>
            <div className='projectManager_Container'>
                <div className='projectManager_ContainerTitle'>
                    <h3>Project Management</h3>
                    <button className='btn btn-success' data-toggle="modal" data-target="#exampleModal" onClick={() => {
                        setProjectIdEdit(nullInfo)
                    }}>Create Project</button>
                </div>
                <Space className='searchInput' direction="vertical">
                    {/* {takeProject()} */}
                    <Search
                        onChange={(event) => {
                            // console.log(event.target.value)
                            // projectList = projectListAll.filter((project) => {
                            //     return project.name.toLowerCase().match(event.target.value.toLocaleLowerCase())
                            // })
                            // console.log(projectList)
                            // setRerender(true)
                            // setProjectList(projectList)
                            // getAllProjectList()
                            let action = {
                                type: SEARCH_PROJECT,
                                // data: projectList,
                                keyword: event.target.value
                            }
                            dispatch(action)
                        }}
                        placeholder="input search text"
                        onSearch={(value, event) => {
                            console.log(value)
                            console.log(event)
                        }}
                        style={{
                            width: 200,
                        }}
                    />
                </Space>
                <Table columns={columns} dataSource={projectList} />
            </div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Project Id</label>
                                    <input name='id' type="text" value={projectIdEdit.id} disabled='disabled' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input name='projectName' onChange={handleChangeForm} value={projectIdEdit.projectName} type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Project Category</label>
                                    {/* <input type="text" className="form-control" /> */}
                                    <select name="categoryId" onChange={(e) => {
                                        setProjectIdEdit({
                                            ...projectIdEdit, "projectCategory": {
                                                "id": e.target.value,
                                                "name": ""
                                            },
                                        })
                                    }} value={projectIdEdit.projectCategory.id} className="form-control">
                                        {generateProjectCategory()}
                                    </select>
                                </div>
                                <JoditEditor onChange={newContent => {
                                    setProjectIdEdit({ ...projectIdEdit, 'description': newContent })
                                }} name='description' value={projectIdEdit.description} />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
