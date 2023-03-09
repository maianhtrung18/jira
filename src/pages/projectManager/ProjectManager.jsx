import React, { useEffect, useRef, useState } from 'react'
// import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Table, Tag } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import { createProject, deleteProject, getAllProject, getProjectCategory, getProjectInfo, updateProject } from '../../services/services';
import { TOKEN } from '../../ulti/setting';
import JoditEditor from 'jodit-react';
import { number } from 'yup';
import { history } from '../../App';
import MembersListProject from '../components/MembersListProject';
// import { useFormik } from 'formik';
const { Search } = Input;


// import {  } from 'antd';

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

    let projectData = useRef()
    let [projectIdEdit, setProjectIdEdit] = useState(nullInfo)
    useEffect(() => {
        getAllProjectList();
        getCategory();
    }, [])

    let [category, setCategory] = useState([])
    let [projectList, setProjectList] = useState([
    ])

    let getCategory = () => {
        let projectCategory = getProjectCategory()
        projectCategory.then((result) => {
            setCategory(result.data.content)
        })
    }

    let generateProjectCategory = () => {
        // console.log(category)
        return category.map((element) => {
            return <option value={element.id}>{element.projectCategoryName}</option>
        })
    }

    let getAllProjectList = () => {
        let projectArr = []
        let getProjectList = getAllProject()
        getProjectList.then((result) => {
            projectData.current = result.data.content
            projectArr = result.data.content.map((project, index) => {
                return {
                    key: `${index}`,
                    id: `${project.id}`,
                    name: project.projectName,
                    categoryName: project.categoryName,
                    creator: project.creator.name,
                    tags: project.members
                }
            })
            setProjectList(projectArr)
        })
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
            render: (text) => <a>{text}</a>,
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
                    {members.length > 3 ?
                        <>
                            <div className='memberList'>
                                <Tag key={members[0].userId}>
                                    {members[0].name.charAt(0).toUpperCase()}
                                </Tag>
                                <Tag key={members[1].userId}>
                                    {members[1].name.charAt(0).toUpperCase()}
                                </Tag>
                                <Tag key={members[2].userId}>
                                    ...
                                </Tag>

                                <div className='members'>
                                    <MembersListProject member={members} />
                                </div>
                            </div>
                            <Tag key={members[2] + 1} style={{ cursor: 'pointer' }} onClick={() => { console.log(true) }}>
                                +
                            </Tag>
                        </>
                        :
                        <>
                            <div className='memberList'>
                                {members.map((member) => {
                                    // let color = member.length > 5 ? 'geekblue' : 'green';
                                    // if (member === 'loser') {
                                    // color = 'volcano';
                                    // }
                                    // console.log(member)
                                    return (
                                        <Tag key={member.userId}>
                                            {member.name.charAt(0).toUpperCase()}
                                        </Tag>
                                    );
                                })}

                                <div className='members'>
                                    <MembersListProject member={members} />
                                </div>
                            </div>
                            <Tag key={members.userId + 1} style={{ cursor: 'pointer' }} onClick={() => { console.log(true) }}>
                                +
                            </Tag>
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
                                    history.go(0)
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
        // console.log(projectIdEdit)
        let data = {
            "projectName": projectIdEdit.projectName,
            "description": projectIdEdit.description,
            "categoryId": projectIdEdit.projectCategory.id
        }

        if (projectIdEdit.projectName !== '') {
            let token = localStorage.getItem(TOKEN)
            if (projectIdEdit.create === true) {
                // console.log(true)
                let create = createProject(token, data)
                create.then((result) => {
                    alert('Create project thành công')
                    history.go(0)
                })
                    .catch((error) => {
                        alert('Create project không thành công')
                    })
            } else {
                let update = updateProject(projectIdEdit.id, token, data)
                // console.log(data)
                update.then((result) => {
                    alert('Update project thành công')
                    history.go(0)
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

                        // let projectCategory = getProjectCategory()
                        // projectCategory.then((result) => {
                        //     console.log(result.content)
                        //     setProjectIdEdit(nullInfo)
                        // })


                        setProjectIdEdit(nullInfo)
                    }}>Create Project</button>
                </div>
                <Space className='searchInput' direction="vertical">
                    <Search
                        placeholder="input search text"
                        // onSearch={onSearch}
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
