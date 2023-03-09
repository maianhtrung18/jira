import React from 'react'

export default function AddUser(props) {
    console.log(props.users)
    console.log(props.users[0].length)
    return props.users.map((user, index) => {
            return <div>
                {user.name}{index}
            </div>
        }

    )
}
