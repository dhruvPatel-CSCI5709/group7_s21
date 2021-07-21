import React, { useState } from 'react'
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import forgotPasswordImg from '../../img/forgot_password_img.png'
import './LoginPage.css'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'
import axios, { Routes } from '../../services/axios'

const ForgotPassword = ({ history }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const setInitErrorState = () => {
    setPasswordError('')
    setConfirmPasswordError('')
  }

  const formValidator = () => {
    let passwordError = ''
    let confirmPasswordError = ''

    if (password.trim().length === 0) {
      passwordError = 'Password is Required'
    } else if (password.trim().length < 8) {
      passwordError = 'Password Too Short'
    }

    if (confirmPassword.trim().length === 0) {
      confirmPasswordError = 'Confirm Password is Required'
    } else if (password !== confirmPassword) {
      confirmPasswordError = 'Passwords Do Not Match'
    }

    if (passwordError || confirmPasswordError) {
      setPasswordError(passwordError)
      setConfirmPasswordError(confirmPasswordError)
      return false
    }
    return true
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const isValid = formValidator()
    if (isValid) {
      setInitErrorState()
      try {
        setInitErrorState()
        const email = localStorage.getItem('userEmail')
        localStorage.removeItem('userEmail')
        const { url, method } = Routes.api.forgotPasswrdReset()
        const { data } = await axios[method](url, {
          email: email.toLowerCase(),
          newPassword: password,
        })

        if (data.success) {
          Notification(notificationTypes.SUCCESS, data.message)
          history.push('/login')
        } else {
          Notification(notificationTypes.ERROR, 'Password Reset Failed!')
        }
      } catch (err) {
        Notification(notificationTypes.ERROR, err)
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={8} md={6} sm={12}>
          <img
            className='w-100'
            src={forgotPasswordImg}
            alt='Forgot Password'
          />
        </Col>
        <Col lg={4} md={6} sm={12} className='mt-5'>
          <Card style={{ width: '22rem', marginTop: '2rem' }}>
            <Card.Body>
              <h1 style={{ textAlign: 'center' }} className='primary-color'>
                Forgot Password
              </h1>
              <hr />
              <Form onSubmit={submitHandler}>
                <Form.Group className='mt-2'>
                  <Form.Control
                    type='password'
                    placeholder='Enter New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className='error'>{passwordError}</div>

                <Form.Group className='mt-3'>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <div className='error'>{confirmPasswordError}</div>
                <hr />
                <div style={{ textAlign: 'center' }} className='my-2'>
                  Changed your mind?{' '}
                  <Link to='/login' className='primary-color'>
                    Sign In
                  </Link>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button type='submit' className='mt-3 px-5 btn-primary'>
                    Reset Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPassword
