/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { Space, Table, Tag, Button, Form, Input, Modal, } from 'antd';
import axios from 'axios';
import { ACCESS_TOKEN, EDIT_USER, TOKEN_CYBER, URL_API } from '../../ulti/constants';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser } from '../../services/UserService';
import FormEditUser from './EditUser';
import { TOKEN } from '../../ulti/setting';
import { SearchOutlined } from '@ant-design/icons';

export default function User() {
  let [userList, setUserList] = useState([]);
  let dispatch = useDispatch();
  let dispatch2 = useDispatch();
  useEffect(() => {
    getUserList()
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  })

  const handleChange = (pagination, filters, sorter, selectedKeys, confirm) => {
    //console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setSearchText('');
  };
  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (item2, item1) => {
        item2 = item2.name.trim().toLowerCase();
        item1 = item1.name.trim().toLowerCase();
        if (item2 < item1) {
          return 1;
        }
        else return -1
      },
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ...getColumnSearchProps('name')
    },
    {
      title: 'UserID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <button type="button" style={{ color: 'blue' }} className="btn" data-toggle="modal" data-target="#exampleModal" onClick={() => {
            let userEdit = {
              id: record.id,
              passWord: "",
              email: record.email,
              name: record.name,
              phoneNumber: record.phone,
              passConfirm: ""
            }

            let action = {
              type: EDIT_USER,
              data: userEdit
            }
            dispatch2(action)
          }
          }>
            <EditOutlined />
          </button>

          <button className='btn' style={{ color: 'red' }} onClick={() => {
            console.log(record.id, 'record id');
            let deleteUser = DeleteUser(record.id);
            deleteUser.then((res) => {
              getUserList();
            })
            deleteUser.catch((err) => {
              console.log(err);
            })
          }}><DeleteOutlined /></button>
        </Space>
      ),
    }
  ]
  let getUserList = () => {
    let accessToken = localStorage.getItem(TOKEN);
    let arrayUser = []
    let promise = axios({
      method: 'GET',
      url: `${URL_API}/Users/getUser`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'TokenCybersoft': TOKEN_CYBER
      }
    })
    promise.then((result) => {
      //console.log(result.data.content, 'getuserList')
      arrayUser = result.data.content.map((user, index) => {
        return {
          key: user.userId,
          no: index + 1,
          name: user.name,
          id: user.userId,
          email: user.email,
          phone: user.phoneNumber
        }
      })
      setUserList(arrayUser)
      //console.log(userList, 'useList')
      // let action = {
      //   type: 'GET_USER_LIST',
      //   data: arrayUser,
      // }
      // dispatch(action)

    })
    promise.catch((err) => {
      console.log(err, 'err')
    })
  }

  return (

    <div className='container mt-4'>
      <FormEditUser getUserList={getUserList} />
      <Button onClick={clearAll}>Clear filters and sorters</Button>
      <Table columns={columns} dataSource={userList} onChange={handleChange} />
    </div>
  )
}
