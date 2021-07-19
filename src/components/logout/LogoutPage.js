import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

const LogoutPage = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.removeItem('loginStatus')
    history.push('/login')
  }, [])

  return <Fragment></Fragment>
}

export default LogoutPage
