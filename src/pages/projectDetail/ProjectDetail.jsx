import React from 'react'
import { useParams } from 'react-router-dom'
import EditTaskModal from '../components/EditTaskModal'

export default function ProjectDetail() {
    let projectId = useParams()
  return (
    <div>
        <EditTaskModal/>
        <div>Project detail</div>
        <div>{projectId.id}</div>
    </div>
   
  )
}
