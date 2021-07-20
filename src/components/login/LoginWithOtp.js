import React, { useState } from 'react'
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'
import axios, { Routes } from '../../services/axios'

const LogInWithOTP = ({ history }) => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const [otpError, setOtpError] = useState('')
  const [emailError, setEmailError] = useState('')

  const setInitErrorState = () => {
    setOtpError('')
    setEmailError('')
  }

  const validateEmail = (email) => {
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    if (!regex.test(email)) {
      return false
    }
    return true
  }

  const validateOtp = (otp) => {
    const regex = new RegExp(/^[0-9]+$/i)
    if (!regex.test(otp)) {
      return false
    }
    return true
  }

  const formValidator = () => {
    let otpError = ''

    if (otp.trim().length === 0) {
      otpError = 'OTP is Required'
    } else if (!validateOtp(otp)) {
      otpError = 'Invalid OTP Format'
    } else if (otp.trim().length < 4 || otp.trim().length > 6) {
      otpError = 'Invalid OTP'
    }

    if (otpError) {
      setOtpError(otpError)
      return false
    }
    return true
  }

  const otpEmailSubmitValidator = () => {
    let emailError = ''

    if (email.trim().length === 0) {
      emailError = 'Email is Required!'
    } else if (email && !validateEmail(email.trim())) {
      emailError = 'Please Enter a Valid Email ID'
    }

    if (emailError) {
      setEmailError(emailError)
      return false
    }
    return true
  }

  const clickHandler = async () => {
    const isValid = otpEmailSubmitValidator()
    if (isValid) {
      try {
        const { url, method } = Routes.api.loginUserWithOtp()
        const { data } = await axios[method](url, { email })
        if (data.success) {
          Notification(notificationTypes.SUCCESS, 'OTP sent to your Email ID')
          setButtonClicked(true)
        } else {
          Notification(notificationTypes.ERROR, 'OTP could not be sent')
        }
        setInitErrorState()
      } catch (err) {
        Notification(notificationTypes.ERROR, err)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const isValid = formValidator()
    if (isValid) {
      try {
        const { url, method } = Routes.api.verifyOtpLogin()
        const { data } = await axios[method](url, { email, otp })
        if (data.success) {
          Notification(
            notificationTypes.SUCCESS,
            'OTP verified! Login Success!'
          )
          localStorage.setItem('userEmail', email)
          localStorage.setItem('loginStatus', true)
          history.push('/Dashboard')
          window.location.reload(false)
        } else {
          Notification(notificationTypes.ERROR, 'Invalid OTP! Login Failed!')
        }
        setInitErrorState()
      } catch (err) {
        Notification(notificationTypes.ERROR, err)
      }
    }
  }

  return (
    <Container fluid>
      <Card style={{ width: '22rem', marginTop: '2rem' }}>
        <Card.Body>
          <h1 style={{ textAlign: 'center' }} className='primary-color'>
            Login
          </h1>
          <hr />
          <Form onSubmit={submitHandler}>
            {buttonClicked ? (
              <div>
                <Form.Group className='mt-3'>
                  <Form.Control
                    type='text'
                    placeholder='Enter OTP'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <div className='error'>{otpError}</div>

                <Button type='submit' className='mt-3 px-5'>
                  Login
                </Button>
              </div>
            ) : (
              <Row>
                <Col md={8}>
                  <Form.Group className='mt-2'>
                    <Form.Control
                      type='email'
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <div className='error'>{emailError}</div>
                </Col>
                <Col md={4}>
                  {' '}
                  <Button className='mt-2' onClick={clickHandler}>
                    OTP
                  </Button>
                </Col>
              </Row>
            )}

            <div className='primary-color mt-3'>
              <Card.Link href='/login?mode=password'>
                Login With Password
              </Card.Link>
            </div>
            <hr />
            <div style={{ textAlign: 'center' }} className='mt-3'>
              Don't have an account?{' '}
              <Link to='/register' className='primary-color'>
                Sign Up
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LogInWithOTP
