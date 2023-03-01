import React, { useEffect, useRef, useState } from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Table, Tag } from 'antd';
import { getAllProject } from '../../services/services';
const { Search } = Input;

// import {  } from 'antd';

export default function ProjectManager() {

    let projectData = useRef()
    useEffect(() => {
        // console.log('run after render')
        getAllProjectList()
    }, [])

    let [projectList, setProjectList] = useState([
    ])

    //  {
    //             key: '1',
    //             id: '123',
    //             name: 'John Brown',
    //             age: 32,
    //             address: 'New York No. 1 Lake Park',
    //             tags: ['nice', 'developer'],
    //         },

    let getAllProjectList = () => {
        let projectArr = []
        // let project
        let getProjectList = getAllProject()
        getProjectList.then((result) => {
            console.log(result.data.content)
            projectData.current = result.data.content
            // let arr = result.data.content
            // console.log(arr)
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
            console.log(projectArr)
            setProjectList(projectArr)

        })
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.name.length - b.name.length,
            // render: (text) => <a>{text}</a>,
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
                    {members.map((member) => {
                        // let color = member.length > 5 ? 'geekblue' : 'green';
                        // if (member === 'loser') {
                            // color = 'volcano';
                        // }
                        // console.log(member)
                        return (
                            <Tag key={member.userId}>
                                {member.name.charAt(0).toUpperCase()}
                                {/* {member.toUpperCase()} */}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            id: '123',
            name: 'John Brown',
            age: 32,
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className='projectManager'>
            <div className='projectManager_Container'>
                <div className='projectManager_ContainerTitle'>
                    <h3>Project Management</h3>
                    <button className='btn btn-success'>Create Project</button>
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
        </div>
    )
}
