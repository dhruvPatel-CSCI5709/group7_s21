import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import forgotPasswordImg from '../../img/forgot_password_img.png'
import '../login/LoginPage.css'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'
import axios, { Routes } from '../../services/axios'

const ForgotPasswordOtp = ({ history }) => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const [otpError, setOtpError] = useState('')
  const [emailError, setEmailError] = useState('')

  const setInitErrorState = () => {
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
        const { url, method } = Routes.api.forgotPasswrdSendOtp()
        const { data } = await axios[method](url, { email })
        if (data.success) {
          Notification(notificationTypes.SUCCESS, 'OTP sent to your Email ID')
          localStorage.setItem('userEmail', email)
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
        const { url, method } = Routes.api.verifyOtpForgotPassword()
        const { data } = await axios[method](url, { email, otp })

        if (data.success) {
          Notification(notificationTypes.SUCCESS, data.message)
          history.push('/forgotpassword/passwordReset')
        } else {
          Notification(notificationTypes.ERROR, data.message)
        }
        setInitErrorState()
      } catch (err) {
        Notification(notificationTypes.ERROR, err)
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={8} md={6} sm={12}>
          <img className='w-100' src={forgotPasswordImg} alt='' />
        </Col>
        <Col lg={4} md={6} sm={12} className='mt-5'>
          <Card style={{ width: '22rem', marginTop: '2rem' }}>
            <Card.Body>
              <h1 style={{ textAlign: 'center' }} className='primary-color'>
                Forgot Password
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

                    <hr />

                    <Button type='submit' className='mt-3 px-5'>
                      Verify OTP
                    </Button>
                  </div>
                ) : (
                  <Row>
                    <Col md={9}>
                      <Form.Group controlId='email' className='my-3'>
                        <Form.Control
                          placeholder='Email Address'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autocomplete='off'
                        ></Form.Control>
                        <div className='error'>{emailError}</div>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      {' '}
                      <Button className='mt-2' onClick={clickHandler}>
                        OTP
                      </Button>
                    </Col>
                  </Row>
                )}
                <hr />
                <div style={{ textAlign: 'center' }} className='my-2'>
                  Changed your mind?{' '}
                  <Link to='/login' className='primary-color'>
                    Sign In
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotPasswordOtp
