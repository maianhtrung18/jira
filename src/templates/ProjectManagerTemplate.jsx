import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import Header from '../pages/components/Header'



export default function ProjectManagerTemplate(props) {
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
