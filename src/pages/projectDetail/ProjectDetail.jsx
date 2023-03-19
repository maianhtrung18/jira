import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
    let projectId = useParams()
  return (
    <div>
        <div>Project detail</div>
        <div>{projectId.id}</div>
    </div>
   
  )
}
