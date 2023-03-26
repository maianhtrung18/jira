import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { history } from '../App'
import Header from '../pages/components/Header'


export default function ProjectManagerTemplate(props) {
    let userInfo = useSelector(state => state.loginReducer)
    // console.log(userInfo)
    if(userInfo === null) {
        history.push('/login')
    }
    return (
        <Route exact path={props.path} render={(propsRoute) => {

            return <div>
                    <Header/>
                    <props.component {...propsRoute} />
            </div>
        }}>
        </Route>
    )
}
