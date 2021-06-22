import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import 'antd/dist/antd.css'
import DeleteProfile from '../components/deleteProfile/deleteProfile'
import HomePage from '../components/homePage/HomePage'
import IncorrectPassword from '../components/incorrectPassword/IncorrectPassword'
import Profile from '../components/profile/Profile'
import Dashboard from '../components/dashboard/Dashboard'
import Reports from '../components/reports/Reports'
import Login from '../components/login/LoginPage'

export default function PermanentDrawerLeft() {
  const history = useHistory()

  useEffect(() => {
    const loginStatus = localStorage.getItem('loginStatus')
    if (!loginStatus) {
      history.push('/login')
    }
  }, [])

  return (
    <div className='App'>
      <Route exact path='/' component={HomePage} />
      <Route path='/deleteProfile' component={DeleteProfile} />
      <Route path='/profile' component={Profile} />
      <Route path='/homePage' component={HomePage} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/incorrectPassword' component={IncorrectPassword}></Route>
      <Route path='/reports' component={Reports}></Route>
      <Route path='/login' component={Login}></Route>
    </div>
  )
}
