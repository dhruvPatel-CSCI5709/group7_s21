/**
 * Author: Falgun Manishbhai Makadia (B00874635)
 * Description: Forgot Password OTP Component - For Users to get OTP on their Registered Email to get started with their Password Reset Process
 */
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
// import forgotPasswordImg from '../../img/forgot_password_img.png'
import forgotPasswordImg from '../../assets/images/forgot_password_img.png'
import '../login/LoginPage.css'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'
import axios, { Routes } from '../../services/axios'

/**
 * Description: ForgotPasswordOtp Functional Component
 */
const ForgotPasswordOtp = ({ history }) => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const [otpError, setOtpError] = useState('')
  const [emailError, setEmailError] = useState('')

  /**
   * Description: Function to set Initial Component level State
   */
  const setInitErrorState = () => {
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
        const { url, method } = Routes.api.forgotPasswrdSendOtp()
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
        const { url, method } = Routes.api.verifyOtpForgotPassword()
        const { data } = await axios[method](url, {
          email: email.toLowerCase(),
          otp,
        })

        if (data.success) {
          Notification(notificationTypes.SUCCESS, data.message)
          localStorage.setItem('userEmail', email)
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
          <Card
            style={{ width: '22rem', marginTop: '2rem' }}
            className='m-auto mb-3'
          >
            <Card.Body className='m-auto'>
              <h1 style={{ textAlign: 'center' }} className='primary-color'>
                Forgot Password
              </h1>
              <hr />
              <Form onSubmit={submitHandler}>
                {buttonClicked ? (
                  <div className='w-100'>
                    <Form.Group className='mt-3'>
                      <Form.Control
                        type='text'
                        placeholder='Enter OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </Form.Group>
                    <div className='error'>{otpError}</div>
                    <div className='text-center'>
                      <Button type='submit' className='mt-3 px-3'>
                        Verify OTP
                      </Button>
                    </div>
                    <br />
                  </div>
                ) : (
                  <Row className='m-auto'>
                    <Col md={8}>
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
                    <Col md={4} className='m-auto'>
                      <Button onClick={clickHandler} className='px-3'>
                        OTP
                      </Button>
                    </Col>
                  </Row>
                )}

                <div className='my-2 w-100 text-center'>
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
