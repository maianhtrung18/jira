import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../ulti/constants';

export default function CreateTask() {
    const {visible} = useSelector(state => state.createTaskReducer);
    let dispatch = useDispatch();
    const showDrawer = () => {
        dispatch({type:OPEN_DRAWER});
    };
    const onClose = () => {
        dispatch({type:CLOSE_DRAWER});
    };
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
            </Drawer>
        </>
    )
}

