import React, { useEffect } from 'react'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import 'antd/dist/antd.css'
import DeleteProfile from './deleteProfile/deleteProfile'
import HomePage from './homePage/HomePage'
import IncorrectPassword from './incorrectPassword/IncorrectPassword'
import Profile from './profile/Profile'
import Dashboard from './dashboard/Dashboard'
import Reports from './reports/Reports'
import Expense from './expense/Expense'
import Login from './login/LoginPage'
import ForgotPassword from './login/ForgotPassword'
import Register from './register/RegisterPage'

export default function App() {
  const history = useHistory()

  useEffect(() => {
    const loginStatus = localStorage.getItem('loginStatus')

    if (!loginStatus) {
      history.push('/login')
    }
  }, [])

  return (
    <div className='App'>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/register' component={Register}></Route>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/deleteProfile' component={DeleteProfile}></Route>
      <Route exact path='/profile' component={Profile}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
      <Route
        exact
        path='/incorrectPassword'
        component={IncorrectPassword}
      ></Route>
      <Route exact path='/reports' component={Reports}></Route>
      <Route exact path='/expense' component={Expense}></Route>
      <Route exact path='/forgotpassword' component={ForgotPassword}></Route>
    </div>
  )
}
