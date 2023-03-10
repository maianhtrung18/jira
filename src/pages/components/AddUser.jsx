import React, { useState } from 'react'
import { assignUserProject } from '../../services/services'
import { TOKEN } from '../../ulti/setting'

export default function AddUser(props) {
    console.log(props.users)

    let [users, setUsers] = useState(props.users)

    let listUser = () => {
        return users.map((user) => {
            return <tr className='table_Row' onClick={()=> {
                let token = localStorage.getItem(TOKEN)
                // console.log(props.projectId)
                let data = {
                    userId : user.userId,
                    projectId: props.projectId
                }
                let assignUser = assignUserProject(token, data)
                assignUser.then(() => {
                    console.log('Add thanh cong')
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                })
            }}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
            </tr>
        })
    }

    return <div className='listUserAdd'>
        <div className="form-group">
            <input type="text" className="form-control" onChange={(event) => {
                // console.log(event.target.value)
                let listUserSearch = props.users.filter((user) => {
                    return user.name.toLowerCase().match(event.target.value.toLowerCase())
                })
                setUsers(listUserSearch)
            }}/>
        </div>
        <div className='tableUserContainer'>
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                </tr>
            </thead>
            <tbody className='listUserAdd_Table'>
                {listUser()}
            </tbody>
        </table>
        </div>
        
    </div>

}
