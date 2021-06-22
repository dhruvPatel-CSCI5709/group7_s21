import React from 'react'
import './Dashboard.css'
import Sidebar from '../sidebar/Sidebar'

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div className='main'>Dashboard</div>
    </div>
  )
}
