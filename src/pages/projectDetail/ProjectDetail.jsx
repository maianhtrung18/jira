import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
    let projectId = useParams()
    console.log(projectId.id)
  return (
    <div>ProjectDetail</div>
  )
}
