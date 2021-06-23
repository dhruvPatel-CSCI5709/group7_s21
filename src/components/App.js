import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import 'antd/dist/antd.css'
import DeleteProfile from './deleteProfile/deleteProfile'
import HomePage from './homePage/HomePage'
import IncorrectPassword from './incorrectPassword/IncorrectPassword'
import Profile from './profile/Profile'
import Dashboard from './dashboard/Dashboard'
import Reports from './reports/Reports'
import Expense from './expense/Expense'

export default function PermanentDrawerLeft() {
  const history = useHistory()

  useEffect(() => {
    const loginStatus = localStorage.getItem('loginStatus')
    if (!loginStatus) {
      history.push('/login')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/' component={HomePage} />
        <Route path='/deleteProfile' component={DeleteProfile}></Route>
        <Route path='/profile' component={Profile}></Route>
        <Route path='/homePage' component={HomePage}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Route path='/incorrectPassword' component={IncorrectPassword}></Route>
        <Route path='/reports' component={Reports}></Route>
        <Route path='/expense' component={Expense}></Route>
        <Route path='/login' component={Login}></Route>
      </div>
    </BrowserRouter>
  )
}
