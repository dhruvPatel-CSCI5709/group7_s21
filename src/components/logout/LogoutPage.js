/**
 * Author: Falgun Manishbhai Makadia (B00874635)
 * Description: LogoutPage Component - For Users to get OTP on their Registered Email to get started with their Password Reset Process
 */
import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'

/**
 * Description: LogoutPage Functional Component
 */
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
