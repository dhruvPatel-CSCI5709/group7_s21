import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import 'antd/dist/antd.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { IntlProvider } from 'react-intl'
import messages from './messages'
import Main from './Main'
import './App.scss'
import Layout from './Layout'

export default function App() {
  const history = useHistory()
  const [locale, setLocale] = useState('en')
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    const status = localStorage.getItem('loginStatus')

    if (!status) {
      setLoginStatus(false)
    } else {
      setLoginStatus(true)
      history.push('/dashboard')
    }
  }, [])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className='App'>
        <Layout loginStatus={loginStatus} />
      </div>
    </IntlProvider>
  )
}
