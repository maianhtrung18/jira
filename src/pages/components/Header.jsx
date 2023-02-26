import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    let userInfo = useSelector(state => state.loginReducer)
    console.log(userInfo)

    if (userInfo === null){
        console.log('null')
    }
    else{
        console.log('khong null')
         console.log(userInfo.email)
    }
  return (
    <div>Header</div>
  )
}
