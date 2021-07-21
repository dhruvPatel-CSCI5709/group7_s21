import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'

const LogoutPage = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.removeItem('loginStatus')
    localStorage.removeItem('token')
    Notification(notificationTypes.SUCCESS, 'Logout Success!')
    history.push('/login')
    window.location.reload(false)
  }, [])

  return <Fragment></Fragment>
}

export default LogoutPage
