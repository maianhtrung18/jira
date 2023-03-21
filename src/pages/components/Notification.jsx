import React from 'react'
import { Button, notification, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';



export default function Notification() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }
    return (
        <div>

        </div>
    )
}
