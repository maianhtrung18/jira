import {  notification } from 'antd';

export const notifiFunction = (type, message, desc) => {
    notification[type]({
        message: message,
        description: desc,
    });
}