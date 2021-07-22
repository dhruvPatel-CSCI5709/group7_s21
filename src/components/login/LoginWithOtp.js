/**
 * Author: Falgun Manishbhai Makadia (B00874635)
 * Description: Login with OTP Component - For users to Login to FinCare with OTP which will be sent to their registered Email ID
 * NOTE: By Default Login with Password Page will be loaded - User can click on Login with OTP for Logging in using OTP
 */
import React, { useState } from 'react'
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LoginPage.css'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'
import axios, { Routes } from '../../services/axios'

/**
 * Description: LoginWithOtp Functional Component
 */
const LoginWithOtp = ({ history }) => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const [otpError, setOtpError] = useState('')
  const [emailError, setEmailError] = useState('')

  /**
   * Description: Function to set Initial Component level State
   */
  const setInitErrorState = () => {
    setOtpError('')
    setEmailError('')
  }

  /**
   * Description: Function to Validate Email using RegEx
   * @param {*} email
   * @returns {boolean}
   */
  const validateEmail = (email) => {
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    if (!regex.test(email)) {
      return false
    }
    return true
  }

  /**
   * Description: Function to Validate Format of the OTP using RegEx
   * @param {*} otp
   * @returns {boolean}
   */
  const validateOtp = (otp) => {
    const regex = new RegExp(/^[0-9]+$/i)
    if (!regex.test(otp)) {
      return false
    }
    return true
  }

  /**
   * Description: Function to Validate Form
   * @returns {boolean}
   */
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

  /**
   * Description: Function to Validate Email Submission for OTP
   * @returns {boolean}
   */
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

  /**
   * Description: Function to Handle click event - Get OTP Button
   */
  const clickHandler = async () => {
    const isValid = otpEmailSubmitValidator()
    if (isValid) {
      try {
        const { url, method } = Routes.api.loginUserWithOtp()
        const { data } = await axios[method](url, {
          email: email.toLowerCase(),
        })
        if (data.success) {
          Notification(notificationTypes.SUCCESS, 'OTP sent to your Email ID')
          setButtonClicked(true)
        } else {
          Notification(notificationTypes.ERROR, data.message)
        }
        setInitErrorState()
      } catch (err) {
        Notification(notificationTypes.ERROR, err)
      }
    }
  }

  /**
   * Description: Function to Handle Form Submission
   * @param {*} e : Event
   */
  const submitHandler = async (e) => {
    e.preventDefault()
    const isValid = formValidator()
    if (isValid) {
      try {
        const { url, method } = Routes.api.verifyOtpLogin()
        const { data } = await axios[method](url, {
          email: email.toLowerCase(),
          otp,
        })
        if (data.success) {
          Notification(
            notificationTypes.SUCCESS,
            'OTP verified! Login Success!'
          )
          if (data.token) {
            localStorage.setItem('token', data.token)
          }
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
      <Card
        style={{ width: '22rem', marginTop: '2rem' }}
        // className='d-flex justify-content-center'
      >
        <Card.Body>
          <h1 style={{ textAlign: 'center' }} className='primary-color'>
            Login
          </h1>
          <hr />
          <Form onSubmit={submitHandler} className='flex-column'>
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
                    Get OTP
                  </Button>
                </Col>
              </Row>
            )}

            <div className='primary-color mt-4 w-100 text-center'>
              <Card.Link href='/login?mode=password'>
                Login With Password
              </Card.Link>
            </div>
            <div
              style={{ textAlign: 'center' }}
              className='mt-3 w-100 text-center'
            >
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

export default LoginWithOtp
