import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

const LogoutPage = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.removeItem('loginStatus')
    history.push('/login')
    window.location.reload(false)
  }, [])

  return <Fragment></Fragment>
}

export default LogoutPage
