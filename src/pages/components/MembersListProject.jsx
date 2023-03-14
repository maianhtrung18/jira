import React from 'react'
import { useDispatch } from 'react-redux'
import { projectManagerAction } from '../../redux/action/projectManagerAction'
import { removeUserFromProject } from '../../services/services'
import { TOKEN } from '../../ulti/setting'


export default function MembersListProject(props) {

    let dispatch = useDispatch()
    let reRender = () => {
        let action = projectManagerAction()
        dispatch(action)
    }

    let generateMem = () => {
        return props.member[0].map((mem) => {
            return <tr>
                <td>{mem.userId}</td>
                <td><img className='avatar' src={mem.avatar} alt="" srcset="" /></td>
                <td>{mem.name}</td>
                <td><button className='btn btn-danger btn-sm' onClick={() => {
                    let token = localStorage.getItem(TOKEN)
                    let data = {
                        projectId: props.member[1],
                        userId: mem.userId
                    }
                    let removeUser = removeUserFromProject(token, data)
                    removeUser.then(() => {
                        console.log('Xoa thanh cong')
                        reRender()
                    })
                        .catch((error) => {
                            console.log(error)
                            alert(error.response.data.message)
                        })
                }}>D</button></td>
            </tr>
        }
        )
    }
    return (
        <div className='memberTable py-2'>
            <h5>Members</h5>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {generateMem()}
                </tbody>
            </table>





        </div>
    )
}
