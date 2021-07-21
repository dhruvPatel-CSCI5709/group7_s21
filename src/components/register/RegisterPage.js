import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import uiImg from '../../img/register_img.png'
import '../login/LoginPage.css'
import Notification from '../../components/Notifications/Notifications'
import { notificationTypes } from '../../constants'
import axios, { Routes } from '../../services/axios'

const RegisterPage = ({ history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [password2Error, setPassword2Error] = useState('')

  const setInitErrorState = () => {
    setFirstNameError('')
    setLastNameError('')
    setEmailError('')
    setPasswordError('')
    setPassword2Error('')
  }

  const validateEmail = (email) => {
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    if (!regex.test(email)) {
      return false
    }
    return true
  }

  const validateAlphaNumeric = (text) => {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/i)
    if (!regex.test(text)) {
      return false
    }
    return true
  }

  const formValidator = () => {
    let firstNameError = ''
    let lastNameError = ''
    let emailError = ''
    let passwordError = ''
    let password2Error = ''

    if (firstName.trim().length === 0) {
      firstNameError = 'First Name is Required'
    } else if (firstName && !validateAlphaNumeric(firstName.trim())) {
      firstNameError = 'First Name can only contain Alphanumeric characters'
    }

    if (lastName.trim().length === 0) {
      lastNameError = 'Last Name is Required'
    } else if (lastName && !validateAlphaNumeric(lastName.trim())) {
      lastNameError = 'Last Name can only contain Alphanumeric characters'
    }

    if (email.trim().length === 0) {
      emailError = 'Email is Required'
    } else if (email && !validateEmail(email.trim())) {
      emailError = 'Invalid Email'
    }

    if (password.length === 0) {
      passwordError = 'Password is Required'
    } else if (password.length > 0 && password.length < 8) {
      passwordError = 'Password Should be 8 characters or long'
    }

    if (password2.length === 0) {
      password2Error = 'Confirm Password is Required'
    } else if (password !== password2) {
      password2Error = 'Passwords Do Not Match'
    }

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      password2Error
    ) {
      setFirstNameError(firstNameError)
      setLastNameError(lastNameError)
      setEmailError(emailError)
      setPasswordError(passwordError)
      setPassword2Error(password2Error)
      return false
    }

    return true
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const isValid = formValidator()
    if (isValid) {
      try {
        setInitErrorState()
        const name = firstName + ' ' + lastName
        const { url, method } = Routes.api.registerUser()
        const { data } = await axios[method](url, { name, email, password })

        if (data.success) {
          Notification(notificationTypes.SUCCESS, 'Register Successful')
          history.push('/login')
        } else {
          Notification(notificationTypes.ERROR, data.message)
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
          <img className='w-100' src={uiImg} alt='' />
        </Col>
        <Col
          lg={4}
          md={6}
          sm={12}
          className='mt-5 d-flex justify-content-center'
        >
          <Card style={{ width: '22rem', marginTop: '2rem' }}>
            <Card.Body>
              <h1 style={{ textAlign: 'center' }} className='primary-color'>
                Registration
              </h1>
              <hr />
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName' className='my-2 w-100'>
                  <Form.Control
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autocomplete='off'
                  ></Form.Control>
                  <div className='error'>{firstNameError}</div>
                </Form.Group>
                <Form.Group controlId='lastName' className='my-2 w-100'>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autocomplete='off'
                  ></Form.Control>
                  <div className='error'>{lastNameError}</div>
                </Form.Group>
                <Form.Group controlId='email' className='my-2 w-100'>
                  <Form.Control
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autocomplete='off'
                  ></Form.Control>
                  <div className='error'>{emailError}</div>
                </Form.Group>
                <Form.Group controlId='password' className='my-2 w-100'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <div className='error'>{passwordError}</div>
                </Form.Group>
                <Form.Group controlId='password2' className='my-2 w-100'>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  ></Form.Control>
                  <div className='error'>{password2Error}</div>
                </Form.Group>
                <div className='w-100 text-center mt-2'>
                  <Button type='submit' className='my-2 px-5'>
                    Register
                  </Button>
                </div>
                <div style={{ textAlign: 'center' }} className='my-2 w-100'>
                  Already have an account?{' '}
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

export default RegisterPage
