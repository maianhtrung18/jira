import React, { useState } from 'react'
import { Route } from 'react-router-dom'



export default function ProjectManagerTemplate(props) {
    return (
        <Route exact path={props.path} render={(propsRoute) => {
 
         return   <div>
                <props.component {...propsRoute.component}/>
            </div>   
        }}>
        </Route>
    )
}
