import React, { useState } from 'react'
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap'
import './LoginPage.css'

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

  const submitHandler = (e) => {
    e.preventDefault()
    const isValid = formValidator()
    if (isValid) {
      setInitErrorState()
      localStorage.setItem('loginStatus', true)
      history.push('/dashboard')
    }
  }

  const clickHandler = () => {
    const isValid = otpEmailSubmitValidator()
    if (isValid) {
      setButtonClicked(true)
      setInitErrorState()
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
              <div>OTP has been sent to your Email ID</div>
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
                </Col>
                <Col md={4}>
                  {' '}
                  <Button className='mt-2' onClick={clickHandler}>
                    OTP
                  </Button>
                </Col>
              </Row>
            )}
            <div className='error'>{emailError}</div>

            <Form.Group className='mt-3'>
              <Form.Control
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div className='error'>{otpError}</div>

            <div className='mt-3' className='primary-color'>
              <Card.Link href='/login?mode=password'>
                Login With Password
              </Card.Link>
              <Card.Link href='#'>Resend OTP</Card.Link>
            </div>
            <Button type='submit' className='mt-3 px-5'>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LogInWithOTP
