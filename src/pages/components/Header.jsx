import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { OPEN_DRAWER } from '../../ulti/constants'
import { USER_INFO } from '../../ulti/setting'

export default function Header() {
    let userInfo = useSelector(state => state.loginReducer)
    let dispatch = useDispatch()
    console.log(userInfo)

    if (userInfo === null){
        console.log('null')
    }
    else{
        console.log('khong null')
         console.log(userInfo.email)
    }
    //let user = localStorage.getItem(JSON.stringify(USER_INFO));
    // console.log(userInfo.name)
    return (
      <div className='d-flex justify-content-between align-items-center headerJira'>
          <nav className="navbar navbar-expand-lg navbar-light">
              <NavLink className="navbar-brand" to='/home'>
                  <img src="https://demo3.cybersoft.edu.vn/ico.png" style={{ width: '20px' }} alt="aaa" />
                  Jira
              </NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                      <li className="nav-item dropdown activeJira">
                          <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                              Projects
                          </a>
                          <div className="dropdown-menu">
                              <NavLink className="dropdown-item" to="/home">View all Projects</NavLink>
                              <a className="dropdown-item" href="#">Create Project</a>
                          </div>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                              Users
                          </a>
                          <div className="dropdown-menu">
                              <NavLink className="dropdown-item" to="/user">View all Users</NavLink>
                          </div>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="#" onClick={() => {
                            dispatch({type:OPEN_DRAWER})
                          }}>Create Task</a>
                      </li>
                  </ul>
              </div>
          </nav >
          <div className='d-flex align-items-center'>
              
              <div className="dropleft">
                  <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-gear"></i>
                  </button>
                  <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                  </div>
              </div>
              <button className='btn btn-info'>
                  {userInfo.name}
              </button>

          </div>

      </div >
  )
}
